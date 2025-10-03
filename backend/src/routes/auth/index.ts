import express, { Response } from "express";
import protectedRoute from "../../middleware/protectedRoute";
import itemRoute from "./items";
import twoFactorRouter from "./2FA";
import userRouter from "./change-user";
import adminRoute from "./admin";
import checkAdmin from "./checkAdmin";
import userDataRoute from "./get-user-data";

const routes = [
  itemRoute,
  adminRoute,
  twoFactorRouter,
  userRouter,
  checkAdmin,
  userDataRoute,
] as const;

const authorizedRoutes = express.Router();

// Utility route for frontend to verify if the user is currently logged in
authorizedRoutes.get("/auth", protectedRoute, (_req, res: Response) => {
  return res.json({
    message: "user is authorized",
  });
});

routes.forEach((route) => authorizedRoutes.use("/auth", protectedRoute, route));

export default authorizedRoutes;
