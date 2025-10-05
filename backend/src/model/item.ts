import { model, Schema, type InferSchemaType } from "mongoose";
import { randomUUID } from "node:crypto";

const ItemSchema = new Schema({
  _id: {
    type: String,
    default: () => {
      return randomUUID().toString();
    },
  },
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
  location: { type: String, required: true, trim: true },
});

const ItemModel = model("Item", ItemSchema);
export type Item = InferSchemaType<typeof ItemSchema>;
export type ItemInsert = Omit<Item, "_id">;
export default ItemModel;
