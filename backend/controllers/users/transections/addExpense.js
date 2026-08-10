import expenseModel from "../../../models/expenseSchema.js";
import User from "../../../models/userSchema.js";
import incomeSchema from "../../../models/incomeSchema.js";

export const addExpenseController = async (req, res) => {
  try {
    let {
      amount,
      Subcategory,
      selectedCategory,
      paymentMode,
      note,
      expenseDate,
    } = req.body;
    if (
      !amount ||
      !Subcategory ||
      !selectedCategory ||
      !paymentMode ||
      !expenseDate
    )
      return res.status(404).json({ message: "all feilds required" });

    const userId = await User.findById(req.user.userId);
    const userIncome = await incomeSchema.findOne({ user: req.user.userId });
    const persantage = (amount / userIncome.incomeAmount) * 100;

    // if (!userIncome) {
    //   return res.status(400).json({ message: "first income genrate" });
    // }
    console.log("ths is",userIncome);
    console.log("ths is",userIncome);

    const expense = await expenseModel.create({
      user: userId,
      expenseId: `Exp-Id ${Date.now()}`,
      category: selectedCategory,
      subCategory: Subcategory,
      paymentMode: paymentMode,
      finalAmount: Number(amount),
      note: note,
      date: expenseDate,
      expensePercantage: persantage.toFixed(1),
    });

    //* substrack amount into income amount
    userIncome.reminderAmount = userIncome.incomeAmount - Number(amount);
    await userIncome.save();

    return res.status(200).json({
      message: "created successfully",
      data: expense,
      userincom: userIncome.incomeAmount,
    });
  } catch (error) {
    return res.json({ message: "something error", error });
  }
};
