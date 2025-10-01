import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import env from "../env";

const protectedRoute = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.auth;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);

    // @ts-ignore
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", error });
  }
};

export default protectedRoute;
