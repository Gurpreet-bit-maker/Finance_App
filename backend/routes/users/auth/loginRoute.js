import express from "express";
const router = express.Router();
import { loginController } from "../../../controllers/users/auth/login.js";
import { logout } from "../../../controllers/users/auth/logout.js";
import { isValidToken } from "../../../middleware/user/tokenMiddleware.js";
// auth routes
router.post("/api/auth/login", loginController);
router.get("/api/auth/logout", isValidToken, logout);

export default router;
