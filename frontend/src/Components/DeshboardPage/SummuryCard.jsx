import React, { useContext } from "react";
import { UserTransectionsVarible } from "../../Context/Transections/SummeryContext";
function SummuryCard() {
  let { income, expense } = useContext(UserTransectionsVarible);
 

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Balance */}
        <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg text-center hover:scale-[1.02] transition">
          <h2 className="text-slate-500 font-semibold mb-2">Total Balance</h2>

          <p className="text-3xl font-bold text-indigo-600">
            {income - expense} ₹
          </p>
        </div>

        {/* Income */}
        <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg text-center hover:scale-[1.02] transition">
          <h2 className="text-slate-500 font-semibold mb-2">Total Income</h2>

          <p className="text-3xl font-bold text-green-500">{income} ₹</p>
        </div>

        {/* Expense */}
        <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg text-center hover:scale-[1.02] transition">
          <h2 className="text-slate-500 font-semibold mb-2">Total Expense</h2>

          <p className="text-3xl font-bold text-red-500">{expense} ₹</p>
        </div>
      </div>
    </>
    // <h1>hello world</h1>
  );
}

export default SummuryCard;
