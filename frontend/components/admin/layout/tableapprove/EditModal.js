import React, { useState } from "react";
import axios from "axios";

const EditModal = ({ user, onUpdateBalance, onClose }) => {
  const [newBalance, setNewBalance] = useState("");

  const handleUpdate = async () => {
    // Validate newBalance
    if (!newBalance || isNaN(parseFloat(newBalance))) {
      // Handle validation error
      return;
    }

    // Call the API to update balance
    try {
      await onUpdateBalance(user.id, parseFloat(newBalance));
      onClose(); // Close the modal on success
    } catch (error) {
      // Handle API error
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Edit Balance for {user.username}
        </h2>
        <input
          type="text"
          placeholder="New Balance"
          className="border rounded p-2 mb-4"
          value={newBalance}
          onChange={(e) => setNewBalance(e.target.value)}
        />
        <div className="flex justify-between">
          <button
            onClick={handleUpdate}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
          >
            Update Balance
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
