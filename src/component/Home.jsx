import React, { useEffect, useState } from "react";

const Home = () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // 🔄 Loading state
  const usersPerPage = 5;

  const fetchAllUsers = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(
        "https://1jmoxuerui.execute-api.ap-south-1.amazonaws.com/default/userData"
      );
      const data = await response.json();
      setUserData(JSON.parse(data.body)); // Store users
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false); // Stop loading after fetch
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

  const nextPage = () => {
    if (currentPage < Math.ceil(userData.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-4">User List</h1>
      <p className="text-center mb-4">
        This is a simple user list with pagination.
        <br />
        You can navigate through the pages using the buttons below.
      </p>

      {/* 🔄 Show loading spinner while fetching data */}
      {loading ? (
        <div className="flex justify-center mt-8">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <div>
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <div key={user.id} className="bg-gray-100 p-4 m-4 rounded-lg">
                <h2 className="text-xl font-bold">Email : {user.email}</h2>
                <p>Password : {user.password}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No users found.</p>
          )}
        </div>
      )}

      {/* Pagination Buttons */}
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={prevPage}
          disabled={loading || currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg font-semibold">Page {currentPage}</span>
        <button
          onClick={nextPage}
          disabled={loading || currentPage >= Math.ceil(userData.length / usersPerPage)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
