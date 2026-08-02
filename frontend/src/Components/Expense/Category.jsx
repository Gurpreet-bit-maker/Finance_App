import React, { useState } from "react";
import {
  UtensilsCrossed,
  Bus,
  ShoppingBag,
  Film,
  Receipt,
  HeartPulse,
  GraduationCap,
  Plane,
  CircleEllipsis,
} from "lucide-react";

function Category({ selectedCategory, setSelectedCategory }) {
  const categoryName = [
    "Food",
    "Transport",
    "Shopping",
    "Entertainment",
    "Bills",
    "Health",
    "Education",
    "Travel",
    "Other",
  ];
  const icons = {
    Food: <UtensilsCrossed className="w-7 h-7 sm:w-8 sm:h-8" />,
    Transport: <Bus className="w-7 h-7 sm:w-8 sm:h-8" />,
    Shopping: <ShoppingBag className="w-7 h-7 sm:w-8 sm:h-8" />,
    Entertainment: <Film className="w-7 h-7 sm:w-8 sm:h-8" />,
    Bills: <Receipt className="w-7 h-7 sm:w-8 sm:h-8" />,
    Health: <HeartPulse className="w-7 h-7 sm:w-8 sm:h-8" />,
    Education: <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8" />,
    Travel: <Plane className="w-7 h-7 sm:w-8 sm:h-8" />,
    Other: <CircleEllipsis className="w-7 h-7 sm:w-8 sm:h-8" />,
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white border border-gray-200 rounded-3xl shadow-lg p-5 sm:p-7 md:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Category <span className="text-red-500">*</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {categoryName.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedCategory(item)}
            className={`cursor-pointer flex items-center gap-4 sm:gap-5 rounded-2xl sm:rounded-3xl border-2 p-5 sm:p-6 transition-all duration-300

            ${
              selectedCategory === item
                ? "border-indigo-600 bg-indigo-50 shadow-md"
                : "border-gray-200 bg-white hover:border-indigo-400 hover:shadow-sm"
            }`}
          >
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-xl

              ${
                selectedCategory === item
                  ? "bg-indigo-100 text-indigo-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {icons[item]}
            </div>

            <h2 className="text-lg sm:text-xl font-semibold text-gray-700 break-words">
              {item}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
