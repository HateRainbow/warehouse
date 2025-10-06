import express from "express";
import requireAdmin from "../../../middleware/requireAdmin";
import addItemRoute from "./add-item";
import modifyItemRoute from "./modify-item";
import deleteItemRouter from "./delete-item";

const adminRoute = express.Router();

// Remove user from warehouse by email
adminRoute.post(
  "/warehouse/remove-user",
  requireAdmin,
  async (
    req: { body: { email: string; warehouseId: string } },
    res: {
      status: (code: number) => { json: (body: { message: string }) => void };
    }
  ) => {
    const { email, warehouseId } = req.body;
    if (!email || !warehouseId) {
      return res
        .status(400)
        .json({ message: "email and warehouseId are required" });
    }
    try {
      const UserModel = (await import("../../../model/user")).default;
      const WarehouseModel = (await import("../../../model/warehouse")).default;
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const warehouse = await WarehouseModel.findById(warehouseId);
      if (!warehouse) {
        return res.status(404).json({ message: "Warehouse not found" });
      }
      warehouse.users.pull({ user: user._id });
      await warehouse.save();
      user.warehouses = user.warehouses.filter(
        (w: string) => w !== warehouseId
      );
      await user.save();
      return res.status(200).json({ message: "User removed from warehouse" });
    } catch (err) {
      return res.status(500).json({ message: "Server error" });
    }
  }
);

// Add user to warehouse with role (admin/logistic)
adminRoute.post("/warehouse/add-user", requireAdmin, async (req, res) => {
  const { email, warehouseId, role } = req.body;
  if (!email || !warehouseId || !role) {
    return res
      .status(400)
      .json({ message: "email, warehouseId, and role are required" });
  }
  if (!["ADMIN", "LOGISTIC"].includes(role)) {
    return res.status(400).json({ message: "Role must be ADMIN or LOGISTIC" });
  }
  try {
    const UserModel = (await import("../../../model/user")).default;
    const WarehouseModel = (await import("../../../model/warehouse")).default;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const warehouse = await WarehouseModel.findById(warehouseId);
    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }
    const alreadyInWarehouse = warehouse.users.some(
      (u: any) => u.user === user._id
    );
    if (alreadyInWarehouse) {
      return res.status(409).json({ message: "User already in warehouse" });
    }
    warehouse.users.push({ user: user._id, role });
    await warehouse.save();
    if (!user.warehouses.includes(warehouseId)) {
      user.warehouses.push(warehouseId);
      user.role = role;
      await user.save();
    }
    return res.status(200).json({ message: "User added to warehouse" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

const routes = [addItemRoute, modifyItemRoute, deleteItemRouter] as const;
routes.forEach((route) => adminRoute.use("/", route));

export default adminRoute;
