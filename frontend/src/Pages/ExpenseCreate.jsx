import axios from "axios";
import React, { useContext, useState } from "react";
import SubCategory from "../Components/Expense/SubCategory";
import Category from "../Components/Expense/Category";
import Navbar from "../Components/BottomNav/Navbar";
import { ExpenseVarible } from "../Context/expense/Expense";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ExpenseCreate() {
  const apiUrl = import.meta.env.VITE_SERVER;

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
        {
          amount,
          Subcategory,
          selectedCategory,
          paymentMode,
          expenseDate,
        },
        { withCredentials: true },
      );

      setAmount("");
      setSubcategory("");
      setSelectedCategory("");
      setNote("");
      setExpenseDate("");

      await getDeshboardFunc();

      navigate("/");
    } catch (error) {
      console.log(error.response.data.message);
      alert(`${error.response.data.message}`);
    }
  };

  //* Set today date for expense create
  const today = new Date().toISOString().split("T")[0];

  const oneMonth = new Date();
  oneMonth.setMonth(oneMonth.getMonth() - 1);

  const lastMonth = oneMonth.toISOString().split("T")[0];

  console.log({
    amount,
    Subcategory,
    selectedCategory,
  });

  return (
    <div
      className="flex flex-col gap-y-5 p-5 pb-28 lg:mx-auto lg:max-w-6xl xl:max-w-7xl"
      style={{ paddingBottom: "100px" }}
    >
      {/* Back Button */}
      <div className="mb-1 flex items-center gap-x-5">
        <button
          onClick={() => navigate(-1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-white transition hover:bg-gray-100"
        >
          <ArrowLeft size={21} />
        </button>

        <h1 className="text-lg font-semibold text-gray-800">
          Add Expense
        </h1>
      </div>

      {/* Amount Card */}
      <div className="mx-auto w-full max-w-4xl rounded-3xl border border-gray-200 bg-white p-5 shadow-lg sm:p-6 md:p-7">
        <h1 className="mb-5 text-xl font-bold text-gray-900 sm:text-2xl">
          Amount <span className="text-red-500">*</span>
        </h1>

        <div className="relative">
          {/* Currency Icon */}
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl text-gray-400 sm:text-3xl">
            ₹
          </span>

          {/* Amount Input */}
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="h-20 w-full rounded-2xl border-4 border-indigo-600 bg-white px-14
            text-center text-3xl font-bold text-gray-900 outline-none
            sm:h-24 sm:text-4xl md:text-5xl"
          />
        </div>
      </div>

      {/* Category */}
      <Category
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Sub Category */}
      <SubCategory
        selectedCategory={selectedCategory}
        setSubcategory={setSubcategory}
      />

      {/* Date + Payment */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Date */}
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <label className="mb-4 block text-sm font-semibold text-gray-700">
            Date
          </label>

          <input
            type="date"
            max={today}
            min={lastMonth}
            value={expenseDate}
            onChange={(e) => setExpenseDate(e.target.value)}
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-base
            outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Payment */}
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <label className="mb-4 block text-sm font-semibold text-gray-700">
            Payment
          </label>

          <select
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-base
            outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Payment</option>

            {paymentModeObj.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Create Button */}
        <button
          onClick={createExpense}
          className="w-full rounded-xl bg-indigo-600 px-8 py-3
          font-semibold text-white transition-all duration-300
          hover:bg-indigo-700
          sm:w-auto md:col-span-2 md:justify-self-center"
        >
          Create Expense
        </button>
      </div>

      <Navbar />
    </div>
  );
}

export default ExpenseCreate;