import React from "react";

const ProductModal = ({ selectedProduct, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-3/4 max-w-3xl relative">
        <div
          className="absolute top-2 right-2 cursor-pointer"
          onClick={onClose}
        >
          &times;
        </div>
        <h2 className="text-lg font-semibold mb-4">Product Details</h2>
        {selectedProduct && (
          <div>
            <label className="block mb-2" htmlFor="service">
              ไอดี:
            </label>
            <input
              id="service"
              type="text"
              className="w-full px-2 py-1 rounded border"
              value={selectedProduct.service}
              readOnly
            />

            <label className="block mt-4 mb-2" htmlFor="name">
              ชื่อบริการ:
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-2 py-1 rounded border"
              value={selectedProduct.name}
              readOnly
            />

            <label className="block mt-4 mb-2" htmlFor="name">
              ชื่อบริการ:
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-2 py-1 rounded border"
              value={selectedProduct.category}
              readOnly
            />

            <label className="block mt-4 mb-2" htmlFor="rate">
              รายละเอียด:
            </label>
            <pre className="mb-0">
              <textarea
                id="rate"
                className="text-xs leading-tight w-full px-2 py-1 rounded border"
                rows="8"
                value={selectedProduct.description}
                readOnly
              />
            </pre>
            <label className="block mt-4 mb-2" htmlFor="name">
              <span className="text-red-600">ขั้นต่ำ</span> - ขั้นสูง:
            </label>
            <p className="w-full px-2 py-1 rounded border bg-gray-100">
              {selectedProduct.min + " - " + selectedProduct.max}
            </p>

            <label className="block mt-4 mb-2" htmlFor="name">
              จำนวน*{selectedProduct.rate * 1.5}(ต่อ1000):
            </label>
            <p className="w-full px-2 py-1 rounded border bg-gray-100">
              {selectedProduct.min + " * " + selectedProduct.rate * 1.5} ={" "}
              {(
                selectedProduct.min *
                ((selectedProduct.rate * 1.5) / 1000)
              ).toFixed(6)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductModal;
