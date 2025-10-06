import { Request, Response, Router } from "express";
import UserModel from "../../model/user";
import { getUserId } from "../../util/get-user-id";
const checkAdmin = Router();

// Utility route for frontend to verify if the user is an admin
checkAdmin.get("/check-admin", async (req: Request, res: Response) => {
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

    return res.status(200).json({
      isAdmin: user.role === "ADMIN",
      role: user.role,
      warehouses: user.warehouses || [],
    });
  } catch (error) {
    console.error("Error in checkAdmin function:", error);
    res.status(500).json({ message: "Server error in checkAdmin function." });
  }
});

export default checkAdmin;
