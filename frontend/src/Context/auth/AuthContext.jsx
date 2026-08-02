import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthCreateVarible = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isUserLogin = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/user/transections",
        {
          withCredentials: true,
        },
      );

      console.log("this is authContext", res.data);
      setUser(res.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    isUserLogin();
  }, []);

  return (
    <AuthCreateVarible.Provider value={{ user, setUser, loading, isUserLogin }}>
      {children}
    </AuthCreateVarible.Provider>
  );
};

export default AuthContext;
