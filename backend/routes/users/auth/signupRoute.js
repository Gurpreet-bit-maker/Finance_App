import express from "express";
const router = express.Router();
import { signup } from "../../../controllers/users/auth/signup.js";

// auth routes
router.post("/api/auth/signup", signup);

export default router;
