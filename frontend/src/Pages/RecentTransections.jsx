import React from "react";
import { UserRecentTran_Varible } from "../Context/Transections/Transections";
import { useContext } from "react";
import useDeleteTrans from "../Hooks/crudHooks/DeleteTrans";
import useLoading from "../Hooks/loader/Loading";
import axios from "axios";
import { UserTransectionsVarible } from "../Context/Transections/SummeryContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
function RecentTransections() {
  let { setToggle } = useContext(UserTransectionsVarible);
  let { recentTransactions } = useContext(UserRecentTran_Varible);
  let { setdel_id } = useDeleteTrans();
  let { loader, setLoader } = useLoading();

  setTimeout(() => {
    setLoader(true);
  }, 1000);

  let handleDelete = (e) => {
    setdel_id(e);
  };
  let deleteAllBtn = async () => {
    try {
      await axios.get("http://localhost:3000/transections/del?type=del", {
        withCredentials: true,
      });
      setTimeout(() => {
        setToggle((prev) => !prev);
        setLoader((prev) => !prev);
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(recentTransactions);

  return (
    <>
      <button
        onClick={deleteAllBtn}
        className="bg-red-500 hover:bg-red-600 text-white m-2 p-2 rounded-lg transition duration-200"
      >
        🗑️ Delete All
      </button>
      {!loader ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {recentTransactions.length > 0 ? (
            <div className="w-full px-6 mt-6">
              <h2 className="text-2xl font-semibold mb-4">
                Recent Transactions
              </h2>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={recentTransactions}>
                  <XAxis dataKey="typeSource" />
                  <YAxis  />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>

              <div className="overflow-x-auto bg-white shadow-md rounded-xl">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3">Category</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Date</th>
                      <th className="p-3 text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentTransactions.map((t) => (
                      <tr key={t._id} className="border-t hover:bg-gray-50">
                        <td className="p-2">{t.category}</td>

                        <td className="p-2">
                          <span
                            className={`px-2 py-1 rounded text-white text-sm ${
                              t.typeSource === "income"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          >
                            {t.typeSource}
                          </span>
                        </td>

                        <td
                          className={`p-3 font-semibold ${
                            t.typeSource === "income"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          ₹ {t.amount}
                        </td>

                        <td className="p-2">
                          {new Date(t.date).toLocaleDateString().slice(0, 4)}
                        </td>

                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleDelete(t._id, t)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="w-full px-6 mt-6">
              <h2 className="text-2xl font-semibold mb-4">
                Recent Transactions
              </h2>

              <div className="overflow-x-auto bg-white shadow-md rounded-xl">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3">Category</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Date</th>
                      <th className="p-3 text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentTransactions.map((t) => (
                      <tr key={t._id} className="border-t hover:bg-gray-50">
                        <td className="p-2">{t.category}</td>

                        <td className="p-2">
                          <span
                            className={`px-2 py-1 rounded text-white text-sm ${
                              t.typeSource === "income"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          >
                            {t.typeSource}
                          </span>
                        </td>

                        <td
                          className={`p-3 font-semibold ${
                            t.typeSource === "income"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          ₹ {t.amount}
                        </td>

                        <td className="p-2">
                          {new Date(t.date).toLocaleDateString().slice(0, 4)}
                        </td>

                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleDelete(t._id, t)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default RecentTransections;
