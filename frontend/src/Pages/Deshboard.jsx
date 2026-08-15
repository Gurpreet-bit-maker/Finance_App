import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthCreateVarible } from "../Context/auth/AuthContext";
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
      const logout = await axios.get(`http://localhost:8080/api/auth/logout`, {
        withCredentials: true,
      });
      console.log(logout);
      navigate("/login");
    } catch (error) {
      console.log(error.response?.data);
    }
  };
  console.log(MonthlySum);

  //* dashboard data api calls
  const getDashboard = async () => {
    await getDeshboardFunc();
  };
  useEffect(() => {
    getDashboard();
  }, []);

  return (
    <div className="p-5" style={{ paddingBottom: "100px" }}>
      {/* profile and logout btn */}
      <div className="flex items-center justify-between gap-3">
        {/* Left */}
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 truncate">
            Hello {userInfo} <span>👋</span>
          </h1>
        </div>

        {/* Right */}
        <button
          onClick={logout}
          className="flex shrink-0 items-center gap-2 rounded-xl bg-red-500 px-3 py-2 text-sm sm:px-4 sm:text-base text-white transition hover:bg-red-600"
        >
          <LogOut size={18} />
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
