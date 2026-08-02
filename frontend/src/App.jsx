import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
// Navigate Routes
import Login from "./Pages/userAuth/Login";
import Signup from "./Pages/userAuth/Signup";
import OtpVerifyPage from "./Pages/userAuth/OtpVerifyPage";
import Deshboard from "./Pages/Deshboard";
import Navbar from "./Components/BottomNav/Navbar";

// authentication
import AuthProtected from "./Components/AuthProtected";
import AuthContext from "./Context/auth/AuthContext";
import Setting from "./Pages/Setting";
import ExpenseCreate from "./Pages/ExpenseCreate";

function App() {
  return (
    <>
      <AuthContext>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/verifyotp" element={<OtpVerifyPage />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route element={<AuthProtected />}>
              <Route path="/" element={<Deshboard />} />
              <Route path="/add" element={<ExpenseCreate />} />
              <Route path="/setting" element={<Setting />} />
            </Route>
          </Routes>
          <Navbar />
        </BrowserRouter>
      </AuthContext>
    </>
  );
}

export default App;
