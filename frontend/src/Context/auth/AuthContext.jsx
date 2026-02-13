import axios from "axios";
import React, { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
export let AuthContextVarible = createContext();

let AuthContext = ({ children }) => {
  let [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isUserLogin = async () => {
      try {
        let isLogin = await axios.get("http://localhost:3000/", {
          withCredentials: true,
        });
        setUser(isLogin.data);
      } catch (error) {
        setUser(null);
        console.log(error.response);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };
    isUserLogin();
  }, []);

  return (
    <AuthContextVarible.Provider value={{ user, loading }}>
      {children}
    </AuthContextVarible.Provider>
  );
};

export default AuthContext;
