import mongoose from "mongoose";

let incomeSchema = new mongoose.Schema(
  {
    incomeId: {
      type: String,
      unique: true,
      required: true,
    },

    incomeAmount: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true },
);

let Income = mongoose.model("Income", incomeSchema);
export default Income;
