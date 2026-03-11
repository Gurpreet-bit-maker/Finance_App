import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  let navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = async () => {
    setAnchorEl(null);
    console.log("outer touch");
  };

  let [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // logout function
  let logOutFunc = async () => {
    try {
      await axios.get("http://localhost:3000/user/logout", {
        withCredentials: true,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {screenSize <= 768 ? (
        <>
          <nav className="bg-gray-800 text-white p-4 flex justify-between items-center w-full">
            <div className="text-2xl font-bold">FinanceApp</div>
            <Button
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{
                color: "yellowgreen",
                fontSize: "15px",
                border: "1px solid",
              }}
            >
              Dashboard
            </Button>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={handleClose}>
                <span onClick={() => navigate("/")}>Deshboard</span>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <span onClick={() => navigate("/recentTrans")}>
                  Transactions
                </span>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <span onClick={() => navigate("/analytics")}>Analytics</span>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <span onClick={() => navigate("/profile")}>Profile</span>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <span onClick={logOutFunc}>Logout</span>
              </MenuItem>
            </Menu>
          </nav>
        </>
      ) : (
        <nav className="md:bg-gray-800 md:text-white md:p-4 md:flex md:justify-between md:items-center md:w-full md:border">
          <div className="text-2xl font-bold">Finance App</div>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-green-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/recentTrans" className="hover:text-green-400">
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
          <button
            onClick={logOutFunc}
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
          >
            Logout
          </button>
        </nav>
      )}
    </>
  );
}

export default Navbar;
