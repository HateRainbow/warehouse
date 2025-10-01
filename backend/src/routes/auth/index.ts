import express, { Request, Response } from "express";
import protectedRoute from "../../middleware/protectedRoute";
import itemRoute from "./items";
import adminRoute from "./admin";
import twoFactorRouter from "./2FA";

const routes = [itemRoute, adminRoute, twoFactorRouter] as const;

const authorizedRoutes = express.Router();

// Utility route for frontend to verify if the user is currently logged in
authorizedRoutes.get("/auth", protectedRoute, (_req, res: Response) => {
  return res.json({
    message: "user is authorized",
  });
});

routes.forEach((route) => authorizedRoutes.use("/auth", protectedRoute, route));

export default authorizedRoutes;
