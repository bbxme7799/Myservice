import React, { Fragment } from "react";

const TableRow = ({ products }) => {
  console.log(products);

  return (
    <tbody>
      {products.map((product) => (
        <tr
          key={product.service}
          className="bg-white border-b hover:bg-gray-50"
        >
          <td className="w-4 p-2">
            {/* Adjusted padding */}
            <div className="flex items-center">
              <input
                id={`checkbox-table-${product.service}`}
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label
                htmlFor={`checkbox-table-${product.service}`}
                className="sr-only"
              >
                checkbox
              </label>
            </div>
          </td>
          <th
            scope="row"
            className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap text-sm md:px-6 md:py-4"
          >
            {product.service}
          </th>
          <td className="px-2 py-1 text-sm sm:px-2 md:px-6 md:py-4">
            {product.name}
          </td>
          <td className="px-2 py-1 text-sm sm:px-2 md:px-6 md:py-4">
            {product.category}
          </td>
          <td className="px-2 py-1 text-sm sm:px-2 md:px-6 md:py-4">
            {product.rate}
          </td>
          <td className="px-2 py-1 text-sm sm:px-2 md:px-6 md:py-4">
            <a href="#" className="font-medium text-blue-600 hover:underline">
              Edit
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableRow;
