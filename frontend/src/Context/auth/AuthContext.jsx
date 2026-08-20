import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthCreateVarible = createContext();

const AuthContext = ({ children }) => {
  const apiUrl = import.meta.env.VITE_SERVER;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await axios.get(
        `${apiUrl}/api/user/dashboard`,
        {
          withCredentials: true,
        }
      );

      console.log("AUTH SUCCESS:", res.data);

      // Sirf authentication ke liye user object rakho
      setUser(res.data.data);
    } catch (error) {
      console.log(
        "Auth Error:",
        error.response?.data || error.message
      );

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthCreateVarible.Provider
      value={{
        user,
        setUser,
        loading,
        checkAuth,
      }}
    >
      {children}
    </AuthCreateVarible.Provider>
  );
};

export default AuthContext;