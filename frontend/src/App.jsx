import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/userAuth/Login";
import Signup from "./Components/userAuth/Signup";
import Homepage from "./Components/homePage/Homepage";
import AuthProtected from "./Components/AuthProtected";
import AuthContext from "./Context/auth/AuthContext";
import UserProfile from "./Pages/UserProfile";

function App() {
  return (
    <>
      <AuthContext>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* Protected Routes */}
            <Route element={<AuthProtected />}>
              <Route path="/" element={<Homepage />} />
              <Route path="/profile" element={<UserProfile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContext>
    </>
  );
}

export default App;
