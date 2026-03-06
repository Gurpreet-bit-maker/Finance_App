import React, { useContext } from "react";
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

  return (
    <div>
      <br />
      <h1 className="text-3xl text-center tracking-wider font-semibold text-gray-900  pb-3 mb-6">
        📊 Analytics Data
      </h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={recentTransactions}>
          <XAxis dataKey="typeSource" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#22c55e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Analytics;
