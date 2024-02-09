import mongoose, { Schema } from "mongoose";

export interface UserSchemaInterface {
  _id?: unknown;
  username: string;
  email: string;
  password: string;
  phone_number: string;
  collage_name?: string;
  enrollment_number?: number;
  semester?: string;
  course?: string;
}

const userSchema: Schema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone_number: { type: Number, required: true },
    collage_name: { type: String, required: false },
    enrollment_number: { type: Number, required: false },
    semester: { type: String, required: false },
    course: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
