import express, { Request, Response } from "express";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import { validateData } from "../../middleware/validationMiddleware";
import z from "zod";
import UserModel from "../../model/user";
import jwt from "jsonwebtoken";
import env from "../../env";
import protectedRoute from "../../middleware/protectedRoute";
import { getUserId } from "../../util/get-user-id";

const twoFactorRouter = express.Router();

twoFactorRouter.get(
  "/setup-2fa",
  protectedRoute,
  async (req: Request, res: Response) => {
    const userId = getUserId(req);

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "user doesn't exist" });
    }

    if (user.twoFactorEnabled) {
      return res
        .status(400)
        .json({ message: "2FA is already enabled for this user" });
    }

    const secret = speakeasy.generateSecret({
      length: 20,
      name: `Warehouse App`,
      issuer: "Warehouse App",
    });

    if (!secret.otpauth_url) {
      return res.status(500).json({ error: "Failed to generate OTP auth URL" });
    }

    const qr = await qrcode.toDataURL(secret.otpauth_url, {
      errorCorrectionLevel: "M",
      type: "image/png",
      margin: 2,
      scale: 6,
    });

    await UserModel.findByIdAndUpdate(userId, {
      twoFactorSecret: secret.base32,
      twoFactorEnabled: true,
    });

    return res.json({ qr });
  }
);

const twoFactorSchema = z.object({
  token: z.string().length(6),
});

twoFactorRouter.post(
  "/verify-2fa",
  validateData(twoFactorSchema),
  protectedRoute,
  async (
    req: Request<{}, {}, z.infer<typeof twoFactorSchema>>,
    res: Response
  ) => {
    const id = getUserId(req);

    if (!id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user ID found." });
    }

    const { token } = req.body;

    const user = await UserModel.findById(id);

    if (!user || !user.twoFactorSecret) {
      return res
        .status(400)
        .json({ message: "2FA is not setup for this user" });
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
    });

    return res.json({ verified });
  }
);
export default twoFactorRouter;
