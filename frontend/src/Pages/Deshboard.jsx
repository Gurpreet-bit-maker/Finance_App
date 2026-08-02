import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthCreateVarible } from "../Context/auth/AuthContext";
import GraphComp from "../Components/DeshboardPage/GraphComp";
import TransectionsHistory from "../Components/DeshboardPage/TransectionsHistory";
import MonthlySummery from "../Components/DeshboardPage/MonthlySummery";
// import Navbar from "../Components/BottomNav/Navbar";

function Deshboard() {
  let navigate = useNavigate();
  const [transection, setTransections] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [userInfo, setUserInfo] = useState("");
  const [MonthlySum, setMonthlySummary] = useState([]);

  const logout = async () => {
    try {
      const logout = await axios.get("http://localhost:3000/api/auth/logout", {
        withCredentials: true,
      });
      console.log(logout);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // dashboard data api call
  useEffect(() => {
    const getDashboard = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/user/transections",
          { withCredentials: true },
        );
        console.log(res.data.data.graph);
        setGraphData(res.data.data.graph);
        setTransections(res.data.data.transectionHistory);
        setUserInfo(res.data.data.userName);
        setMonthlySummary(res.data.data.purpleCard);
      } catch (error) {
        console.log(error);
      }
    };
    getDashboard();
  }, []);

  // let name = "robin";
  // let capitalName = name
  //   .split(" ")
  //   .map((word) => word[0])
  //   .join("")
  //   .toLocaleUpperCase();

  // console.log(capitalName);

  // let Comp = TransectionsHistory;
  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          Hello {userInfo} <span>👋</span>
        </h1>
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
     <br />
      {/* monthly summary */}
      <MonthlySummery MonthlySumArr={MonthlySum} />
      {/* graph */}
      <br />
      <GraphComp graphArr={graphData} />
      <br />
      <TransectionsHistory transectionsArr={transection} />
      {/* navbar */}
      {/* <Navbar /> */}
    </div>
  );
}

export default Deshboard;
