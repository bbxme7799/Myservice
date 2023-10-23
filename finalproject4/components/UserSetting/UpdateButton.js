import React from "react";

const UpdateButton = () => {
  return (
    <div className="mt-6 sm:mt-12">
      <button
        type="submit"
        className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-500"
      >
        Change Password
      </button>
    </div>
  );
};

export default UpdateButton;
