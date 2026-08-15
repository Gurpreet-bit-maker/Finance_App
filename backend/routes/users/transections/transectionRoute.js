import express from "express";
const router = express.Router();

import { incomeController } from "../../../controllers/users/transections/income.js";
import { addExpenseController } from "../../../controllers/users/transections/addExpense.js";
import { transections } from "../../../controllers/users/transections/dashboard.js";
import { isValidToken } from "../../../middleware/user/tokenMiddleware.js";

router.post("/api/user/create-income", isValidToken, incomeController);
router.post("/api/user/create-expense", isValidToken, addExpenseController);
router.get("/api/user/transections", isValidToken, transections);

export default router;
