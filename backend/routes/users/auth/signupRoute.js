import express from "express";
const router = express.Router();
import { signup } from "../../../controllers/users/auth/signup.js";
import { verifyOtp } from "../../../controllers/users/auth/verifyOtp.js";

// auth routes
router.post("/api/auth/signup", signup);
router.post("/api/auth/otp-verify", verifyOtp);

export default router;
