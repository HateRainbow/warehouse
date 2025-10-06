import { Router } from "express";
import ItemModel from "../../../model/item";

const deleteItemRouter = Router();

deleteItemRouter.delete("/item/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Item ID is required" });
  }

  try {
    const deletedItem = await ItemModel.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res
      .status(200)
      .json({ message: "Item deleted successfully", item: deletedItem });
  } catch (error) {
    console.error("Error deleting item:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default deleteItemRouter;
