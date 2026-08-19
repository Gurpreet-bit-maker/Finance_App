import React, { useContext, useState } from "react";
import { User, ArrowLeft } from "lucide-react";
import axios from "axios";
import ExportsFile from "../Components/SettingPage/ExportsFile";
import Navbar from "../Components/BottomNav/Navbar"
import { ExpenseVarible } from "../Context/expense/Expense";
import { useNavigate } from "react-router-dom";

function Setting() {
  const apiUrl = import.meta.env.VITE_SERVER
  const navigate = useNavigate();

  let { userInfo } = useContext(ExpenseVarible);
  const [monthBudget, setBudget] = useState(0);
  console.log(userInfo);

  const postMonthlyBudget = async () => {
    try {
      const res = await axios.post(
        `${apiUrl}/api/user/create-income`,
        { monthBudget: monthBudget },
        { withCredentials: true },
      );

      console.log(res.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  // let name = $('123');
  // console.log(name);

  return (
    <>
      <div className="flex gap-x-5 items-center">
        <button
          onClick={() => navigate(-1)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-100 transition"
        >
          <ArrowLeft size={24} />
        </button>{" "}
        <h1>Add Expense</h1>
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 my-5 ml-2">
        Setting
      </h1>
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
                {userInfo.slice(0, 1)}
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="flex-1 w-full">
            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-gray-600 text-lg sm:text-xl mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  value={userInfo}
                  readOnly
                  className="w-full h-12 sm:h-14 rounded-2xl border border-gray-300 bg-gray-50 px-4 sm:px-5 text-lg sm:text-2xl outline-none"
                />
              </div>

              {/* Budget */}
              <div>
                <label className="block text-gray-600 text-lg sm:text-xl mb-2">
                  Monthly Budget
                </label>

                <input
                  type="number"
                  placeholder="₹3500"
                  value={monthBudget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full h-12 sm:h-14 rounded-2xl border border-gray-300 bg-gray-50 px-4 sm:px-5 text-lg sm:text-2xl outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              {/* Button */}
              <button
                onClick={postMonthlyBudget}
                className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300"
              >
                Save Budget
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div style={{ paddingBottom: "100px" }}>
        <ExportsFile />
      </div>
      <Navbar />

    </>
  );
}

export default Setting;
