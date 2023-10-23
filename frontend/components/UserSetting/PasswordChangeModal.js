import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = process.env.BACKEND_URL; // เพิ่มบรรทัดนี้

const PasswordChangeModal = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/users/changePassword`, // ใช้ API_BASE_URL ที่เพิ่มขึ้น
        {
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Password change response:", response.data);
      toast.success("Password changed successfully");
      // You can handle success and display a message to the user
      setCurrentPassword(""); // เคลียร์ค่า currentPassword
      setNewPassword(""); // เคลียร์ค่า newPassword
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Failed to change password. Please try again.");
      // You can handle errors and display appropriate messages to the user
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-md shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Change Password</h2>
        <label className="mb-2">
          Current Password:
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="block w-full border rounded-md p-2"
          />
        </label>
        <label className="mb-2">
          New Password:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="block w-full border rounded-md p-2"
          />
        </label>
        <div className="flex justify-end mt-4">
          <button
            onClick={handlePasswordChange}
            className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Change Password
          </button>
          <button
            onClick={onClose}
            className="ml-2 px-4 py-2 text-sm font-semibold text-gray-600 rounded-md hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PasswordChangeModal;
