import { Request, Response, Router } from "express";
import ItemModel, { ItemInsert } from "../../../model/item";
import { validateData } from "../../../middleware/validationMiddleware";
import z from "zod";

const modifyItem = Router();

// Validation schema
const modifyItemSchema = z.object({
  name: z.string().nonempty().optional(),
  description: z.string().nonempty().optional(),
  location: z.string().nonempty().optional(),
  price: z.number().nonnegative().optional(),
  quantity: z.number().nonnegative().optional(),
});

modifyItem.put(
  "/modify-item/:id",
  validateData(modifyItemSchema),
  async (
    req: Request<{ id: string }, {}, Partial<ItemInsert>>,
    res: Response
  ) => {
    const { id } = req.params;
    const { name, description, location, price, quantity } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Item ID is required" });
    }

    // Build update object with only provided fields
    const updateFields: Partial<ItemInsert> = {};
    if (name !== undefined) updateFields.name = name;
    if (description !== undefined) updateFields.description = description;
    if (location !== undefined) updateFields.location = location;
    if (price !== undefined) updateFields.price = price;
    if (quantity !== undefined) updateFields.quantity = quantity;

    if (Object.keys(updateFields).length === 0) {
      return res
        .status(400)
        .json({ message: "No valid fields provided to update" });
    }

    try {
      const item = await ItemModel.findById(id);
      console.table(item);
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
