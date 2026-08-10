import expenseSchema from "../../../models/expenseSchema.js";

export const generateAIResponse = async (req, res) => {
  try {
    let { category, thisMonth, thisWeek, overAmount } = req.query;

    console.log(req.query);

    const expenses = await expenseSchema.find({
      user: req.user.userId,
    });

    // =========================================================
    // QUICK FILTER QUERY
    // =========================================================

    // Cannot select This Month and This Week together
    if (thisMonth !== "" && thisWeek !== "") {
      return res.status(400).json({
        message: "Month and week cannot be selected at the same time.",
        expenses: null,
      });
    }

    // =========================================================
    // THIS WEEK + OVER ₹2,000
    // =========================================================

    if (
      overAmount !== "" &&
      thisWeek !== "" &&
      thisMonth === "" &&
      category === ""
    ) {
      const lastWeekAndOverAmount = expenses.filter((item) => {
        const today = new Date();
        const lastWeek = new Date(today);

        lastWeek.setDate(today.getDate() - 7);

        return (
          item.date >= lastWeek &&
          item.date <= today &&
          item.finalAmount >= 2000
        );
      });

      return res.json({
        message: "Last Week and Over Amount of 2000",
        expenses: lastWeekAndOverAmount,
      });
    }

    // =========================================================
    // THIS MONTH
    // =========================================================

    if (
      category === "" &&
      thisWeek === "" &&
      overAmount === "" &&
      thisMonth !== ""
    ) {
      const monthNum = new Date().getMonth();

      const thisMonthExpenses = expenses.filter((item) => {
        return new Date(item.date).getMonth() === monthNum;
      });

      return res.json({
        message: "This Month expenses",
        expenses: thisMonthExpenses,
      });
    }

    // =========================================================
    // OVER ₹2,000
    // =========================================================

    if (
      category === "" &&
      thisMonth === "" &&
      thisWeek === "" &&
      overAmount !== ""
    ) {
      const over2kExpenses = expenses.filter((item) => {
        return item.finalAmount >= 2000;
      });
      console.log(over2kExpenses);
      console.log([] == "");

      return res.json({
        message: "Over 2k expenses",
        expenses: over2kExpenses,
      });
    }

    // =========================================================
    // THIS MONTH + OVER ₹2,000
    // =========================================================

    if (
      overAmount !== "" &&
      thisMonth !== "" &&
      thisWeek === "" &&
      category === ""
    ) {
      const monthNum = new Date().getMonth();

      const over2kExpensesOfThisMonth = expenses.filter((item) => {
        return (
          item.finalAmount >= 2000 &&
          new Date(item.date).getMonth() === monthNum
        );
      });

      return res.json({
        message: "Over 2k Month",
        expenses: over2kExpensesOfThisMonth,
      });
    }

    // =========================================================
    // CATEGORY + OVER ₹2,000
    // =========================================================

    if (
      thisMonth === "" &&
      thisWeek === "" &&
      overAmount !== "" &&
      category !== ""
    ) {
      const over2kExpensesWithCategory = expenses.filter((item) => {
        return item.finalAmount >= 2000 && item.category === category;
      });

      return res.json({
        message: "Over 2k ,Food",
        expenses: over2kExpensesWithCategory,
      });
    }

    // =========================================================
    // ONLY CATEGORY
    // =========================================================

    if (category !== "" && thisMonth === "" && thisWeek === "") {
      const categoryExpenses = expenses.filter((item) => {
        return item.category === category;
      });

      return res.json({
        message: "Food expenses",
        expenses: categoryExpenses,
      });
    }

    // =========================================================
    // THIS WEEK
    // =========================================================

    if (thisWeek !== "" && category === "" && thisMonth === "") {
      const lastWeekExpenses = expenses.filter((item) => {
        const today = new Date();
        const lastWeek = new Date(today);

        lastWeek.setDate(today.getDate() - 7);

        return item.date >= lastWeek && item.date <= today;
      });

      return res.json({
        message: "Last Week",
        expenses: lastWeekExpenses,
      });
    }

    // =========================================================
    // CATEGORY + THIS WEEK
    // =========================================================

    if (category && thisWeek) {
      const lastWeekAndCategory = expenses.filter((item) => {
        const today = new Date();
        const lastWeek = new Date(today);

        lastWeek.setDate(today.getDate() - 7);

        return (
          item.date >= lastWeek &&
          item.date <= today &&
          item.category === category
        );
      });

      return res.json({
        message: "Week and Food",
        expenses: lastWeekAndCategory,
      });
    }

    // =========================================================
    // CATEGORY + THIS MONTH
    // =========================================================

    if (thisMonth && category) {
      const monthNum = new Date().getMonth();

      const thisMonthAndCategoryExpenses = expenses.filter(
        (item) =>
          item.category === category &&
          new Date(item.date).getMonth() === monthNum,
      );

      return res.json({
        message: "Month and Food",
        expenses: thisMonthAndCategoryExpenses,
      });
    }

    // =========================================================
    // NO FILTER
    // =========================================================

    return res.json({
      message: "All Expenses",
      expenses,
    });
  } catch (error) {
    console.log("Search Error:", error.message);

    return res.status(500).json({
      message: "Something went wrong while searching expenses.",
    });
  }
};
