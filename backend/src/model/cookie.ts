import { InferSchemaType, model, Schema } from "mongoose";

const cookieSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["ADMIN", "EMPLOYEE"],
        default: "ADMIN"
    }
})

const cookieModel = model("Cookie", cookieSchema)
export default cookieModel
export type Cookie = InferSchemaType<typeof cookieSchema>