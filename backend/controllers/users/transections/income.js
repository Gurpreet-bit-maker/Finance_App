import incomeModel from "../../../models/incomeSchema.js";

export const incomeController = async (req, res) => {
  try {
    let { monthBudget } = req.body;

    const monthlyBudget = Number(monthBudget);

    if (!monthBudget)
      return res.status(401).json({ message: "enter amount please" });

    const userIncome = await incomeModel.findOne({ user: req.user.userId });
    const incomeId = `INC-ID ${Date.now()}`;

    if (!userIncome) {
      await incomeModel.create({
        user: req.user.userId,
        incomeAmount: monthlyBudget,
        incomeId: incomeId,
      });
      return res.status(200).json({ message: "income created" });
    }

    userIncome.incomeAmount = monthlyBudget;
    userIncome.incomeId = incomeId;
    await userIncome.save();

    return res.status(200).json({
      message: "income stored successfully",
      userIncome,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
