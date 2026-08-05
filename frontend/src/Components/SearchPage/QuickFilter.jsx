import React, { useState } from "react";

const btnText = ["This Week", "This Month", "Food", "Over $20"];

function QuickFilter({ setThisMonth, setFoodValue }) {
  const [activeDate, setActiveDate] = useState("");
  const [activeCategory, setActiveCategory] = useState("");

  const thisMonthValueFunc = () => {
    if (activeDate === "This Month") {
      setActiveDate("");
      setThisMonth("");
    } else {
      setActiveDate("This Month");
      setThisMonth("date");
    }
  };

  const foodValueFunc = () => {
    if (activeCategory === "Food") {
      setActiveCategory("");
      setFoodValue("");
    } else {
      setActiveCategory("Food");
      setFoodValue("Food");
    }
  };

  return (
    <div className="w-full rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">Quick Filters</h2>

      <div className="flex flex-wrap gap-4">
        {btnText.map((item, index) => {
          const isActive = item === activeDate || item === activeCategory;

          return (
            <button
              key={index}
              onClick={() => {
                if (item === "This Month") {
                  thisMonthValueFunc();
                }

                if (item === "Food") {
                  foodValueFunc();
                }
              }}
              className={`rounded-2xl px-7 py-4 text-lg font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuickFilter;
