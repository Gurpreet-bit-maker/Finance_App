import express from "express";
const router = express.Router();

import { isValidToken } from "../../../middleware/user/tokenMiddleware.js";
import { generateAIResponse } from "../../../controllers/users/transections/search.js";

router.post("/api/user/ai", isValidToken, generateAIResponse);
router.get("/api/user/search", isValidToken, generateAIResponse);

export default router;
