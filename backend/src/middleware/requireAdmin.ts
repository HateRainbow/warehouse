import { NextFunction, Request, Response } from "express";
import UserModel from "../model/user";
import { getUserId } from "../util/get-user-id";

const requireAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = getUserId(req);

    if (!id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user ID found." });
    }

    const user = await UserModel.findById(id);

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

export default requireAdmin;
