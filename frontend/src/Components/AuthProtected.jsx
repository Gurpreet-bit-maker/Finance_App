import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthCreateVarible } from "../Context/auth/AuthContext";

function AuthProtected() {
  const { user, loading } = useContext(AuthCreateVarible);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }
  // console.log(user);
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default AuthProtected;
