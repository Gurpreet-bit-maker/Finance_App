import incomeModel from "../../../models/incomeSchema.js";

export const incomeController = async (req, res) => {
  try {
    let { amount } = req.body;
    if (!amount)
      return res.status(404).json({ message: "enter amount please" });

    let incomeId = `INC-ID ${Date.now()}`;
    let income = await incomeModel.create({
      incomeAmount: amount,
      incomeId: incomeId,
    });
    return res
      .status(200)
      .json({ message: "income stored successfully", data: income });
  } catch (error) {
    console.log(error);
  }
};
