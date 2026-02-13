import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <>
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">FinanceApp</div>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-green-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/transactions" className="hover:text-green-400">
              Transactions
            </Link>
          </li>
          <li>
            <Link to="/analytics" className="hover:text-green-400">
              Analytics
            </Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-green-400">
              Profile
            </Link>
          </li>
        </ul>
        <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded">
          Logout
        </button>
      </nav>
    </>
  );
}

export default Navbar;
