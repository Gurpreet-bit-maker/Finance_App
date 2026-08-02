import React from "react";
import Profile from "../Components/SettingPage/Profile";
import { useNavigate } from "react-router-dom";

function Setting() {
  let navigate = useNavigate();

  return (
    <div>
      <Profile />
    </div>
  );
}

export default Setting;
