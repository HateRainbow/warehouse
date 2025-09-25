import express, { Request, Response } from "express";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import { validateData } from "../middleware/validationMiddleware";
import z from "zod";
import UserModel from "../model/user";
import protectedRoute from "../middleware/protectedRoute";
import jwt from "jsonwebtoken";
import env from "../env";
const twoFactorRouter = express.Router();
type UserRequestMetadata = { _id: string };
twoFactorRouter.get(
  "/setup-2fa",
  protectedRoute,
  async (req: Request, res: Response) => {
    const secret = speakeasy.generateSecret({ length: 20 });
    //@ts-ignore
    const { _id } = req.auth as UserRequestMetadata;

    const user = await UserModel.findById(_id);

    if (!user) {
      return res.status(404).json({ message: "user doesn't exist" });
    }

    if (!secret.otpauth_url) {
      return res.status(500).json({ error: "Failed to generate OTP auth URL" });
    }

    qrcode.toDataURL(secret.otpauth_url, async (err, data_url) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: "Failed to generate QR code",
          details: err.message,
        });
      }

      await UserModel.findByIdAndUpdate(_id, {
        twoFactorEnabled: true,
        twoFactorSecret: secret.base32,
      });

      return res.json({ qr: data_url });
    });
  }
);

const twoFactorSchema = z.object({
  token: z.string().length(6),
});
twoFactorRouter.post(
  "/verify-2fa",
  validateData(twoFactorSchema),
  async (
    req: Request<{}, {}, z.infer<typeof twoFactorSchema>>,
    res: Response
  ) => {
    const token = req.cookies.auth;

    if (!token) {
      return res.status(401).json({ message: "No auth token provided" });
    }

    const { id } = jwt.verify(token, env.JWT_SECRET) as { id: string };

    const { token: userToken } = req.body;

    const user = await UserModel.findById(id);

    if (!user || !user.twoFactorSecret) {
      return res
        .status(400)
        .json({ message: "2FA is not setup for this user" });
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token: userToken,
    });

    return res.json({ verified });
  }
);
export default twoFactorRouter;
