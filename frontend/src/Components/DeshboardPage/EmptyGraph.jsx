import React from "react";
import { PieChart } from "lucide-react";
function EmptyGraph() {
  return (
    <div className="flex min-h-80 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10">
      <PieChart size={56} strokeWidth={1.5} className="text-gray-400" />
      <h2 className="mt-4 text-center text-lg font-semibold text-gray-700">
        No data available
      </h2>
      <p className="mt-2 max-w-xs text-center text-sm text-gray-500">
        Your pie chart will appear here once you add some transactions.
      </p>
    </div>
  );
}

export default EmptyGraph;
