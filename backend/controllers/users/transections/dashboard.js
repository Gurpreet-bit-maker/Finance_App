import expenseModel from "../../../models/expenseSchema.js";
import userSchema from "../../../models/userSchema.js";
import incomeSchema from "../../../models/incomeSchema.js";
import mongoose from "mongoose";
export const transections = async (req, res) => {
  try {
    const transections = await expenseModel.aggregate([
      { $sort: { date: -1 } },
    ]);

    // console.log(transections);
    const userProfile = await userSchema.findById(req.user.userId);
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
      ]),
    ]);
    //* income schema code for deshboard top-bar card
    // const expenseModelVarible = await expenseModel.find({
    //   user: req.user.userId,
    // });
    // let { userAmount } = incomeSchema.userAmount;
    const userIncome = await incomeSchema.find({ user: req.user.userId });
    const incomeAmount = userIncome[0].incomeAmount;
    const totalSpent = category.reduce((acc, current) => {
      return acc + current.totalSpent;
    }, 0);
    const percentage = (totalSpent / incomeAmount) * 100;

    //* sharable obj
    const purpleCardData = {
      reminderAmount: incomeAmount - totalSpent,
      incomeAmount: userIncome[0].incomeAmount,
      expensesAmount: totalSpent,
      usedPercentage: percentage.toFixed(1),
    };
    console.log(totalSpent);
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
