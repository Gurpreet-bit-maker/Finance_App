import axios from "axios";
import React, { useContext, useState } from "react";
import SubCategory from "../Components/Expense/SubCategory";
import Category from "../Components/Expense/Category";
import Navbar from "../Components/BottomNav/Navbar"
import { ExpenseVarible } from "../Context/expense/Expense";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ExpenseCreate() {
  const apiUrl = import.meta.env.VITE_SERVER

  let { getDeshboardFunc } = useContext(ExpenseVarible);
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [Subcategory, setSubcategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Food");
  const [paymentMode, setPaymentMode] = useState("");
  const [note, setNote] = useState("");
  const [expenseDate, setExpenseDate] = useState("");

  let paymentModeObj = ["Cash", "UPI", "Card", "Bank Transfer"];

  const createExpense = async () => {
    try {
      const postExpense = await axios.post(
        `${apiUrl}/api/user/create-expense`,
        { amount, Subcategory, selectedCategory, paymentMode, expenseDate },
        { withCredentials: true },
      );
      setAmount("");
      setSubcategory("");
      setSelectedCategory("");
      setNote("");
      setExpenseDate("");
      await getDeshboardFunc();

    } catch (error) {
      console.log(error.response.data.message);
      alert(`${error.response.data.message}`);
    }
  };
  console.log({ amount, Subcategory, selectedCategory });
  return (
    <div
      className="flex flex-col gap-y-5 p-5 pb-28"
      style={{ paddingBottom: "100px" }}
    >
      <div className="flex gap-x-5 items-center">
        <button
          onClick={() => navigate(-1)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-100 transition"
        >
          <ArrowLeft size={24} />
        </button>{" "}
        <h1>Add Expense</h1>
      </div>
      <div className="w-full max-w-4xl mx-auto bg-white border border-gray-200 rounded-3xl shadow-lg p-5 sm:p-7 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">
          Amount <span className="text-red-500">*</span>
        </h1>

        <div className="relative">
          {/* Currency Icon */}
          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-3xl sm:text-4xl">
            ₹
          </span>

          {/* Input */}
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full h-24 sm:h-28 rounded-3xl border-4 border-indigo-600 bg-white
          text-center text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900
          outline-none px-16"
          />
        </div>
      </div>
      {/* subCategory component */}
      <SubCategory
        selectedCategory={selectedCategory}
        setSubcategory={setSubcategory}
      />
      {/* category */}
      <Category
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Date */}
        <div className="border border-gray-200 rounded-3xl p-6 bg-white shadow-sm">
          <label className="block text-md font-semibold text-gray-700 mb-5">
            Date
          </label>

          <input
            type="date"
            value={expenseDate}
            className="w-full border border-gray-300 rounded-2xl px-5 py-4 text-lg outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setExpenseDate(e.target.value)}
          />
        </div>

        {/* Payment */}
        <div className="border border-gray-200 rounded-3xl p-6 bg-white shadow-sm">
          <label className="block text-md font-semibold text-gray-700 mb-5 ">
            Payment
          </label>

          <select
            onChange={(e) => setPaymentMode(e.target.value)}
            className="w-full border border-gray-300 rounded-2xl px-5 py-4 text-lg outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {paymentModeObj.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={createExpense}
          className=" w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white
        px-8 py-3 rounded-xl font-semibold transition-all duration-300"
        >
          Create Expense
        </button>
      </div>
      <Navbar />

    </div>
  );
}

export default ExpenseCreate;
