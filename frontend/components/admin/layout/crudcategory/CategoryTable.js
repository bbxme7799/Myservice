import React, { Fragment, useState, useEffect } from "react";
import CategoryList from "./CategoryList";
import ModalOverlay from "./ModalOverlay";
import axios from "axios";
import SearchInput from "./SearchInput";

const API_BASE_URL = process.env.BACKEND_URL_CSR;

const CategoryTable = () => {
  const [perPage, setPerPage] = useState(10); // กำหนดค่าเริ่มต้นให้เป็น 10
  const perPageOptions = [10, 20, 30];
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState([]);
  const [totalPage, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingSearchQuery, setPendingSearchQuery] = useState("");
  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(startItem + perPage - 1, totalPage?.total);
  useEffect(() => {
    async function fetchCategories() {
      try {
        let apiUrl = `${API_BASE_URL}/api/categories?per_page=${perPage}&page=${currentPage}`;

        if (searchQuery) {
          apiUrl += `&keyword=${searchQuery}`;
        }

        const response = await axios.get(apiUrl);
        setCategory(response.data.data);
        setTotalPages(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, [currentPage, searchQuery, perPage]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchInputChange = (value) => {
    // Update the pending search query as the user types
    setPendingSearchQuery(value);
  };

  const handleSearchButtonClick = () => {
    // Update the actual search query and perform the search immediately
    setSearchQuery(pendingSearchQuery);
    setCurrentPage(1);
    setPendingSearchQuery(""); // เพิ่มบรรทัดนี้เพื่อรีเซ็ตคำค้นใน input
  };

  return (
    <Fragment>
      <section className="bg-gray-50 p-10 sm:p-20 antialiased mx-auto">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-white shadow-md sm:rounded-lg">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 p-6">
              <div className="w-full md:w-1/2 mx-auto">
                <div className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only"></label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 "
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <SearchInput
                      value={pendingSearchQuery}
                      onChange={handleSearchInputChange}
                      placeholder="Search"
                      onSearch={handleSearchButtonClick} // เพิ่ม onSearch prop
                    />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="flex items-center justify-center bg-blue-700 text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
                >
                  Add Category
                </button>
                {showModal && (
                  <ModalOverlay closeModal={() => setShowModal(false)}>
                    {/* ... เนื้อหา Modal Content ... */}
                  </ModalOverlay>
                )}

                <div className="relative">
                  <label htmlFor="perPage" className="sr-only">
                    Per Page
                  </label>
                  <select
                    id="perPage"
                    name="perPage"
                    value={perPage}
                    onChange={(e) => setPerPage(Number(e.target.value))}
                    className="bg-white border border-gray-300 rounded-lg p-1 text-gray-900 text-sm focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300"
                  >
                    {perPageOptions.map((option) => (
                      <option key={option} value={option}>
                        {`${option}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-3 w-full md:w-auto">
                  <div
                    id="actionsDropdown"
                    className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow"
                  >
                    <ul
                      className="py-1 text-sm text-gray-700 "
                      aria-labelledby="actionsDropdownButton"
                    >
                      <li>
                        <a
                          href="#"
                          className="block py-2 px-4 hover:bg-gray-100 "
                        >
                          Mass Edit
                        </a>
                      </li>
                    </ul>
                    <div className="py-1">
                      <a
                        href="#"
                        className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 "
                      >
                        Delete all
                      </a>
                    </div>
                  </div>
                  <div
                    id="filterDropdown"
                    className="z-10 hidden w-56 p-3 bg-white rounded-lg shadow "
                  ></div>
                </div>
              </div>
            </div>
            <CategoryList categorys={category} />
            <nav
              className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-500">
                Showing
                <span className="font-semibold text-gray-900">
                  {startItem}-{endItem}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900">
                  {totalPage?.total}
                </span>
              </span>
              <ul className="inline-flex items-stretch -space-x-px">
                <li>
                  <a
                    className={`flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
                    onClick={() => handlePageChange(currentPage - 1)}
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
                {Array.from({ length: totalPage?.total_page }, (_, index) => {
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
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </a>
                      </li>
                    );
                  }
                  // Display ellipses for hidden pages
                  if (
                    page === 1 ||
                    page === totalPage.total_page ||
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
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPage?.total_page} // Disable the button on last page
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
        </div>
      </section>
      {/* <ProductModal /> */}
    </Fragment>
  );
};

export default CategoryTable;
