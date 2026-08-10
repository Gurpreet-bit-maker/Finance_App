import React from "react";
import { Wallet } from "lucide-react";
function NoFoundExpense({}) {
  return (
    <div className="w-full min-h-[250px] flex flex-col items-center justify-center px-4 py-10 text-center">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <Wallet className="w-7 h-7 sm:w-9 sm:h-9 text-gray-400" />
      </div>

      <h3 className="text-lg sm:text-xl font-semibold text-gray-700">
        No Expenses Found
      </h3>

      <p className="mt-2 max-w-sm text-sm sm:text-base text-gray-500">
        No expenses match the selected filters.
      </p>
    </div>
  );
}

export default NoFoundExpense;
