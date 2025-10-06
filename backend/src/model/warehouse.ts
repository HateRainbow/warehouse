import { model, Schema, type InferSchemaType } from "mongoose";

const warehouseSchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, trim: true },
  users: [
    {
      user: { type: String, ref: "User" }, // user _id
      role: {
        type: String,
        enum: ["ADMIN", "LOGISTIC", "EMPLOYEE"],
        default: "EMPLOYEE",
      },
    },
  ],
  items: [{ type: String, ref: "Item" }],
});

const WarehouseModel = model("Warehouse", warehouseSchema);
export default WarehouseModel;
export type Warehouse = InferSchemaType<typeof warehouseSchema>;
