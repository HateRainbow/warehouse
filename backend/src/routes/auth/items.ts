import express, { Request, Response } from "express";
import ItemModel from "../../model/item";
import { getUserId } from "../../util/get-user-id";

const itemRoute = express.Router();

/**
 * GET /item?search=foo
 * Optional query parameter: search
 */
itemRoute.get("/item", async (req: Request, res: Response) => {
  const searchParam = (req.query.search as string | undefined) ?? "";
  const userId = getUserId(req);
  // Fetch user to get their warehouses and role
  const user = await (
    await import("../../model/user")
  ).default.findById(userId);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  let filter: any = {};
  if (user.role !== "ADMIN") {
    // Only allow access to items in user's warehouses
    filter.warehouseId = { $in: user.warehouses || [] };
  }
  if (searchParam) {
    filter.$or = [
      { name: { $regex: searchParam, $options: "i" } },
      { location: { $regex: searchParam, $options: "i" } },
      { description: { $regex: searchParam, $options: "i" } },
    ];
  }
  const items = await ItemModel.find(filter);
  return res.status(200).json({ message: "item were succesfuly sent", items });
});

export default itemRoute;
