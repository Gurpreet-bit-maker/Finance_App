import { ai } from "../../../config/Gemini.js";
import expenseSchema from "../../../models/expenseSchema.js";
export const generateAIResponse = async (req, res) => {
  try {
    //* prompt search btn
    // const { promptValue } = req.body;
    // console.log(promptValue);
    // if (!promptValue) {
    //   return res.status(400).json({
    //     error: "Prompt is required",
    //   });
    // }
    //* Quick filter query
    let { category, date } = req.query;
    console.log(req.query);
    // if (!category && !date)
    //   return res.json({ message: "Food or Date required" });

    const expenses = await expenseSchema.find({ user: req.user.userId });
    if (category) {
      const foodExpenses = expenses.filter((item) => item.category == category);
      console.log(foodExpenses);
      return res
        .status(201)
        .json({ message: "successfully", expenses: foodExpenses });
    }
    if (date) {
      const thisMonthExpenses = expenses.filter((item) => {
        const monthNum = new Date().getMonth();
        return new Date(item.date).getMonth() == monthNum;
      });
      console.log(thisMonthExpenses);
      return res.json({
        message: "This Month Expenses",
        expenses: thisMonthExpenses,
      });
    }
    return res.json({ message: "All Transections", expenses: expenses });

    // const allExpenses = expenses.map((item) => item.category);
    // console.log(allExpenses);

    // const result = await ai.models.generateContent({
    //   model: "gemini-3.5-flash-lite",
    //   contents: promptValue,
    // });

    // return res.json({
    //   message: result.text,
    // });
  } catch (error) {
    console.log("Gemini Error:", error);
    console.log("Message:", error.message);

    if (error.response) {
      console.log(error.response.data);
    }

    res.status(500).json({
      error: error.message,
    });
  }
};
