import React from "react";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log("User logged out");
    navigate("/");
  };
  return (
    <div>
      <div>
        <div className="flex justify-end">
          <button
            className="bg-red-600 text-white rounded-xl py-2.5 text-center px-6 text-2xl m-5"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
