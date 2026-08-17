import expenseModel from "../../../models/expenseSchema.js";
import userSchema from "../../../models/userSchema.js";
import incomeSchema from "../../../models/incomeSchema.js";
import mongoose from "mongoose";

export const transections = async (req, res) => {
  try {
    const transections = await expenseModel.aggregate([
      { $sort: { date: -1 } },
    ]);

    console.log("TOKEN USER ID:", req.user.userId);
    const userProfile = await userSchema.findById(req.user.userId);
    console.log("FOUND USER:", userProfile);
    if (!userProfile) {
      return res.status(404).json({
        message: "User profile not found",
      });
    }

    const { name } = userProfile;

    // data
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    let [category] = await Promise.all([
      expenseModel.aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(req.user.userId),
            date: {
              $gte: startOfMonth,
              $lt: startOfNextMonth,
            },
          },
        },
        {
          $group: {
            _id: {
              category: "$category",
              month: { $month: "$date" },
            },
            totalSpent: { $sum: "$finalAmount" },
            totalPercentage: { $sum: "$expensePercantage" },
          },
        },
        {
          $project: {
            _id: 1,
            totalSpent: 1,
            totalPercentage: {
              $round: ["$totalPercentage", 1],
            },
          },
        },
      ]),
    ]);
    //* income schema code for deshboard top-bar card
    const budgetSchema = await incomeSchema.findOne({ user: req.user.userId });

    if (!budgetSchema) {
      return res.status(404).json({
        message: "Income data not found",
      });
    }

    
    const totalSpent = category.reduce((acc, current) => {
      return acc + current.totalSpent;
    }, 0);
    const percentage = (totalSpent / budgetSchema.incomeAmount) * 100;

    //* sharable obj
    const purpleCardData = {
      reminderAmount: budgetSchema.incomeAmount - totalSpent,
      incomeAmount: budgetSchema.incomeAmount,
      expensesAmount: totalSpent,
      usedPercentage: percentage.toFixed(1),
    };
    console.log(purpleCardData);
    return res.json({
      message: "all transections and aggrigates",
      data: {
        purpleCard: purpleCardData,
        graph: category,
        transectionHistory: transections,
        userName: name,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
