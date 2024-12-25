import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, default: "Viewer" },
  },
  {
    timestamps: true,
    collection: "Users",
  }
);

export const User = mongoose.model("Users", UserSchema);
