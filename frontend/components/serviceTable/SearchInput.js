import React, { useState } from "react";

const SearchInput = ({ value, onSearch }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(inputValue);
  };

  console.log("🚀 ~ file: SearchInput.js:4 ~ SearchInput ~ value:", value);
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
      <div className="relative mt-1 flex">
        <button
          onClick={handleSearchClick}
          className="px-3 py-2 text-sm  bg-green-500 text-white rounded-l-lg focus:ring-blue-500 focus:border-blue-500"
        >
          Search
        </button>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search products..."
          className="block p-2 pr-10 text-sm text-gray-900 border border-gray-300 rounded-r-lg w-40 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 flex-grow"
        />
      </div>
    </div>
  );
};

export default SearchInput;
