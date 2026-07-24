import expenseModel from "../../../models/expenseSchema.js";
import User from "../../../models/userSchema.js";
export const addExpenseController = async (req, res) => {
  try {
    let { amount, subCategory, category, paymentMode, note, date } = req.body;
    if (!amount || !subCategory || !category || !paymentMode || !date)
      return res.status(404).json({ message: "all feilds required" });
    let userId = await User.findById(req.user.userId);

    const expense = await expenseModel.create({
      user: userId,
      expenseId: `Exp-Id ${Date.now()}`,
      category: category,
      subCategory: subCategory,
      paymentMode: paymentMode,
      finalAmount: amount,
      note: note,
      date: date,
    });

    return res
      .status(200)
      .json({ message: "created successfully", data: expense });
  } catch (error) {
    console.log(error);
  }
};
