import React from "react";

function UserProfile() {
  //   Example user object structure:
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+91 12345 67890",
    memberSince: "January 2026",
    accountType: "Premium",
    profilePic: "https://via.placeholder.com/100",
    currency: "₹",
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-8">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-8">
        {/* Header */}
        <div className="flex items-center space-x-6 mb-8">
          <img
            src={user.profilePic || "https://via.placeholder.com/100"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover"
          />
        <div>
          <h2 className="text-2xl font-bold">Hello, {user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Profile Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {user.phone && (
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <h3 className="font-semibold text-gray-700">Phone</h3>
            <p className="text-gray-600">{user.phone}</p>
          </div>
        )}
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
          <h3 className="font-semibold text-gray-700">Member Since</h3>
          <p className="text-gray-600">{user.memberSince}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
          <h3 className="font-semibold text-gray-700">Account Type</h3>
          <p className="text-gray-600">{user.accountType}</p>
        </div>
        {user.currency && (
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <h3 className="font-semibold text-gray-700">Currency</h3>
            <p className="text-gray-600">{user.currency}</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default UserProfile;
