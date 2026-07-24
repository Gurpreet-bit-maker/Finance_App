import mongoose from "mongoose";

let expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expenseId: {
      type: String,
      unique: true,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Food",
        "Transport",
        "Shopping",
        "Entertainment",
        "Bills",
        "Health",
        "Education",
        "Travel",
        "Other",
      ],
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },

    finalAmount: Number,
    paymentMode: {
      type: String,
      enum: ["Cash", "UPI", "Card", "Bank Transfer"],
      default: "Cash",
    },
    note: String,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

let Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
