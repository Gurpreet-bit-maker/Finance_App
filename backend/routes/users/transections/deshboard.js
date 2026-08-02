import express from "express";
const router = express.Router();

import getTransections from "../../../controllers/users/transections/dashboard.js";
import { isValidToken } from "../../../middleware/user/tokenMiddleware.js";

router.get("/api/user/transections", isValidToken, getTransections);
// router.get("/api/user/transections?month", getTransections);

export default router;
