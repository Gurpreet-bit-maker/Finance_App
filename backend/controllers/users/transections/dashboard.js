import expenseModel from "../../../models/expenseSchema.js";
import userSchema from "../../../models/userSchema.js";

export const transections = async (req, res) => {
  try {
    const getTransections = await expenseModel.findOne({
      user: req.user.userId,
    });
    const userProfile = await userSchema.findById(req.user.userId);
    const { name } = userProfile;
    let [categorys, yearAndTime] = await Promise.all([
      expenseModel.aggregate([
        {
          $group: {
            _id: "$category",
            totalSpent: { $sum: "$finalAmount" },
          },
        },
      ]),
      expenseModel.aggregate([
        {
          $project: {
            month: { $month: "$date" },
            year: { $year: "$date" },
            date: { $dayOfMonth: "$date" },
          },
        },
      ]),
    ]);

    console.log({ getTransections, categorys, yearAndTime, name });
    return res.json({
      message: "all transections and aggrigates",
      transections: getTransections,
      data: { categorys, yearAndTime, name },
    });
  } catch (error) {
    console.log(error);
  }
};
