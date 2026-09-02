import React, { useContext, useState } from "react";
import { User, ArrowLeft, Mail, Phone, UserRound } from "lucide-react";
import axios from "axios";
import ExportsFile from "../Components/SettingPage/ExportsFile";
import Navbar from "../Components/BottomNav/Navbar";
import { ExpenseVarible } from "../Context/expense/Expense";
import { useNavigate } from "react-router-dom";

function Setting() {
  const apiUrl = import.meta.env.VITE_SERVER;
  const navigate = useNavigate();

  let { userInfo, MonthlySum } = useContext(ExpenseVarible);
  const [monthBudget, setBudget] = useState(MonthlySum.incomeAmount);
  // const userDetails = userInfo?.name || "helo";


  const postMonthlyBudget = async () => {
    try {
      const res = await axios.post(
        `${apiUrl}/api/user/create-income`,
        { monthBudget: monthBudget },
        { withCredentials: true },
      );

      console.log(res.data);
      alert(`Successfully Added Your Budget ${monthBudget}`);
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <div className="p-5 lg:mx-auto lg:max-w-6xl xl:max-w-7xl">
        {/* Back Button */}
        <div className="flex gap-x-5 mb-6 lg:mb-8 items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-100 transition"
          >
            <ArrowLeft size={24} />
          </button>

          <h1>Setting</h1>
        </div>

        {/* Profile Card */}
        <div className="w-full max-w-4xl mx-auto bg-white border border-gray-200 rounded-3xl shadow-lg p-5 sm:p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <User size={28} className="text-gray-600" />

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Profile
            </h1>
          </div>

          {/* Content */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center md:items-start">
            {/* Avatar */}
            <div className="shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-linear-to-br from-violet-600 to-indigo-700 flex items-center justify-center shadow-lg">
                <span className="text-3xl sm:text-4xl font-bold text-white">
                  {userInfo?.name.slice(0, 1)}
                </span>
              </div>
            </div>

            {/* Form */}
            <div className="flex-1 w-full">
              <div className="space-y-5">
                {/* Full Name */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-violet-200 transition-all duration-200">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-violet-100 shrink-0">
                    <UserRound className="w-6 h-6 text-violet-600" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-gray-500 mb-1">Full Name</p>
                    <p className="text-gray-800 text-lg sm:text-xl font-semibold break-words">
                      {userInfo?.name}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-violet-200 transition-all duration-200">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-violet-100 shrink-0">
                    <Mail className="w-6 h-6 text-violet-600" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-gray-500 mb-1">Email Address</p>
                    <p className="text-gray-800 text-lg sm:text-xl font-semibold break-all">
                      {userInfo?.email}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-violet-200 transition-all duration-200">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-violet-100 shrink-0">
                    <Phone className="w-6 h-6 text-violet-600" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                    <p className="text-gray-800 text-lg sm:text-xl font-semibold break-words">
                      {userInfo?.phone}
                    </p>
                  </div>
                </div>

                {/* Budget */}
                <div className="pt-3">
                  <label className="block text-gray-700 text-base sm:text-lg font-semibold mb-2">
                    Monthly Budget
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-medium">
                      ₹
                    </span>

                    <input
                      type="number"
                      placeholder="Enter your monthly budget"
                      value={monthBudget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full h-13 sm:h-14 rounded-2xl border border-gray-300 bg-white pl-10 pr-4 text-base sm:text-lg outline-none transition-all duration-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={postMonthlyBudget}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 active:scale-[0.98] text-white font-semibold shadow-md shadow-violet-200 transition-all duration-200"
                >
                  Save Budget
                </button>
              </div>
            </div>
          </div>
        </div>

        <br />

        {/* Exports */}
        <div
          className="w-full lg:max-w-4xl lg:mx-auto"
          style={{ paddingBottom: "100px" }}
        >
          <ExportsFile />
        </div>

        <Navbar />
      </div>
    </>
  );
}

export default Setting;