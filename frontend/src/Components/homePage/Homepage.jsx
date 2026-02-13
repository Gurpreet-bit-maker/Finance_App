// import React from "react";
// import { AuthContextVarible } from "../../Context/auth/AuthContext";
// import { useContext } from "react";
// import Navbar from "./Navbar";
// function Homepage() {
//   let { user } = useContext(AuthContextVarible);
//   console.log(user);
//   return (
//     <div>
//       <Navbar />
//       <h1>i am deshboard Component</h1>
//     </div>
//   );
// }

// export default Homepage;

import React from "react";
import Navbar from "./Navbar";
function HomePage() {
  // Example props structure
  const user = { name: "John Doe" };
  const dashboard = {
    totalBalance: 5000,
    totalIncome: 8000,
    totalExpense: 3000,
    recentTransactions: [
      {
        note: "Salary",
        amount: 5000,
        type: "Income",
        category: "Salary",
        date: "2026-02-01",
      },
      {
        note: "Food",
        amount: 200,
        type: "Expense",
        category: "Food",
        date: "2026-02-02",
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        {/* Greeting */}
        <h1 className="text-3xl font-bold mb-6">Hello, {user.name}</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
            <h2 className="text-gray-500 font-semibold">Total Balance</h2>
            <p className="text-2xl font-bold">{dashboard.totalBalance} ₹</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
            <h2 className="text-gray-500 font-semibold">Total Income</h2>
            <p className="text-2xl font-bold text-green-500">
              {dashboard.totalIncome} ₹
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
            <h2 className="text-gray-500 font-semibold">Total Expense</h2>
            <p className="text-2xl font-bold text-red-500">
              {dashboard.totalExpense} ₹
            </p>
          </div>
        </div>

        {/* Add Transaction Button */}
        <div className="flex justify-end mb-6">
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded">
            + Add Transaction
          </button>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Note</th>
                <th className="py-2">Category</th>
                <th className="py-2">Type</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.recentTransactions.map((txn, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2">{txn.note}</td>
                  <td className="py-2">{txn.category}</td>
                  <td
                    className={`py-2 ${txn.type === "Income" ? "text-green-500" : "text-red-500"}`}
                  >
                    {txn.type}
                  </td>
                  <td className="py-2">{txn.amount} ₹</td>
                  <td className="py-2">{txn.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default HomePage;
