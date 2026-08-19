import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
// Navigate Routes
import Login from "./Pages/userAuth/Login";
import Signup from "./Pages/userAuth/Signup";
import OtpVerifyPage from "./Pages/userAuth/OtpVerifyPage";
import Deshboard from "./Pages/Deshboard";
import ScrollToTop from "./Components/ScrollToTop"
import Navbar from "./Components/BottomNav/Navbar";

// authentication
import AuthProtected from "./Components/AuthProtected";
import AuthContext from "./Context/auth/AuthContext";
import Setting from "./Pages/Setting";
import ExpenseCreate from "./Pages/ExpenseCreate";
import Expense from "./Context/expense/Expense";
import Search from "./Pages/Search";
import Analitics from "./Pages/Analitics";

function App() {
  return (
    <>
      <AuthContext>
        <Expense>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/verifyotp" element={<OtpVerifyPage />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected Routes */}
              <Route element={<AuthProtected />}>
                <Route path="/" element={<Deshboard />} />
                <Route path="/add" element={<ExpenseCreate />} />
                <Route path="/setting" element={<Setting />} />
                <Route path="/search" element={<Search />} />
                <Route path="/Analitics" element={<Analitics />} />
              </Route>
            </Routes>

          </BrowserRouter>
        </Expense>
      </AuthContext>
    </>
  );
}

export default App;
