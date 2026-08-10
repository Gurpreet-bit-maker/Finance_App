import express from "express";
const router = express.Router();

import { isValidToken } from "../../../middleware/user/tokenMiddleware.js";
import { generateAIResponse } from "../../../controllers/users/transections/search.js";
import { aiSearch_method } from "../../../controllers/users/transections/aiSearch.js";

router.post("/api/user/ai", isValidToken, aiSearch_method);
router.get("/api/user/search", isValidToken, generateAIResponse);

export default router;
