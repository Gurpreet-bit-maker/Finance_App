import mongoose from "mongoose";
let signupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    otp: {
      type: String,
    },
    isVerify: {
      type: Boolean,
      default: false,
    },
    otpExpiry: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true },
);

let User = mongoose.model("User", signupSchema);
export default User;
