import React from "react";

const SearchInput = ({ value, onChange, onSearch, placeholder }) => {
  return (
    <div className="relative mt-1">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-3 py-2 rounded-lg border focus:border-blue-500 focus:ring focus:ring-blue-200"
      />
      <button
        onClick={onSearch}
        className="absolute inset-y-0 right-0 flex items-center px-4 bg-green-500 text-white rounded-r-lg focus:outline-none"
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;
