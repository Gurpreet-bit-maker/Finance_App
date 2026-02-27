import React from "react";
import { AuthContextVarible } from "../Context/auth/AuthContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

function AuthProtected() {
  let { user, loading } = useContext(AuthContextVarible);

  if (loading) return; // wait for axios

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default AuthProtected;
