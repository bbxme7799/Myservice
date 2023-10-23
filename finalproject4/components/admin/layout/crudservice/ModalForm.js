import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const API_BASE_URL = process.env.BACKEND_URL;

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
      id: parseInt(formData.get("serviceid")),
      name: formData.get("name"),
      rate: parseFloat(formData.get("rate")),
      min: parseInt(formData.get("min")),
      max: parseInt(formData.get("max")),
      description: formData.get("description"),
      category: formData.get("category"),
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
            `${API_BASE_URL}/api/products`,
            productData,
            {
              withCredentials: true,
            }
          );

          // Check if the response status is in the 2xx range (indicating success)
          if (response.status >= 200 && response.status < 300) {
            // Successful response
            form.reset();
            Swal.fire("Added!", "The product has been added.", "success");
          } else {
            // Response is not in the 2xx range, indicating an error
            console.error("Error creating product:", response);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Failed to add the product. Server returned an error.",
            });
          }
        } catch (error) {
          // Handle network errors, Axios errors, or other unexpected errors
          // console.error("Error creating product:", error);
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
      <div class="grid gap-4 mb-4 sm:grid-cols-2">
        <div>
          <label
            for="serviceid"
            class="block mb-2 text-sm font-medium text-gray-900 "
          >
            ไอดี
          </label>
          <input
            type="number"
            name="serviceid"
            id="serviceid"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            placeholder="15"
            required=""
          />
        </div>
        <div>
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 "
          >
            ชื่อบริการ
          </label>
          <input
            type="text"
            name="name"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            placeholder="บริการเพิ่มผู้ติดตาม"
            required=""
          />
        </div>
        <div>
          <label
            for="rate"
            class="block mb-2 text-sm font-medium text-gray-900"
          >
            ราคา
          </label>
          <input
            type="text"
            name="rate"
            id="rate"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            placeholder="50"
            required=""
          />
        </div>
        <div>
          <label
            for="min"
            class="block mb-2 text-sm font-medium text-gray-900 "
          >
            ขั้นต่ำ
          </label>
          <input
            type="number"
            name="min"
            id="min"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            placeholder="1"
            required=""
          />
        </div>
        <div>
          <label
            for="max"
            class="block mb-2 text-sm font-medium text-gray-900 "
          >
            สูงสุด
          </label>
          <input
            type="number"
            name="max"
            id="max"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            placeholder="12"
            required=""
          />
        </div>
        <div class="sm:col-span-2">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full h-10 py-2 pl-3 pr-8"
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div class="sm:col-span-2">
          <label
            for="description"
            class="block mb-2 text-sm font-medium text-gray-900 "
          >
            รายละเอียด
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 "
          ></textarea>
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
