import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthCreateVarible } from "../Context/auth/AuthContext";

function AuthProtected() {
  const { user, loading } = useContext(AuthCreateVarible);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default AuthProtected;