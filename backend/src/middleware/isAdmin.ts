import { NextFunction, Request, Response } from "express";
import UserModel from "../model/user";

type UserRequest = { _id?: string };

const requireAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // @ts-ignore
    const { _id } = req.user as UserRequest;

    if (!_id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user ID found." });
    }

    const user = await UserModel.findById(_id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.role !== "ADMIN") {
      return res.status(403).json({ message: "Access denied: Admins only." });
    }

    next();
  } catch (error) {
    console.error("Error in requireAdmin middleware:", error);
    res
      .status(500)
      .json({ message: "Server error in requireAdmin middleware." });
  }
};
