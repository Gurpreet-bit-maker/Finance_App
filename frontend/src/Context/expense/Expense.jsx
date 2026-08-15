import React, { createContext, useEffect, useState } from "react";
export const ExpenseVarible = createContext();
import axios from "axios";


function Expense({ children }) {
  const apiUrl = import.meta.env.VITE_SERVER

  const [transection, setTransections] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [userInfo, setUserInfo] = useState("");
  const [MonthlySum, setMonthlySummary] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDeshboardFunc = async () => {
    try {
      const res = await axios.get(
        `${apiUrl}/api/user/transections`,
        {
          withCredentials: true,
        },
      );
      console.log(res.data);

      setGraphData(res.data.data.graph);
      setTransections(res.data.data.transectionHistory);
      setUserInfo(res.data.data.userName);
      setMonthlySummary(res.data.data.purpleCard);
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
