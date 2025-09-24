import { model, Schema, type InferSchemaType } from "mongoose";
import { randomUUID } from "node:crypto";

const userSchema = new Schema({
  lastName: { type: String, required: true, trim: true },
  firsName: { type: String, required: true, trim: true },
  hashedPassword: { type: String, required: true, trim: true },
  _id: {
    // Use a UUID4 as user id
    type: String,
    default: function genUUID() {
      return randomUUID().toString();
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["ADMIN", "EMPLOYEE"],
    default: "EMPLOYEE",
  },
  twoFactorEnabled: { type: Boolean, default: false },
  twoFactorSecret: { type: String },
});

const UserModel = model("User", userSchema);
export default UserModel;
export type User = InferSchemaType<typeof userSchema>;
