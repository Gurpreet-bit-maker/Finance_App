import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { ProfileVarible } from "../Context/ProfileContext";
import { useContext } from "react";
function UserProfile() {
  let { profile } = useContext(ProfileVarible);
  console.log(profile);
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <div className="w-full max-w-3xl">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
              {profile.name?.charAt(0)}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Hello, {profile.name}
              </h2>
              <p className="text-gray-500">{profile.email}</p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.phone && (
              <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
                <h3 className="text-sm text-gray-500">Phone</h3>
                <p className="text-lg font-semibold text-gray-800">
                  {profile.phone}
                </p>
              </div>
            )}

            {profile.accountType && (
              <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
                <h3 className="text-sm text-gray-500">Account Type</h3>
                <p className="text-lg font-semibold text-gray-800">
                  {profile.accountType}
                </p>
              </div>
            )}

            {profile.currency && (
              <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
                <h3 className="text-sm text-gray-500">Currency</h3>
                <p className="text-lg font-semibold text-gray-800">
                  {profile.currency}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
