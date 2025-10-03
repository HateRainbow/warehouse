import express, { Request, Response } from "express";
import ItemModel from "../../model/item";

const itemRoute = express.Router();

/**
 * GET /item?search=foo
 * Optional query parameter: search
 */
itemRoute.get("/item", async (req: Request, res: Response) => {
  const searchParam = (req.query.search as string | undefined) ?? "";
  let filter = {};
  // Search item by name, location and description fields
  if (searchParam) {
    filter = {
      $or: [
        { name: { $regex: searchParam, $options: "i" } },
        { location: { $regex: searchParam, $options: "i" } },
        { description: { $regex: searchParam, $options: "i" } },
      ],
    };
  }
  const items = await ItemModel.find(filter);

  return res.status(200).json({ message: "item were succesfuly sent", items });
});

export default itemRoute;
