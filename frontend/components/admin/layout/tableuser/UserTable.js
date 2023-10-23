import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import EditModal from "./EditModal";

const API_BASE_URL = process.env.BACKEND_URL;

const UserTable = ({ users }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [userList, setUserList] = useState(users);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    setUserList(users);
  }, [users]);

  const handleEditBalance = (user) => {
    setSelectedUser(user);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredUsers = userList.filter((user) =>
    user.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const banUser = async (userId) => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/users/banuser`,
        { userId, action: "ban" },
        { withCredentials: true }
      );

      const updatedUserList = userList.map((user) =>
        user.id === userId ? { ...user, is_banned: true } : user
      );
      setUserList(updatedUserList);

      Swal.fire("Banned!", "User has been banned.", "success");
    } catch (error) {
      console.error("Error banning user:", error);
    }
  };

  const unbanUser = async (userId) => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/users/unbanuser`,
        { userId, action: "unban" },
        { withCredentials: true }
      );

      const updatedUserList = userList.map((user) =>
        user.id === userId ? { ...user, is_banned: false } : user
      );
      setUserList(updatedUserList);

      Swal.fire("Unbanned!", "User has been unbanned.", "success");
    } catch (error) {
      console.error("Error unbanning user:", error);
    }
  };

  const updateBalance = async (userId, newBalance) => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/users/editbalance`,
        { userId, newBalance },
        { withCredentials: true }
      );

      const updatedUserList = userList.map((user) =>
        user.id === userId ? { ...user, balance: newBalance } : user
      );
      setUserList(updatedUserList);

      setSelectedUser(null);

      Swal.fire(
        "Balance Updated",
        "User's balance has been updated.",
        "success"
      );
    } catch (error) {
      console.error("Error updating balance:", error);
    }
  };

  const closeModal = () => {
    setSelectedUser(null);
  };
  return (
    <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <div className="flex justify-between items-center p-5">
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="border rounded px-2 py-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="text-gray-500">
          Showing {Math.min(indexOfLastItem, filteredUsers.length)} of{" "}
          {filteredUsers.length} entries
        </div>
      </div>
      <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              id
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              Name
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              State
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              Role
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              Wallet Address
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              Balance
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 border-t border-gray-100">
          {currentUsers.map((user, index) => (
            <tr key={index} class="hover:bg-gray-50">
              <td class="px-6 py-4">{user.id}</td>
              <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                <div class="relative h-10 w-10">
                  <img
                    class="h-full w-full rounded-full object-cover object-center"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <span class="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                </div>
                <div class="text-sm">
                  <div class="font-medium text-gray-700">
                    {user.username || "NULL"}
                  </div>
                  <div class="text-gray-400">{user.email || "NULL"}</div>
                </div>
              </th>
              <td class="px-6 py-4">
                {user.is_banned ? (
                  <span class="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                    <span class="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                    Banned
                  </span>
                ) : (
                  <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                    <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                    Active
                  </span>
                )}
              </td>
              <td class="px-6 py-4">
                <div class="flex gap-2">
                  <span class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                    {user.role === 0 ? "User" : user.role || "NULL"}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex gap-2 truncate">{user.address || "NULL"}</div>
              </td>
              <td class="px-6 py-4">
                <div class="flex gap-2 truncate">{user.balance || "NULL"}</div>
              </td>
              <td class="px-6 py-4">
                <div class="flex justify-end gap-4">
                  <button
                    class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow"
                    onClick={() => banUser(user.id)} // ใช้ฟังก์ชัน confirmBanUser ที่เราสร้างไว้
                  >
                    Ban
                  </button>

                  <button
                    class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded shadow"
                    onClick={() => unbanUser(user.id)} // ใช้ฟังก์ชัน confirmUnbanUser ที่เราสร้างไว้
                  >
                    Unban
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow"
                    onClick={() => handleEditBalance(user)}
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center p-5">
        <div className="text-gray-500">
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, filteredUsers.length)} of{" "}
          {filteredUsers.length} entries
        </div>
        <div className="ml-5">
          <button
            className="px-3 py-1 border rounded"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <button
            className="ml-2 px-3 py-1 border rounded"
            disabled={indexOfLastItem >= filteredUsers.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {selectedUser && (
        <EditModal
          user={selectedUser}
          onUpdateBalance={updateBalance}
          onClose={closeModal} // Pass the onClose function here
        />
      )}
    </div>
  );
};

export default UserTable;
