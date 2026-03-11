import React, { useContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { UserRecentTran_Varible } from "../Context/Transections/Transections";

function Analytics() {
  let { recentTransactions } = useContext(UserRecentTran_Varible);
  console.log(recentTransactions);

  let expenseArr = recentTransactions.filter(
    (element) => element.typeSource == "expense",
  );
  let expensePrice = expenseArr.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);

  let incomeArr = recentTransactions.filter(
    (element) => element.typeSource == "income",
  );
  let incomePrice = incomeArr.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);

  let arr = [
    { dataType: "Income", amount: incomePrice },
    { dataType: "Expense", amount: expensePrice },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <br />
      <h1 className=" text-white text-3xl text-center tracking-wider font-semibold text-gray-900  pb-3 mb-6">
        📊 Analytics Data
      </h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={arr}>
          <XAxis dataKey="dataType" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#22c55e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Analytics;
