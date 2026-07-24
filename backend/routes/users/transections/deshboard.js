import express from "express";
const router = express.Router();

import getTransections from "../../../controllers/users/transections/dashboard.js";
import { isValidToken } from "../../../middleware/user/tokenMiddleware.js";

router.post("/api/user/transections", isValidToken, getTransections);

export default router;
