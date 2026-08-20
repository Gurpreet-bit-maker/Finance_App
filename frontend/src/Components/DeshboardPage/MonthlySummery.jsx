import { Calendar, Percent } from "lucide-react";

export const getLeftDays = () => {
  const today = new Date();

  const lastDay = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  );

  return lastDay.getDate() - today.getDate();
};

function MonthlySummery({ MonthlySumArr }) {
  console.log(MonthlySumArr);
  const leftDays = getLeftDays();


  if (!MonthlySumArr) {
    return null;
  }

  return (
    <div className="w-full rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-5 text-white shadow-2xl sm:p-7">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wider text-indigo-100 sm:text-sm">
            Monthly Spending
          </p>

          <h1 className="mt-2 truncate text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            ₹{MonthlySumArr.expensesAmount}
          </h1>

          <p className="mt-1 text-xs font-medium text-indigo-100 sm:text-sm">
            Total spent this month
          </p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 shadow-inner backdrop-blur-md sm:h-16 sm:w-16">
          <span className="text-xl font-extrabold sm:text-3xl">₹</span>
        </div>
      </div>

      {/* Budget & Remaining */}
      <div className="mt-7 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
          <p className="text-xs font-medium text-indigo-100 sm:text-sm">
            Monthly Budget
          </p>

          <p className="mt-1 text-lg font-extrabold sm:text-xl">
            ₹{MonthlySumArr.incomeAmount}
          </p>
        </div>

        <div className="rounded-2xl bg-white/10 p-4 text-right backdrop-blur-sm">
          <p className="text-xs font-medium text-indigo-100 sm:text-sm">
            Remaining
          </p>

          <p className="mt-1 text-lg font-extrabold sm:text-xl">
            ₹{MonthlySumArr.reminderAmount}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold text-indigo-100">
            Budget Usage
          </span>

          <span className="text-sm font-extrabold">
            {MonthlySumArr.usedPercentage}%
          </span>
        </div>

        <div className="h-3 w-full overflow-hidden rounded-full bg-black/30">
          <div
            className="h-full rounded-full bg-white shadow-sm transition-all duration-500"
            style={{ width: `${MonthlySumArr.usedPercentage}%` }}
          />
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="mt-6 flex items-center justify-between border-t border-white/20 pt-5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/15">
            <Percent size={15} />
          </div>

          <div>
            <p className="text-[10px] font-medium uppercase tracking-wide text-indigo-100 sm:text-xs">
              Used
            </p>

            <p className="text-sm font-extrabold sm:text-base">
              {MonthlySumArr.usedPercentage}%
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/15">
            <Calendar size={15} />
          </div>

          <div>
            <p className="text-[10px] font-medium uppercase tracking-wide text-indigo-100 sm:text-xs">
              Time Left
            </p>

            <p className="text-sm font-extrabold sm:text-base">
              {leftDays} Days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonthlySummery;