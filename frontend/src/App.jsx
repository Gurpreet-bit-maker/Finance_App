import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "flowbite";

import { BrowserRouter, Routes, Route } from "react-router-dom";
// Navigate Routes
import Login from "./Components/userAuth/Login";
import Signup from "./Components/userAuth/Signup";
import Homepage from "./Components/DeshboardPage/Homepage";
import UserProfile from "./Pages/UserProfile";
import RecentTransections from "./Pages/RecentTransections";
// authentication
import AuthProtected from "./Components/AuthProtected";
import AuthContext from "./Context/auth/AuthContext";
// Context Providerj
import TransectionsProvider from "../src/Context/Transections/SummeryContext";
import Rec_TransectionsProvider from "../src/Context/Transections/Transections";
import ProfileProvider from "./Context/ProfileContext";
function App() {
  return (
    <>
      <AuthContext>
        <ProfileProvider>
          <TransectionsProvider>
            <Rec_TransectionsProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  {/* Protected Routes */}

                  <Route element={<AuthProtected />}>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route
                      path="/recentTrans"
                      element={<RecentTransections />}
                    />
                  </Route>
                </Routes>
              </BrowserRouter>
            </Rec_TransectionsProvider>
          </TransectionsProvider>
        </ProfileProvider>
      </AuthContext>
    </>
  );
}

export default App;
