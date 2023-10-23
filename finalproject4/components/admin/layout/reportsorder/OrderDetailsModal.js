import React, { useState } from "react";
import StatusBadge from "./StatusBadge";

const OrderDetailsModal = ({ order, onClose }) => {
  const totalPrice = order.order_items.reduce((accumulator, item) => {
    if (item.status !== "Canceled" && item.status !== "Refund") {
      return accumulator + parseFloat(item.price);
    }
    return accumulator;
  }, 0);

  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur bg-opacity-60">
      <div className="relative bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg max-w-md w-full overflow-y-auto max-h-screen">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
        <h2 className="text-lg md:text-xl font-semibold mb-3">Order Details</h2>
        <div className="space-y-2">
          <p className="text-sm md:text-base text-gray-600">
            Order ID: {order.id}
          </p>
          <p className="text-sm md:text-base text-gray-600">
            User ID: {order.user_id}
          </p>
          <hr className="my-2 border-gray-300" />
          {order.order_items
            .slice(0, showDetails ? order.order_items.length : 1)
            .map((item) => (
              <div key={item.id} className="space-y-2">
                <p className="text-sm md:text-base text-gray-600 truncate">
                  Service Name: {item.service_name}
                </p>
                <p className="text-sm md:text-base text-gray-600">
                  Quantity: {item.quantity}
                </p>
                <p className="text-sm md:text-base text-gray-600">
                  Price: {item.price}
                </p>
                <p className="text-sm md:text-base text-gray-600">
                  <StatusBadge status={item.status} />
                </p>
                <hr className="my-2 border-gray-300" />
                {/* Other order item details */}
              </div>
            ))}
          {order.order_items.length > 1 && (
            <button
              className="text-blue-500 hover:text-indigo-500 font-semibold"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails
                ? "Show Less"
                : `Show All (${order.order_items.length - 1} more)`}
            </button>
          )}
          <p className="text-sm md:text-base text-gray-600 font-semibold">
            Total Price (Non-Canceled and Non-Refund): {totalPrice.toFixed(2)}{" "}
            BATH
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
