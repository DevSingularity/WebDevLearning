import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      min: [8, "Must be atleast 8"],
      max: [20, "Max: 20"],
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
