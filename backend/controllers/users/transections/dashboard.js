import expenseModel from "../../../models/expenseSchema.js";
import userSchema from "../../../models/userSchema.js";
import incomeSchema from "../../../models/incomeSchema.js";
import mongoose from "mongoose";

const transections = async (req, res) => {
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
    const userIncomeSchema = await incomeSchema.find({ user: req.user.userId });
    if (!userIncomeSchema) return;
    const totalSpent = category.reduce((acc, current) => {
      return acc + current.totalSpent;
    }, 0);
    
    const percentage = (totalSpent / userIncomeSchema.incomeAmount) * 100;

    // ! this is alll code for search page
    // const [categoryWise] = await Promise.all([
    //   expenseModel.aggregate([
    //     {
    //       $group: {
    //         _id: { categorized: "$category" },
    //         totalSpent: { $sum: "$finalAmount" },
    //         parcantage: { $sum: "$expensePercantage" },
    //       },
    //     },
    //   ]),
    // ]);

    // const expensesByCategory = categoryWise
    //   .map(
    //     (item) =>
    //       `${item._id.categorized}, expenses: ${item.totalSpent}, parcantage: ${item.parcantage} aur muje `,
    //   )
    //   .join("\n");
    //! last week all expenses prompt
    // const expenseModelArr = await expenseModel.find({ user: req.user.userId });
    // const lastWeekExpenses = expenseModelArr.filter((item) => {
    //   const today = new Date();
    //   const lastweek = new Date(today);
    //   lastweek.setDate(today.getDate() - 7);
    //   return item.date >= lastweek && item.date <= today;
    // });
    // console.log(lastWeekExpenses);

    //* sharable obj
    const purpleCardData = {
      reminderAmount: userIncomeSchema.incomeAmount - totalSpent,
      incomeAmount: userIncomeSchema.incomeAmount,
      expensesAmount: totalSpent,
      usedPercentage: percentage.toFixed(1),
    };

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
export default transections;
