import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Watch for token changes in localStorage
  useEffect(() => {
    const checkToken = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    document.location.reload(); // Reload the page to reflect changes
  };

  return (
    <div className="w-full h-16 bg-gray-800 flex justify-between items-center px-4 py-10 rounded-b-sm text-white">
      <div className="text-2xl font-semibold flex justify-between items-center w-full">
        <div>
          <ul className="flex space-x-8 gap-8 text-center items-center">
            <li className="text-3xl font-bold pr-20 pl-1 text-start">
              UsEr <br /> MAnaGemeNt
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About us</Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className="flex text-center items-center">
            {token ? (
              <li className="flex space-x-8 gap-6 text-center items-center mr-3">
                <button
                  onClick={handleLogout}
                  className="border border-white rounded-3xl py-1.5 px-4 text-lg bg-red-600 hover:bg-red-700"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li className="flex space-x-8 gap-6 text-center items-center mr-3">
                <Link to="/login" className="text-white text-2xl">
                  Login
                </Link>
                <Link to="/signup" className="text-white">
                  <button className="border border-white rounded-2xl py-1.5 px-4 text-xl">
                    Signup
                  </button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
