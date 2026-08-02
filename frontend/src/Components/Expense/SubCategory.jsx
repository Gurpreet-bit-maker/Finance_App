import React from "react";
import { Sparkles } from "lucide-react";

function SubCategory({ selectedCategory, setSubcategory }) {
  const subCategories = {
    Food: ["Groceries", "Restaurants", "Snacks", "Beverages", "Fast Food"],

    Transport: ["Fuel", "Bus", "Metro", "Taxi", "Train", "Parking"],

    Shopping: ["Clothes", "Electronics", "Shoes", "Accessories", "Furniture"],

    Entertainment: ["Movies", "Games", "Music", "Streaming", "Events"],

    Bills: ["Electricity", "Water", "Internet", "Mobile Recharge", "Rent"],

    Health: ["Medicine", "Doctor", "Hospital", "Medical Tests", "Insurance"],

    Education: [
      "Books",
      "Courses",
      "Stationery",
      "School Fees",
      "Online Learning",
    ],

    Travel: ["Flight", "Hotel", "Train", "Bus", "Food", "Local Transport"],

    Other: ["Gifts", "Donations", "Pets", "Personal Care", "Miscellaneous"],
  };
  // todo chnaging this with user category choose
  return (
    <div className="w-full max-w-5xl mx-auto bg-white border border-gray-200 rounded-3xl shadow-lg p-5 sm:p-7 md:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Description <span className="text-red-500">*</span>
      </h1>

      {/* Select */}
      <select
        onChange={(e) => setSubcategory(e.target.value)}
        className="w-full h-16 sm:h-20 rounded-3xl border-2 border-gray-300 bg-white px-6 text-xl sm:text-2xl text-gray-800 outline-none focus:border-indigo-600 transition"
      >
        <option value="">Select Description</option>

        {subCategories[selectedCategory]?.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      {/* AI Suggestion */}
      <div className="mt-8 rounded-3xl border-2 border-blue-200 bg-blue-50 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
            <Sparkles className="text-blue-600" size={28} />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-blue-700">
            AI Suggestion
          </h2>
        </div>

        <p className="mt-6 text-lg sm:text-2xl text-blue-700">
          This looks like a{" "}
          <span className="font-semibold">{selectedCategory}</span> expense.
        </p>

        <button className="mt-6 w-full rounded-2xl bg-blue-600 py-4 text-lg sm:text-xl font-semibold text-white transition hover:bg-blue-700">
          ⚡ Apply Suggestion
        </button>
      </div>
    </div>
  );
}

export default SubCategory;
