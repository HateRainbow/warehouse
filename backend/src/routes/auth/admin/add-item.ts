import { Request, Response, Router } from "express";
import ItemModel, { ItemInsert } from "../../../model/item";
import { validateData } from "../../../middleware/validationMiddleware";
import z from "zod";

const addItemRoute = Router();

addItemRoute.post(
  "/add-item",
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
    const { name, description, location, price, quantity } = req.body;

    const itemExists = await ItemModel.findOne({ name, description });

    if (itemExists) {
      return res.status(409).json({
        message: "Item with this name and description already exists",
      });
    }

    await ItemModel.create({ name, description, location, price, quantity });

    return res.status(200).json({ message: "item was created" });
  }
);

export default addItemRoute;
