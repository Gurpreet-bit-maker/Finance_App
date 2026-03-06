import React, { useContext } from "react";
import { UserRecentTran_Varible } from "../../Context/Transections/Transections";
function Transections() {
  let { recentTransactions } = useContext(UserRecentTran_Varible);
 

  return (
    <>
      <div className="mt-5 p-4  bg-white rounded shadow border">
        <h2 className="text-lg font-bold mb-2">Recent Transactions</h2>
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.map((tx, i) => (
              <tr
                key={tx._id}
                className={i % 2 === 0 ? "bg-gray-50 w-fit" : "bg-white w-fit"}
              >
                <td className="p-2">{tx.category}</td>
                <td
                  className={`p-1 ${tx.typeSource === "income" ? "text-green-600" : "text-red-600"}`}
                >
                  {tx.typeSource.charAt(0).toUpperCase() +
                    tx.typeSource.slice(1)}
                </td>
                <td className="p-2">{tx.amount} ₹</td>
                <td className="p-2">
                  {new Date(tx.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Transections;
