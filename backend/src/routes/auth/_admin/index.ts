import express from "express";
import requireAdmin from "../../../middleware/requireAdmin";
import addItemRoute from "./add-item";
import modifyItemRoute from "./modify-item";
import deleteItemRouter from "./delete-item";

const adminRoute = express.Router();

// Utility route for frontend to verify the user HAS admin privileges
adminRoute.get("/admin", requireAdmin, (_req, res) => {
  return res.json({
    message: "user is an admin",
  });
});

const routes = [addItemRoute, modifyItemRoute, deleteItemRouter] as const;

routes.forEach((route) => adminRoute.use("/admin", route));

export default adminRoute;
