import React from "react";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let ProfileVarible = createContext();

function ProfileProvider({ children }) {
  let [profile, setProfile] = useState([]);
  //   Example user object structure:
  useEffect(() => {
    let UserProfile = async () => {
      try {
        let userProfileData = await axios.get(
          "http://localhost:3000/user/profile",
          { withCredentials: true },
        );
        setProfile(userProfileData.data);
      } catch (error) {
        console.log(error);
      }
    };
    UserProfile();
  }, []);

  return (
    <ProfileVarible.Provider value={{ profile }}>
      {children}
    </ProfileVarible.Provider>
  );
}

export default ProfileProvider;
