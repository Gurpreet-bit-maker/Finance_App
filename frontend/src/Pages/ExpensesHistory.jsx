import React, { useContext } from "react";
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

import { ExpenseVarible } from "../Context/expense/Expense";
import Navbar from "../Components/BottomNav/Navbar"
function ExpensesHistory() {
    const { transection } = useContext(ExpenseVarible);

    const icons = {
        Food: UtensilsCrossed,
        Transport: Bus,
        Shopping: ShoppingBag,
        Entertainment: Film,
        Bills: Receipt,
        Health: HeartPulse,
        Education: GraduationCap,
        Travel: Plane,
        Other: CircleEllipsis,
    };

    if (!transection || transection.length === 0) {
        return null;
    }

    return (
        <div className="space-y-3 rounded-3xl bg-gray-100 p-3 shadow-md sm:space-y-4 sm:p-5 md:p-6">
            {transection.map((item, index) => {
                const Icon = icons[item.category];

                return (
                    <div
                        key={index}
                        className="flex items-center justify-between gap-3 rounded-2xl bg-gray-50 p-3 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:gap-4 sm:p-4 md:p-5"
                    >
                        {/* Left */}
                        <div className="flex min-w-0 items-center gap-4">

                            {/* Icon */}
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm sm:h-13 sm:w-13 sm:rounded-2xl">
                                {Icon && (
                                    <Icon
                                        size={22}
                                        className="rounded-lg bg-green-100 p-1 text-green-600"
                                    />
                                )}
                            </div>

                            {/* Details */}
                            <div className="min-w-0">
                                <h2 className="max-w-[140px] truncate text-sm font-semibold text-gray-800 sm:max-w-[250px] sm:text-base md:max-w-none md:text-lg">
                                    {item.subCategory}
                                </h2>

                                <div className="mt-1 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                                    <span className="w-fit rounded-full border border-gray-300 bg-white px-2 py-0.5 text-xs text-gray-600">
                                        {item.category}
                                    </span>

                                    <span className="text-xs text-gray-500 sm:text-sm">
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
                        <div className="shrink-0 text-right">
                            <h2 className="whitespace-nowrap text-base font-bold text-gray-800 sm:text-lg md:text-2xl">
                                -₹{item.finalAmount}
                            </h2>
                        </div>
                    </div>
                );
            })}
            <Navbar />
        </div>
    );
}

export default ExpensesHistory;