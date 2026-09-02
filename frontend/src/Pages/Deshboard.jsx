import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LogOut, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ExpenseVarible } from "../Context/expense/Expense";
import GraphComp from "../Components/DeshboardPage/GraphComp";
import TransectionsHistory from "../Components/DeshboardPage/TransectionsHistory";
import MonthlySummery from "../Components/DeshboardPage/MonthlySummery";
import Navbar from "../Components/BottomNav/Navbar"



function Deshboard() {
  const apiUrl = import.meta.env.VITE_SERVER

  let navigate = useNavigate();
  let { transection, MonthlySum, graphData, userInfo, getDeshboardFunc } =
    useContext(ExpenseVarible);
  const logout = async () => {
    try {
      const logout = await axios.get(`${apiUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      console.log(logout);
      navigate("/login");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  //* dashboard data api calls
  const getDashboard = async () => {
    await getDeshboardFunc();
  };
  useEffect(() => {
    getDashboard();
  }, []);

  return (
    <div className="p-5 lg:mx-auto lg:max-w-6xl xl:max-w-7xl" style={{ paddingBottom: "100px" }}>
      {/* profile and logout btn */}
      <div className="flex items-center justify-between gap-4">
        {/* Left */}
        <div onClick={() => navigate("/setting")} className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-600">
            {userInfo?.name.slice(0, 1).toUpperCase()}
          </div>

          {/* <h1 className="truncate text-xl font-semibold text-gray-900 sm:text-2xl">
            {userInfo}
          </h1> */}
        </div>

        {/* Right */}
        <button
          onClick={logout}
          className="flex shrink-0 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:px-4"
        >
          <LogOut size={17} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
      <br />
      {/* monthly summary */}
      <MonthlySummery MonthlySumArr={MonthlySum} />
      <br />
      {/* graph */}
      <GraphComp graphArr={graphData} />
      <br />
      {/* transections */}
      <TransectionsHistory transectionsArr={transection} />
      <Navbar />
    </div>
  );
}

export default Deshboard;
