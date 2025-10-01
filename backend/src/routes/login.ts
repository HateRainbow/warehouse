import express, { Request, Response } from "express";
import UserModel, { User } from "../model/user";
import jwt from "jsonwebtoken";
import { validateData } from "../middleware/validationMiddleware";
import z from "zod";
import env from "../env";
import bcrypt from "bcrypt";
import twoFactorRouter from "./auth/2FA";

const loginRoute = express.Router();

type UserRequest = Pick<
  Omit<User, "_id" | "hashedPassword"> & {
    password: string;
  },
  "email" | "password"
>;
loginRoute.post(
  "/login",
  validateData(
    z.object({
      email: z.email(),
      password: z.string().nonempty(),
    })
  ),
  async (req: Request<{}, {}, UserRequest>, res: Response) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, env.JWT_SECRET, {
      expiresIn: "1h",
      algorithm: "HS256",
    });

    const expiration = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 Day later

    return res
      .status(200)
      .cookie("auth", token, { expires: expiration, sameSite: true })
      .json({
        message: "User logged in successfully",
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        twoFactorEnabled: user.twoFactorEnabled,
      });
  }
);

export default loginRoute;
