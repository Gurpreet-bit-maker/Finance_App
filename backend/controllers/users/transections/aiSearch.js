import { ai } from "../../../config/Gemini.js";
import expenseSchema from "../../../models/expenseSchema.js";

export const aiSearch_method = async (req, res) => {
  try {
    //* prompt search btn
    const promptValue = req.body.userPrompt;
    console.log(promptValue);
    if (!promptValue) {
      return res.status(400).json({
        error: "Prompt is required",
      });
    }
    const expenses = await expenseSchema.find({ user: req.user.userId });
    //* Transport over 1000
    if (promptValue === "Transport costs over 1000") {
      const transportOverOneK = expenses
        .filter(
          (item) => item.category == "Transport" && item.finalAmount > 1000,
        )
        .map(
          (item) =>
            `category : ${item.category}, expenseAmount: ${item.finalAmount}`,
        )
        .join("\n");

      const prompt = `
 Relevant expenses identify karo, total calculate karo, aur user ke request ke according clear, natural Hinglish me answer do.

Response ko conversational aur informative rakho. Sirf list ya numbers dekar mat rukna; zarurat ke according short explanation bhi do.

User ke request ke context me naturally baat karo, lekin response ke end me unnecessary offer ya follow-up question mat add karo.

Jaise:
"Agar aapko aur kuch chahiye..."
"Aap bata sakte hain..."
"Kya main aur help karu?"
in jaise closing sentences avoid karo.
    
    Here is my data:
    ${transportOverOneK}
    `;

      if (transportOverOneK !== "") {
        const result = await ai.models.generateContent({
          model: "gemini-3.5-flash-lite",
          contents: prompt,
        });

        return res.json({
          message: result.text,
        });
      } else {
        return res.json({
          message: "₹1,000 se zyada ka koi Transport expense nahi mila. 😊",
        });
      }
    }
    //* All food this week
    if (promptValue === "All food purchases last week") {
      const AllFoodThisWeek = expenses
        .filter((item) => {
          const today = new Date();
          const lastWeek = new Date(today);

          lastWeek.setDate(today.getDate() - 7);

          return (
            item.date >= lastWeek &&
            item.date <= today &&
            item.category == "Food"
          );
        })
        .map(
          (item) => `category: ${item.subCategory} amount: ${item.finalAmount}`,
        )
        .join("\n");

      const prompt = `
   Based on the user's request and the provided expense data, give a clear and accurate answer.
Respond in simple, friendly Hinglish.
Keep the response professional and natural, like a helpful finance assistant.
Avoid overly casual words like "tera", "chill", "haath rok le", etc.
Mention the relevant Food expenses from the last 7 days and calculate the total amount spent on Food.
If any Food expense is greater than ₹1,000, politely alert the user and suggest being mindful of that expense.
If all Food expenses are ₹1,000 or less, simply mention that there is no particular concern.
Keep the response short and easy to understand.
    
    Here is my data:
    ${AllFoodThisWeek}
    `;

      if (AllFoodThisWeek !== "") {
        const result = await ai.models.generateContent({
          model: "gemini-3.5-flash-lite",
          contents: prompt,
        });

        return res.json({
          message: result.text,
        });
      } else {
        return res.json({
          message:
            "Pichhle 7 din me Food category ka koi expense nahi mila. 😊",
        });
      }
    }
    //* Phone pay expenses today
    if (promptValue === "Phone pay expenses today") {
      const now = new Date();
      const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      const expenses24HoursPhonePay = expenses
        .filter(
          (item) =>
            new Date(item.date) >= last24Hours && item.paymentMode == "UPI",
        )
        .map(
          (item) =>
            `category: ${item.category}, amount: ${item.finalAmount} this is today expenses`,
        )
        .join("\n");

      const prompt = `
   Based on the user's request and the provided expense data, give a clear and accurate answer.
Respond in simple, friendly Hinglish.
Keep the response professional and natural, like a helpful finance assistant.
Avoid overly casual words like "tera", "chill", "haath rok le", etc.
Mention the relevant expense amount and total amount when applicable.
If any expense is greater than ₹1,000, politely alert the user and suggest being mindful of that expense.
If all expenses are ₹1,000 or less, simply mention that there is no particular concern.
Keep the response short and easy to understand.
    
    Here is my data:
    ${expenses24HoursPhonePay}
    `;

      if (expenses24HoursPhonePay !== "") {
        const result = await ai.models.generateContent({
          model: "gemini-3.5-flash-lite",
          contents: prompt,
        });

        return res.json({
          message: result.text,
        });
      } else {
        return res.json({
          message:
            "Abhi tak pichhle 24 hours me koi UPI expense nahi hua hai. 👍",
        });
      }
    }
  } catch (error) {
    console.log("Gemini Error:", error);
    console.log("Message:", error.message);

    res.status(500).json({
      success: false,
      message: "AI service failed. Please try again later.",
      error: error.message,
    });
  }
};
