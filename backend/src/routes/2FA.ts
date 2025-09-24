import express, { Request, Response } from "express";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import { validateData } from "../middleware/validationMiddleware";
import z from "zod";
import UserModel from "../model/user";
import protectedRoute from "../middleware/protectedRoute";

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
      res.status(300).json({ message: "user doesn't exist" });
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
  secret: z.string().nonempty(),
});

twoFactorRouter.post(
  "/verify-2fa",
  validateData(twoFactorSchema),
  protectedRoute,
  async (
    req: Request<{}, {}, z.infer<typeof twoFactorSchema>>,
    res: Response
  ) => {
    // @ts-ignore
    const { _id } = req.auth as UserRequestMetadata;
    const { secret } = req.body;
    const user = await UserModel.findById(_id);

    if (!user) {
      return res.status(300).json({ message: "the user doesn't exist" });
    }

    const verified = speakeasy.totp.verify({
      secret,
      encoding: "base32",
      token: _id,
    });

    return res.json({ verified });
  }
);

export default twoFactorRouter;
