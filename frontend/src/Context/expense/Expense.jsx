import React, { createContext, useEffect, useState } from "react";
export const ExpenseVarible = createContext();
import axios from "axios";


function Expense({ children }) {
  const apiUrl = import.meta.env.VITE_SERVER

  const [transection, setTransections] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [userInfo, setUserInfo] = useState("");
  const [MonthlySum, setMonthlySummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const getDeshboardFunc = async () => {
    try {
      const res = await axios.get(
        `${apiUrl}/api/user/dashboard`,
        {
          withCredentials: true,
        },
      );
      console.log(res.data);
      const data = res.data?.data;

      if (data) {
        setGraphData(data.graph || []);
        setTransections(data.transectionHistory || []);
        setUserInfo(data.userName || "");
        setMonthlySummary(data.purpleCard || null);
      } else {
        setGraphData([]);
        setTransections([]);
        setUserInfo("");
        setMonthlySummary(null);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    getDeshboardFunc();
  }, []);

  //* add expense

  return (
    <ExpenseVarible.Provider
      value={{ transection, MonthlySum, graphData, userInfo, getDeshboardFunc }}
    >
      {children}
    </ExpenseVarible.Provider>
  );
}

export default Expense;
