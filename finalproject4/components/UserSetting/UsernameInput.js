import React from "react";

const UsernameInput = ({ formData, handleInputChange }) => {
  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
      <div className="sm:mt-px sm:pt-2">
        <label htmlFor="" className="block text-sm font-bold text-gray-900">
          Username
        </label>
        <p className="mt-1 text-sm font-medium text-gray-500">
          You can change it later
        </p>
      </div>
      <div className="mt-2 sm:mt-0 sm:col-span-2">
        <div className="relative flex">
          <input
            type="text"
            name="newUsername"
            placeholder=""
            value={formData.newUsername}
            onChange={handleInputChange}
            className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
          />
        </div>
      </div>
    </div>
  );
};

export default UsernameInput;
