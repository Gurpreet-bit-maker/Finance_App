import { Calendar, Percent } from "lucide-react";

function MonthlySummery({ MonthlySumArr }) {
  return (
    <div className="w-full rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-5 sm:p-7 text-white shadow-2xl">
      {/* Top */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm sm:text-base text-indigo-100">
            Total Spent This Month
          </p>

          <h1 className="mt-2 break-words text-3xl font-bold sm:text-4xl md:text-5xl">
            ₹{MonthlySumArr.expensesAmount}
          </h1>
        </div>

        <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
          <span className="text-2xl sm:text-3xl font-bold">₹</span>
        </div>
      </div>

      {/* Budget & Remaining */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm sm:text-base text-indigo-100">
          Budget:{" "}
          <span className="font-semibold text-white">
            ₹{MonthlySumArr.incomeAmount}
          </span>
        </p>

        <p className="text-sm sm:text-base text-indigo-100">
          Remaining:{" "}
          <span className="font-semibold text-white">
            ₹{MonthlySumArr.reminderAmount}
          </span>
        </p>
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
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm sm:text-base">
            {MonthlySumArr.usedPercentage}{" "}
            <Percent size={18} className="inline" /> Used
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={18} />
          <span className="text-sm sm:text-base">
            {MonthlySumArr.leftDays} Days Left
          </span>
        </div>
      </div>
    </div>
  );
}

export default MonthlySummery;
