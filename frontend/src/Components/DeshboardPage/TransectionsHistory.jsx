import axios from "axios";
import React, { useEffect, useState } from "react";
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

import { MONTHS } from "./GraphComp";
import { TrendingUp, Calendar } from "lucide-react";

const IconComp = [
  {
    name: "Food",
    icon: UtensilsCrossed,
  },
  {
    name: "Transport",
    icon: Bus,
  },
  {
    name: "Shopping",
    icon: ShoppingBag,
  },
  {
    name: "Entertainment",
    icon: Film,
  },
  {
    name: "Bills",
    icon: Receipt,
  },
  {
    name: "Health",
    icon: HeartPulse,
  },
  {
    name: "Education",
    icon: GraduationCap,
  },
  {
    name: "Travel",
    icon: Plane,
  },
  {
    name: "Other",
    icon: CircleEllipsis,
  },
];

function TransectionsHistory({ transectionsArr }) {
  let thisMonth = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const thisMonthExpenses = transectionsArr.filter((item) => {
    let expenseMonth = new Date(item.date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    return expenseMonth.split(" ")[1] == thisMonth.split(" ")[1];
  });

  let expenseMonth = new Date().getMonth() - 1;

  let previewMonthExpenses = transectionsArr.filter((item) => {
    let expense = new Date(item.date).getMonth();
    return expense == expenseMonth;
  });

  let thisMonthTotal = thisMonthExpenses.reduce((acc, current) => {
    return acc + current.finalAmount;
  }, 0);
  let previewMonthTotal = previewMonthExpenses.reduce((acc, current) => {
    return acc + current.finalAmount;
  }, 0);

  let incrementRange;

  if (previewMonthTotal == 0 || thisMonthTotal == 0) {
    incrementRange = 0;
  } else {
    incrementRange =
      ((thisMonthTotal - previewMonthTotal) / previewMonthTotal) * 100;
    console.log(incrementRange.toFixed(1));
  }

  //* 31 and 30 monthName months logic
  const date = new Date();
  const monthName = date.toString().split(" ")[1];
  const days = date.toString().split(" ")[2];
  let monthDayType;

  if (MONTHS[0].name == "Jan" && MONTHS[0].name == monthName) {
    monthDayType = 31;
    console.log(`currently month is jan`);
  } else if (MONTHS[1].name == "Feb" && MONTHS[1].name == monthName) {
    monthDayType = 28; // Leap year me 29
    console.log(`currently month is feb`);
  } else if (MONTHS[2].name == "Mar" && MONTHS[2].name == monthName) {
    monthDayType = 31;
    console.log(`currently month is march`);
  } else if (MONTHS[3].name == "Apr" && MONTHS[3].name == monthName) {
    monthDayType = 30;
    console.log(`currently month is apr`);
  } else if (MONTHS[4].name == "May" && MONTHS[4].name == monthName) {
    monthDayType = 31;
    console.log(`currently month is may`);
  } else if (MONTHS[5].name == "Jun" && MONTHS[5].name == monthName) {
    monthDayType = 30;
    console.log(`currently month is june`);
  } else if (MONTHS[6].name == "Jul" && MONTHS[6].name == monthName) {
    monthDayType = 31;
    console.log(`currently month is jul`);
  } else if (MONTHS[7].name == "Aug" && MONTHS[7].name == monthName) {
    monthDayType = 31;
  } else if (MONTHS[8].name == "Sep" && MONTHS[8].name == monthName) {
    monthDayType = 30;
  } else if (MONTHS[9].name == "Oct" && MONTHS[9].name == monthName) {
    monthDayType = 31;
  } else if (MONTHS[10].name == "Nov" && MONTHS[10].name == monthName) {
    monthDayType = 30;
  } else if (MONTHS[11].name == "Dec" && MONTHS[11].name == monthName) {
    monthDayType = 31;
  }
  const leftDays = monthDayType - Number(days);
  // console.log(leftDays);

  return (
    <>
      <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-6">
        {/* Heading */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Recent Transactions
          </h1>

          <button className="text-sm sm:text-base text-indigo-600 font-semibold hover:underline">
            View All
          </button>
        </div>

        {/* Transactions */}
        <div className="space-y-5">
          {transectionsArr.map((item, index) => {
            const cate = IconComp.find((logo) => logo.name === item.category);
            const Icon = cate?.icon;

            return (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 rounded-3xl px-6 py-5 hover:shadow-md transition"
              >
                {/* Left */}
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow flex items-center justify-center">
                    {Icon && (
                      <Icon
                        size={30}
                        className="text-green-600 bg-green-100 rounded-lg"
                      />
                    )}
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold">
                      {item.subCategory}
                    </h2>

                    <div className="flex items-center gap-3 mt-1">
                      <span className="border rounded-full px-3 py-1 text-sm">
                        {item.category}
                      </span>

                      <span className="text-gray-500 text-sm">
                        {new Date(item.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="text-right">
                  <h2 className="text-3xl font-bold">-₹{item.finalAmount}</h2>
                </div>
              </div>
            );
          })}
        </div>
        <br />
      </div>
      <br />
      {/*  */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Increment Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 py-8 px-6 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">
            <TrendingUp className="text-green-600" size={28} />
          </div>

          <p className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-500 font-medium">
            vs Last Month
          </p>

          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-green-600">
            {incrementRange !== 0 ? incrementRange.toFixed(1) : "N/A"}%
          </h2>
        </div>

        {/* Days Left Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 py-8 px-6 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
            <Calendar className="text-blue-600" size={28} />
          </div>

          <p className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-500 font-medium">
            Days Left
          </p>

          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600">
            {leftDays} days
          </h2>
        </div>
      </div>
    </>
  );
}

export default TransectionsHistory;
