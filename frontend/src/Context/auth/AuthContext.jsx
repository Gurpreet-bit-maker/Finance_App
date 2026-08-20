import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthCreateVarible = createContext();

const AuthContext = ({ children }) => {
  const apiUrl = import.meta.env.VITE_SERVER

  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const isUserLogin = async () => {
      try {
        const res = await axios.get(
          `${apiUrl}/api/user/dashboard`,
          {
            withCredentials: true,
          },
        );
        setUser(res.data.data.transectionHistory);
      } catch (error) {
        setUser(null);
        console.log(
          "Auth Error:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };
    isUserLogin();
  }, []);
  
  useEffect(() => {
    console.log(user);
  }, [])

  return (
    <AuthCreateVarible.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthCreateVarible.Provider>
  );
};

export default AuthContext;
