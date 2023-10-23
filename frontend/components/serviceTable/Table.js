import React, { useState, useEffect, useCallback } from "react";
import ProductModal from "./ProductModal";

const Table = ({ products, currentPage, totalPages, onPageChange }) => {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Add this line
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Filter and set displayedProducts based on the search query
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDisplayedProducts(filteredProducts);
  }, [products, searchQuery]);

  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }, [currentPage, onPageChange]);

  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }, [currentPage, onPageChange, totalPages]);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {/* <SearchInput value={searchQuery} onChange={setSearchQuery} /> */}

        {products.length > 0 ? (
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Services ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Services Name
                </th>
                {/* <th scope="col" className="px-6 py-3">
              Category
            </th> */}
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedProducts.map((product, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {product.service}
                  </th>
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">
                    {(product.rate * 1.5).toFixed(6)} (ต่อ1000)
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="font-medium text-blue-600 hover:underline"
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsModalVisible(true);
                      }}
                    >
                      MORE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
        <nav
          className="flex items-center justify-between pt-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {products.length > 0
                ? (currentPage - 1) * products.length + 1
                : 0}
            </span>{" "}
            -{" "}
            <span className="font-semibold text-gray-900">
              {currentPage === totalPages && products.length < 15
                ? (currentPage - 1) * products.length + products.length
                : currentPage * products.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900">
              {totalPages * products.length}
            </span>
          </span>
          <ul className="inline-flex items-stretch -space-x-px">
            <li>
              <a
                className={`flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
                onClick={goToPreviousPage}
                disabled={currentPage === 1} // Disable the button on first page
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              // Display a limited number of pages around the current page
              if (
                page === currentPage ||
                (page >= currentPage - 2 && page <= currentPage + 2)
              ) {
                return (
                  <li key={page}>
                    <a
                      className={`flex items-center justify-center text-sm py-2 px-3 leading-tight ${
                        page === currentPage
                          ? "z-10 text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700"
                          : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                      }`}
                      onClick={() => onPageChange(page)}
                    >
                      {page}
                    </a>
                  </li>
                );
              }
              // Display ellipses for hidden pages
              if (
                page === 1 ||
                page === totalPages ||
                page === currentPage - 3 ||
                page === currentPage + 3
              ) {
                return (
                  <li key={page}>
                    <span className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500">
                      ...
                    </span>
                  </li>
                );
              }
              return null;
            })}
            <li>
              <a
                className={`flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
                onClick={goToNextPage}
                disabled={currentPage === totalPages} // Disable the button on last page
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      {selectedProduct && (
        <ProductModal
          selectedProduct={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
};

export default Table;
