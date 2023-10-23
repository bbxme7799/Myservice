import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const API_BASE_URL = process.env.BACKEND_URL;

const Modal = ({ isOpen, onClose, product }) => {
  const [editedProduct, setEditedProduct] = useState(product);
  // console.log("🚀 ~ file: Modal.js:6 ~ Modal ~ editedProduct:", editedProduct);
  const [categories, setCategories] = useState([]); // Store fetched categories

  useEffect(() => {
    // Fetch categories from the API
    axios
      .get(`${API_BASE_URL}/api/categories`)
      .then((response) => {
        const fetchedCategories = response.data.data;
        setCategories(fetchedCategories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  if (!isOpen) {
    return null;
  }
  const handleInputChange = (event) => {
    // Preview;
    const { name, value } = event.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/products/${editedProduct.service}`,
        editedProduct,
        {
          withCredentials: true,
        }
      );

      console.log("Product updated:", response.data);
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.error.message;
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage,
        });
      }
    }
  };

  const handleDelete = async (event) => {
    console.log("🚀 ~ file: Modal.js:60 ~ handleDelete ~ event:", event);
    event.preventDefault();

    try {
      const result = await Swal.fire({
        title: "คุณต้องการลบผลิตภัณฑ์นี้?",
        text: "หากลบแล้วจะไม่สามารถกู้คืนได้",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ลบเลย!",
        cancelButtonText: "ยกเลิก",
      });

      if (result.isConfirmed) {
        const response = await axios.delete(
          `${API_BASE_URL}/api/products/${editedProduct.service}`
        );

        console.log("Product deleted:", response.data);
        Swal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: `ลบสำเร็จแล้ว ไอดี ${response.data.service}`,
        });
        onClose();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.error.message;
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: errorMessage,
        });
      }
    }
  };

  return (
    <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
      <div className="relative p-4 bg-white rounded-lg shadow ">
        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 ">
          <h3 className="text-lg font-semibold text-gray-900">
            Update Service
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Service ID
              </label>
              <input
                disabled
                type="text"
                name="service"
                value={editedProduct.service}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
              />
            </div>
            <div>
              <label
                for="brand"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Service Name
              </label>
              <input
                type="text"
                name="name"
                value={editedProduct.name}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 "
              />
            </div>
            <div>
              <label
                for="price"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Rate
              </label>
              <input
                type="number"
                value={editedProduct.rate}
                onChange={handleInputChange}
                name="rate"
                id="rate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="$299"
              />
            </div>
            <div>
              <label
                for="price"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Min
              </label>
              <input
                type="number"
                value={editedProduct.min}
                onChange={handleInputChange}
                name="min"
                id="min"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="$299"
              />
            </div>
            <div>
              <label
                for="price"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Max
              </label>
              <input
                type="number"
                value={editedProduct.max}
                onChange={handleInputChange}
                name="max"
                id="max"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="$299"
              />
            </div>
            <div>
              <label
                for="category"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Category
              </label>
              <select
                id="category"
                name="category" // ใช้ชื่อฟิลด์ category
                value={editedProduct.category}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                <option selected="">{editedProduct.category}</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label
                for="description"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Description
              </label>
              <textarea
                name="description"
                value={editedProduct.description}
                onChange={handleInputChange}
                rows={15}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 "
                placeholder="Write a description..."
              ></textarea>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              className="text-green-600 inline-flex items-center hover:text-white border border-green-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Update
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              <svg
                className="mr-1 -ml-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
