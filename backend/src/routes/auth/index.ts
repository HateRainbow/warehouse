import express, { Request, Response } from "express";
import protectedRoute from "../../middleware/protectedRoute";
import itemRoute from "./items";
import adminRoute from "./admin";

const routes = [itemRoute, adminRoute] as const;

const authorizedRoutes = express.Router();

// Utility route for frontend to verify if the user is currently logged in
authorizedRoutes.get("/auth", authorizedRoutes);

routes.forEach((route) => authorizedRoutes.use("/auth", protectedRoute, route));

export default authorizedRoutes;
