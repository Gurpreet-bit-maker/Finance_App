import React from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { IndianRupee } from "lucide-react";
import EmptyGraph from "./EmptyGraph";

const COLORS = ["#EF4444", "#3B82F6", "#22C55E", "#F59E0B"];

export const MONTHS = [
  { num: 1, name: "Jan", days: 31 },
  { num: 2, name: "Feb", days: 28 },
  { num: 3, name: "Mar", days: 31 },
  { num: 4, name: "Apr", days: 30 },
  { num: 5, name: "May", days: 31 },
  { num: 6, name: "Jun", days: 30 },
  { num: 7, name: "Jul", days: 31 },
  { num: 8, name: "Aug", days: 31 },
  { num: 9, name: "Sep", days: 30 },
  { num: 10, name: "Oct", days: 31 },
  { num: 11, name: "Nov", days: 30 },
  { num: 12, name: "Dec", days: 31 },
];

function GraphComp({ graphArr }) {
  if (graphArr.length === 0) return <EmptyGraph />;

  return (
    <div className="w-full rounded-3xl bg-white p-4 sm:p-5 shadow-lg">
      <div className="flex items-center justify-between gap-4">
        {/* Left - Chart */}
        <div className="w-[180px] sm:w-[210px] md:w-[240px] h-[180px] sm:h-[210px] md:h-[240px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={graphArr}
                dataKey="totalSpent"
                nameKey="category"
                innerRadius={48}
                outerRadius={82}
              >
                {graphArr.map((item, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Right */}
        <div className="flex-1 min-w-0">
          {graphArr.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2"
            >
              {/* Left */}
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-3.5 h-3.5 rounded-full shrink-0"
                  style={{
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                />

                <p className="text-[15px] sm:text-base font-medium text-gray-700 truncate">
                  {item._id.category}
                </p>
              </div>

              {/* Right */}
              <div className="text-right shrink-0">
                <p className="text-[17px] sm:text-lg font-bold text-gray-900">
                  <IndianRupee size={15} className="inline mr-1" />
                  {item.totalSpent}
                </p>

                <p className="text-xs sm:text-sm text-gray-500">
                  {item.totalPercentage}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GraphComp;