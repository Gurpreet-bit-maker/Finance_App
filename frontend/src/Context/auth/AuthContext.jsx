import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthCreateVarible = createContext();

const AuthContext = ({ children }) => {
  const apiUrl = import.meta.env.VITE_SERVER

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isUserLogin = async () => {
    try {
      const res = await axios.get(
        `${apiUrl}/api/user/transections`,
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
