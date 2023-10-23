import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import dynamic from "next/dynamic"; // Import dynamic from 'next/dynamic'

const API_BASE_URL = process.env.BACKEND_URL_CSR;

// Dynamically import ReactQuillEditor only on the client side
const ReactQuillEditor = dynamic(() => import("./ReactQuillEditor"), {
  ssr: false, // Disable Server-Side Rendering
});

const Modal = ({ isOpen, onClose, category, me }) => {
  const [editedProduct, setEditedProduct] = useState(category);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleQuillChange = useCallback((content) => {
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      content: content,
    }));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // const response = await axios.put(
      //   `http://localhost:8000/api/blog/editPost/${editedProduct.id}`, // แก้ไข URL ตามเส้นทางของ API ของคุณ
      //   {
      //     title: editedProduct.title,
      //     content: editorContent, // เพิ่มเนื้อหาที่แก้ไข
      //   }
      // );
      const response = await axios.put(
        `${API_BASE_URL}/api/blog/editPost/${editedProduct.id}`,
        {
          title: editedProduct.title,
          content: editedProduct.content,
          imageUrl: editedProduct.imageUrl,
        },
        {
          withCredentials: true, // แนบ Cookie ไปด้วยคำร้อง
        }
      );
      console.log("Product updated:", response.data);
      Swal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: `แก้ไขข้อมูลสำเร็จ ไอดี ${response.data.id}`,
      });
      onClose();
    } catch (error) {
      console.error("Error updating category:", error);
      console.log("🚀 ~ file: Modal.js:12 ~ Modal ~ me:", me);
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
          `${API_BASE_URL}/api/deletePost/${editedProduct.id}`,
          {
            withCredentials: true,
          }
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
          <h3 className="text-lg font-semibold text-gray-900">Update Blog</h3>
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
                Blog ID
              </label>
              <input
                disabled
                type="number"
                name="id"
                value={editedProduct.id}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
              />
            </div>
            <div>
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Blog title
              </label>
              <input
                type="text"
                name="title"
                value={editedProduct.title}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 "
              />
            </div>
            <div className="w-full col-span-2">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Blog ImageUrl
              </label>
              <input
                type="text"
                name="imageUrl"
                value={editedProduct.imageUrl}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 "
              />
            </div>
            <div className="w-full col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Content
              </label>
              <div className="max-h-[60vh] overflow-y-auto">
                {typeof window !== "undefined" && (
                  <ReactQuillEditor
                    value={editedProduct.content}
                    onChange={handleQuillChange}
                  />
                )}
              </div>
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
