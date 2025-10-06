import { model, Schema, type InferSchemaType } from "mongoose";

const ItemSchema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
  location: { type: String, required: true, trim: true },
  warehouseId: { type: String, required: true, ref: "Warehouse" },
});

const ItemModel = model("Item", ItemSchema);
export type Item = InferSchemaType<typeof ItemSchema>;
export type ItemInsert = Omit<Item, "_id">;
export default ItemModel;
