import React, { useState } from "react";

const btnText = ["This Week", "This Month", "Food", "Over ₹2,000"];

function QuickFilter({ setThisMonth, setFoodValue, setThisWeek, setOver2k }) {
  const [activeCategory, setActiveCategory] = useState(() => {
    return sessionStorage.getItem("searchCategory") || "";
  });

  const [activeDate, setActiveDate] = useState(() => {
    return sessionStorage.getItem("searchMonth") || "";
  });

  const [activeWeek, setActiveWeek] = useState(() => {
    return sessionStorage.getItem("searchWeek") || "";
  });

  const [active2K, setActive2K] = useState(() => {
    return sessionStorage.getItem("searchAmount") || "";
  });

  // -----------------------------
  // THIS MONTH
  // -----------------------------
  const thisMonthValueFunc = () => {
    if (activeDate === "This Month") {
      setActiveDate("");
      setThisMonth("");

      sessionStorage.removeItem("searchMonth");
    } else {
      setActiveDate("This Month");
      setThisMonth("date");

      sessionStorage.setItem("searchMonth", "This Month");
    }
  };

  // -----------------------------
  // FOOD
  // -----------------------------
  const foodValueFunc = () => {
    if (activeCategory === "Food") {
      setActiveCategory("");
      setFoodValue("");

      sessionStorage.removeItem("searchCategory");
    } else {
      setActiveCategory("Food");
      setFoodValue("Food");

      sessionStorage.setItem("searchCategory", "Food");
    }
  };

  // -----------------------------
  // THIS WEEK
  // -----------------------------
  const weekValueFunc = () => {
    if (activeWeek === "This Week") {
      setActiveWeek("");
      setThisWeek("");

      sessionStorage.removeItem("searchWeek");
    } else {
      setActiveWeek("This Week");
      setThisWeek("This Week");

      sessionStorage.setItem("searchWeek", "This Week");
    }
  };

  // -----------------------------
  // OVER ₹2,000
  // -----------------------------
  const over2k = () => {
    if (active2K === "Over ₹2,000") {
      setActive2K("");
      setOver2k("");

      sessionStorage.removeItem("searchAmount");
    } else {
      setActive2K("Over ₹2,000");
      setOver2k("Over ₹2,000");

      sessionStorage.setItem("searchAmount", "Over ₹2,000");
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Quick Filters</h2>

      <div className="flex flex-wrap gap-4">
        {btnText.map((item, index) => {
          const isActive =
            item === activeDate ||
            item === activeCategory ||
            item === activeWeek ||
            item === active2K;

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

                if (item === "This Week") {
                  weekValueFunc();
                }

                if (item === "Over ₹2,000") {
                  over2k();
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
