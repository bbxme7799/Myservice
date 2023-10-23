// SaleItem.js
import React from "react";

const SaleItem = ({ title, amount, percentage, positive }) => (
  <div className="bg-white border border-gray-200 rounded-xl">
    <div className="px-5 py-4">
      <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
        {title}
      </p>
      <div className="flex items-center justify-between mt-3">
        <p className="text-xl font-bold text-gray-900">{amount}</p>

        <span
          className={`inline-flex items-center text-sm font-semibold ${
            positive ? "text-green-500" : "text-red-500"
          }`}
        >
          {/* {positive ? "+" : "-"} {percentage}%
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3 ml-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 11l5-5m0 0l5 5m-5-5v12"
            />
          </svg> */}
        </span>
      </div>
    </div>
  </div>
);

export default SaleItem;
