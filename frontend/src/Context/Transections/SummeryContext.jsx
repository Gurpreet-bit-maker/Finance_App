import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export let UserTransectionsVarible = createContext();

let TransectionsProvider = ({ children }) => {
  let [income, setIncome] = useState([]);
  let [expense, setExpense] = useState([]);
  let [isToggle, setToggle] = useState(false);
  // income data summury
  useEffect(() => {
    let fetchUserTransections = async () => {
      try {
        let userData = await axios.get(
          "http://localhost:3000/transectionsQuery?typeSource=income",
          { withCredentials: true },
        );
        setIncome(userData.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserTransections();
  }, [isToggle]);
  //  expense data summury
  useEffect(() => {
    let fetchUserTransections = async () => {
      try {
        let userData = await axios.get(
          "http://localhost:3000/transectionsQuery?typeSource=expense",
          { withCredentials: true },
        );
        setExpense(userData.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserTransections();
  }, [isToggle]);

  return (
    <UserTransectionsVarible.Provider
      value={{ income, expense, isToggle, setToggle }}
    >
      {children}
    </UserTransectionsVarible.Provider>
  );
};

export default TransectionsProvider;
