import React from "react";

const TableHeader = () => {
  return (
    <thead className="text-xs text-gray-700 uppercase pb-2 md:pb-0">
      <tr>
        <th scope="col" className="p-4">
          <div className="flex items-center">
            <input
              id="checkbox-all-search"
              type="checkbox"
              className="w-4 h-4 text-blue-600  border-gray-300 rounded focus:ring-blue-500  focus:ring-2 "
            />
            <label htmlFor="checkbox-all-search" className="sr-only">
              checkbox
            </label>
          </div>
        </th>
        <th scope="col" className="px-2 py-1 md:px-6 md:py-3">
          Service
        </th>
        <th scope="col" className="px-2 py-1 md:px-6 md:py-3">
          Product name
        </th>
        <th scope="col" className="px-2 py-1 md:px-6 md:py-3">
          Category
        </th>
        <th scope="col" className="px-2 py-1 md:px-6 md:py-3">
          Rate
        </th>
        <th scope="col" className="px-2 py-1 md:px-6 md:py-3">
          Action
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
