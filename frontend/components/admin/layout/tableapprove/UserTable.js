import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import EditModal from "./EditModal";
import StatusBadge from "./StatusBadge";

const API_BASE_URL = process.env.BACKEND_URL;

const ApproveTable = ({ users }) => {
  const handleRejectWithdraw = async (withdrawId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/transactoins/request-withdraw/${withdrawId}/reject`,
        null,
        {
          withCredentials: true,
        }
      );
      if (response.data.message === "success") {
        Swal.fire(
          "Success",
          "Withdrawal request rejected successfully",
          "success"
        );
      } else {
        Swal.fire("Error", "Failed to reject withdrawal request", "error");
      }
    } catch (error) {
      console.error("Error rejecting withdrawal request:", error);
      Swal.fire("Error", "Failed to reject withdrawal request", "error");
    }
  };

  console.log("🚀 ~ file: UserTable.js:7 ~ ApproveTable ~ users:", users);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showWalletPublicKey, setShowWalletPublicKey] = useState(false);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredUsers = users.filter((user) =>
    user.wallet_public_key?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const closeModal = () => {
    setSelectedUser(null);
  };

  const formatThaiDateTime = (utcDateTime) => {
    const optionsDate = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Bangkok", // กำหนดให้แสดงเวลาในเขตเวลาท้องถิ่น
    };

    const optionsTime = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Bangkok", // กำหนดให้แสดงเวลาในเขตเวลาท้องถิ่น
    };

    const utcDate = new Date(utcDateTime);
    const thaiDate = utcDate.toLocaleDateString("th-TH", optionsDate);
    const thaiTime = utcDate.toLocaleTimeString("th-TH", optionsTime);

    return `${thaiDate} ${thaiTime}`;
  };

  const handleApproveWithdraw = async (withdrawId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/transactoins/request-withdraw/${withdrawId}/approve`,
        null,
        {
          withCredentials: true,
        }
      );
      if (response.data.message === "success") {
        Swal.fire(
          "Success",
          "Withdrawal request approved successfully",
          "success"
        );
      } else {
        Swal.fire("Error", "Failed to approve withdrawal request", "error");
      }
    } catch (error) {
      console.error("Error approving withdrawal request:", error);
      Swal.fire("Error", "Failed to approve withdrawal request", "error");
    }
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
              Wallet Address
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              Amount
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              status
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              createdAt
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 border-t border-gray-100">
          {currentUsers.map((user, index) => (
            <tr key={index} class="hover:bg-gray-50">
              <td class="px-6 py-4">{user.id}</td>
              <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                <div class="text-sm">
                  <div class="font-medium text-gray-700">
                    <p
                      className="my-3 cursor-pointer"
                      onClick={() =>
                        setShowWalletPublicKey(!showWalletPublicKey)
                      }
                    >
                      {showWalletPublicKey
                        ? user.wallet_public_key // แสดงทั้งหมดเมื่อคลิก
                        : user.wallet_public_key.slice(-20)}{" "}
                      {/* แสดงเพียง 20 ตัวอักษรเมื่อไม่คลิก */}
                    </p>
                  </div>
                </div>
              </th>

              <td class="px-6 py-4">
                <div class="flex gap-2">
                  <span class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                    {user.amount || "NULL"}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex gap-2 truncate">
                  {" "}
                  <StatusBadge status={user.status} />
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex gap-2 truncate">
                  {formatThaiDateTime(user.createdAt) || "NULL"}
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex justify-end gap-4">
                  <button
                    class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded shadow"
                    onClick={() => handleApproveWithdraw(user.id)} // เรียกใช้งานฟังก์ชัน handleApproveWithdraw
                  >
                    Approve
                  </button>

                  <button
                    class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow"
                    onClick={() => handleRejectWithdraw(user.id)}
                  >
                    REJECT
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

export default ApproveTable;
