// CustomersList.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = process.env.BACKEND_URL_CSR;

const CustomersList = () => {
  const [users, setUsers] = useState([]);
  console.log("🚀 ~ file: usermanage.js:45 ~ UserManagePage ~ users:", users);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/users/getusers`, {
        withCredentials: true,
      })
      .then((response) => {
        const fetchedUsers = response.data;
        console.log(
          "🚀 ~ file: usermanage.js:53 ~ .then ~ fetchedUsers:",
          fetchedUsers
        );
        setUsers(fetchedUsers);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const truncateAddress = (address, maxLength) => {
    if (address.length <= maxLength) {
      return address;
    }
    return `${address.substring(0, maxLength)}...`;
  };

  return (
    <div className="px-4 py-5 sm:p-6">
      <div>
        <p className="text-base font-bold text-gray-900">Customers</p>
        {/* <p className="mt-1 text-sm font-medium text-gray-500">
          Lorem ipsum dolor sit ametis.
        </p> */}
      </div>

      <div className="mt-8 space-y-6">
        {users.slice(0, 5).map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between space-x-5"
          >
            <div className="flex items-center flex-1 min-w-0">
              <img
                className="flex-shrink-0 object-cover w-10 h-10 rounded-full"
                src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/dashboards/1/avatar-male.png"
                alt=""
              />
              <div className="flex-1 min-w-0 ml-4">
                <p className="text-sm font-bold text-gray-900">{user.name}</p>
                <p className="mt-1 text-sm font-medium text-gray-500">
                  {user.email ||
                    user.username ||
                    truncateAddress(user.address, 20)}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {user.balance}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-500 truncate">
                {user.location}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <a
          href="/admin/usermanage"
          title=""
          className="inline-flex items-center text-xs font-semibold tracking-widest text-gray-500 uppercase hover:text-gray-900"
        >
          See all Customers
          <svg
            className="w-4 h-4 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default CustomersList;
