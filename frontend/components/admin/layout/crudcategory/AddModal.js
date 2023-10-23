import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const API_BASE_URL = process.env.BACKEND_URL_CSR;
const ModalForm = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const fetchAllCategories = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/categories?per_page=200`
      );
      const totalPage = response.data.total_page;

      const fetchCategoryPages = [];
      for (let page = 1; page <= totalPage; page++) {
        fetchCategoryPages.push(
          axios.get(`${API_BASE_URL}/api/categories?per_page=200&page=${page}`)
        );
      }

      const pageResponses = await Promise.all(fetchCategoryPages);
      const allCategories = pageResponses.flatMap(
        (response) => response.data.data
      );

      setCategories(allCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async (event) => {
    console.log("🚀 ~ file: ModalForm.js:39 ~ handleSubmit ~ event:", event);
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const productData = {
      // id: parseInt(formData.get("serviceid")),
      name: formData.get("category"),
    };

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to add this new product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            `${API_BASE_URL}/api/categories`,
            productData,
            {
              withCredentials: true,
            }
          );

          // เคลียร์ช่องข้อมูล
          form.reset();

          console.log("Product created:", response.data);
          Swal.fire("Added!", "The product has been added.", "success");
        } catch (error) {
          console.error("Error creating product:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred while adding the product.",
          });
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        <div>
          <label
            for="serviceid"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            ไอดี
          </label>
          <input
            type="number"
            name="serviceid"
            id="serviceid"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            placeholder="15"
            required=""
          />
        </div>
        <div>
          <label
            for="name"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            ชื่อหมวดหมู่
          </label>
          <input
            type="text"
            name="category"
            id="category"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            placeholder="บริการเพิ่มผู้ติดตาม"
            required=""
          />
        </div>
      </div>
      <button className="text-white inline-flex items-center bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
        <svg
          className="mr-1 -ml-1 w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clipRule="evenodd"
          ></path>
        </svg>
        Add new product
      </button>
    </form>
  );
};

export default ModalForm;
