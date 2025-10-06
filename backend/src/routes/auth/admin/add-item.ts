import { Request, Response, Router } from "express";
import ItemModel, { ItemInsert } from "../../../model/item";
import { validateData } from "../../../middleware/validationMiddleware";
import z from "zod";
import { getUserId } from "../../../util/get-user-id";

const addItemRoute = Router();

addItemRoute.post(
  "/item",
  validateData(
    z.object({
      name: z.string().nonempty(),
      description: z.string().nonempty(),
      location: z.string().nonempty(),
      price: z.number().nonnegative(),
      quantity: z.number().nonnegative(),
    })
  ),
  async (req: Request<{}, {}, ItemInsert>, res: Response) => {
    const { name, description, location, price, quantity, warehouseId } =
      req.body;
    if (!warehouseId) {
      return res.status(400).json({ message: "warehouseId is required" });
    }
    const itemExists = await ItemModel.findOne({
      name,
      description,
      warehouseId,
    });
    if (itemExists) {
      return res.status(409).json({
        message:
          "Item with this name and description already exists in this warehouse",
      });
    }
    await ItemModel.create({
      name,
      description,
      location,
      price,
      quantity,
      warehouseId,
    });
    return res.status(200).json({ message: "item was created" });
  }
);

export default addItemRoute;
