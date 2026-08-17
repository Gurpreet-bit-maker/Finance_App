import { Calendar, Percent } from "lucide-react";
import { useEffect } from "react";

function MonthlySummery({ MonthlySumArr }) {
  console.log(MonthlySumArr);
  if (!MonthlySumArr) {
    return null;
  }

  return (
    <>
      <div className="w-full rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-5 sm:p-7 text-white shadow-2xl">
        Top
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm text-indigo-100">
              Total Spent This Month
            </p>

            <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold truncate">
              ₹{MonthlySumArr.expensesAmount}
            </h1>
          </div>

          <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
            <span className="text-xl sm:text-3xl font-bold">₹</span>
          </div>
        </div>

        {/* Budget & Remaining */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs sm:text-sm text-indigo-100">Budget</p>
            <p className="font-semibold text-sm sm:text-lg">
              ₹{MonthlySumArr.incomeAmount}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs sm:text-sm text-indigo-100">Remaining</p>
            <p className="font-semibold text-sm sm:text-lg">
              ₹{MonthlySumArr.reminderAmount}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="h-3 w-full overflow-hidden rounded-full bg-black/50">
            <div
              className="h-full rounded-full bg-white transition-all duration-500"
              style={{ width: `${MonthlySumArr.usedPercentage}%` }}
            />
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs sm:text-sm">
            <Percent size={14} />
            <span>{MonthlySumArr.usedPercentage}% Used</span>
          </div>

          <div className="flex items-center gap-1 text-xs sm:text-sm">
            <Calendar size={14} />
            <span>{MonthlySumArr.leftDays} Days Left</span>
          </div>
        </div>
      </div>
    </>

  );
}

export default MonthlySummery;
