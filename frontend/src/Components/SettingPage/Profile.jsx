import React, { useState } from "react";
import { User } from "lucide-react";
import axios from "axios";

function Profile() {
  const [monthBudget, setBudget] = useState(0);

  const postMonthlyBudget = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/create-income",
        { monthBudget },
        { withCredentials: true },
      );

      console.log(res.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
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
        <div className="flex-shrink-0">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center shadow-lg">
            <span className="text-3xl sm:text-4xl font-bold text-white">
              Rs
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
                value={name}
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
  );
}

export default Profile;
