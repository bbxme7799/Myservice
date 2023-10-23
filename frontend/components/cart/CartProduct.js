import React, { useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const API_BASE_URL = process.env.BACKEND_URL_CSR;

const CartProduct = ({ product, onDelete, onChange }) => {
  const [editedUrl, setEditedUrl] = useState(product.url);
  const [quantity, setQuantity] = useState(product.quantity);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const editedUrlRef = useRef(editedUrl);
  const quantityRef = useRef(quantity);

  const handleInputChange = (field, value) => {
    field === "url" ? setEditedUrl(value) : setQuantity(value);
    setIsEditing(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/api/carts/${product.id}`, {
        withCredentials: true,
      });
      setIsDeleted(true);
      onDelete(product);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async () => {
    if (
      quantity !== quantityRef.current ||
      editedUrl !== editedUrlRef.current
    ) {
      if (quantity % product.product.step !== 0) {
        const errorMessage = `กรุณากรอกจำนวนที่มีค่าในขั้นตอน ${product.product.step}`;
        alert(errorMessage);
        return;
      }
      try {
        await axios.put(
          `${API_BASE_URL}/api/carts/${product.id}`,
          {
            quantity: parseInt(quantity),
            url: editedUrl,
          },
          {
            withCredentials: true,
          }
        );
        const changedProduct = {
          ...product,
          quantity: parseInt(quantity),
          url: editedUrl,
        };
        onChange(changedProduct);
        setIsEditing(false);
        editedUrlRef.current = editedUrl;
        quantityRef.current = quantity;
      } catch (error) {
        console.error(error);
      }
    } else {
      setIsEditing(false);
    }
  };

  const findImageForProductName = (productName) => {
    const processedProductName = productName.toLowerCase().replace(/\s+/g, "");
    const availableImageNames = [
      "youtube", // รายชื่อไฟล์รูปภาพที่คุณมีในโฟลเดอร์ /public/images/
      "twitter",
      "เพิ่มทราฟฟิค",
      "instagram",
      "facebook",
      "twitter",
      "tiktok",
      // เพิ่มรายชื่อไฟล์รูปภาพที่คุณมีต่อท้าย
    ];

    const closestImageName = availableImageNames.find((imageName) =>
      processedProductName.includes(imageName)
    );

    if (closestImageName) {
      return `/images/${closestImageName}.png`;
    } else {
      return "/images/not-found.png";
    }
  };

  const productImage = findImageForProductName(product.product.name);
  // console.log("Product Image URL:", productImage);

  return (
    <li className={`flex py-5 ${isDeleted ? "hidden" : ""}`}>
      <div className="flex-shrink-0">
        <img
          className="object-cover w-8 h-8 rounded-lg"
          src={productImage}
          alt=""
        />
      </div>
      <div className="relative flex flex-col justify-between flex-1 ml-3">
        <div className="sm:grid sm:grid-cols-2 sm:gap-x-3">
          <div className="pr-5 sm:pr-3">
            <p className="text-base font-bold text-gray-900 truncate">
              {product.product.name}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-500 truncate">
              {/* {product.product.description} */}
            </p>
            <input
              type="text"
              className="mt-1 text-sm text-blue-500 border rounded-md px-2 py-1 w-full overflow-x-auto"
              value={editedUrl}
              // onChange={handleUrlChange}
              onBlur={handleEdit} // เมื่อมีการเปลี่ยน focus ให้เรียก handleEdit
            />
          </div>

          <div className="flex items-end justify-between mt-2 sm:items-start sm:mt-1">
            <p className="flex-shrink-0 w-16 text-base font-bold text-left text-gray-900 sm:text-right sm:ml-4 sm:order-2">
              {(((product.product.rate * 1.5) / 1000) * quantity).toFixed(2)}{" "}
            </p>

            <div className="sm:order-1">
              <div className="flex">
                <input
                  type="number"
                  className={`w-16 px-2 py-1 text-sm text-gray-900 bg-white ${
                    quantity % product.product.step !== 0
                      ? "ring-1 ring-red-500 border-red-500"
                      : "border border-gray-300"
                  } rounded-md focus:outline-none`}
                  value={quantity}
                  onChange={(event) => {
                    const newQuantity = Math.max(
                      parseInt(event.target.value, 10) || 0,
                      0
                    );
                    setQuantity(newQuantity);
                  }}
                  onBlur={handleEdit}
                  step={product.product.step}
                />
              </div>
            </div>
          </div>
        </div>{" "}
        <p className="flex mt-2 space-x-2 text-xs text-gray-500">
          <span>
            ทวีคูณ {product.product.step} หมายเหตุ กรอกจำนวนที่เป็นจำนวนเต็ม
          </span>
        </p>
        <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex p-1 -m-1 text-gray-400 transition-all duration-200 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:text-gray-900"
          >
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartProduct;
