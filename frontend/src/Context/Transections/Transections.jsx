import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserTransectionsVarible } from "./SummeryContext";
export let UserRecentTran_Varible = createContext();

let Rec_TransectionsProvider = ({ children }) => {
  let [recentTransactions, setRecentTransections] = useState([]);

  let { isToggle } = useContext(UserTransectionsVarible);
  // income data summury

  useEffect(() => {
    let fetchUserTransections = async () => {
      try {
        let userData = await axios.get("http://localhost:3000/transections", {
          withCredentials: true,
        });
        setRecentTransections(userData.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserTransections();
  }, [isToggle]);

  return (
    <UserRecentTran_Varible.Provider value={{ recentTransactions }}>
      {children}
    </UserRecentTran_Varible.Provider>
  );
};

export default Rec_TransectionsProvider;
