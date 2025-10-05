import type { User } from "../model/user";
import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../model/user";
import { validateData } from "../middleware/validationMiddleware";
import z from "zod";

const signupRoute = express.Router();

type UserRequest = Omit<User, "_id" | "hashedPassword" | "role"> & {
  password: string;
};

signupRoute.post(
  "/signup",
  validateData(
    z.object({
      email: z.email(),
      firstName: z.string().nonempty(),
      lastName: z.string().nonempty(),
      password: z.string().nonempty(),
    })
  ),
  async (req: Request<{}, {}, UserRequest>, res: Response) => {
    const { password, firstName, lastName, email } = req.body;

    const isUserRegistered = await UserModel.findOne({ email });

    if (isUserRegistered) {
      return res.status(409).json({
        error: "User with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({ hashedPassword, firstName, lastName, email });

    res.status(200).json({
      message: "User was successfully created",
    });
  }
);

export default signupRoute;
