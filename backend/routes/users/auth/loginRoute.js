import express from "express";
const router = express.Router();
import { loginController } from "../../../controllers/users/auth/login.js";
import { logout } from "../../../controllers/users/auth/logout.js";
// auth routes
router.post("/api/auth/login", loginController);
router.post("/api/auth/logout", logout);

export default router;
