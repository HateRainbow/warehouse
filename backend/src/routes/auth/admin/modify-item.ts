import { Request, Response, Router } from "express";
import ItemModel, { ItemInsert } from "../../../model/item";
import { validateData } from "../../../middleware/validationMiddleware";
import z from "zod";

const modifyItem = Router();

const modifyItemSchema = z.object({
  name: z.string().nonempty().optional(),
  description: z.string().nonempty().optional(),
  location: z.string().nonempty().optional(),
  price: z.number().nonnegative().optional(),
  quantity: z.number().nonnegative().optional(),
  warehouseId: z.string().optional(),
});

modifyItem.put(
  "/item/:id",
  validateData(modifyItemSchema),
  async (
    req: Request<{ id: string }, {}, Partial<ItemInsert>>,
    res: Response
  ) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Item ID is required" });
    }

    // Build update object with only provided fields
    const updateFields: Partial<ItemInsert> = Object.entries(req.body).reduce(
      (acc, [key, value]) => {
        if (value !== undefined) {
          (acc as any)[key] = value;
        }
        return acc;
      },
      {} as Partial<ItemInsert>
    );

    if (Object.keys(updateFields).length === 0) {
      return res
        .status(400)
        .json({ message: "No valid fields provided to update" });
    }

    try {
      const updatedItem = await ItemModel.findByIdAndUpdate(id, updateFields, {
        new: true,
        runValidators: true,
      });

      if (!updatedItem) {
        return res.status(404).json({ message: "Item not found" });
      }

      return res.status(200).json({
        message: "Item updated successfully",
        item: updatedItem,
      });
    } catch (error) {
      console.error("Error updating item:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default modifyItem;
