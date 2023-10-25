import React, { useState, useEffect } from "react";
import StatusBadge from "./StatusBadge";

const OrderDetailsModal = ({
  isOpen,
  onClose,
  selectedOrder,
  orderDataDetails,
}) => {
  // ... ตัวอย่างโค้ดที่เหมือนเดิม

  const [uniqueUrls, setUniqueUrls] = useState(new Set());

  useEffect(() => {
    // ตรวจสอบว่า orderDataDetails มีค่าหรือไม่
    if (!orderDataDetails) {
      return;
    }

    // หาข้อมูลในอาร์เรย์ซ้อนที่เกี่ยวข้องกับคำสั่งนี้
    const relevantArray = orderDataDetails.find((item) =>
      item.data.some((order) => order.order_id === selectedOrder.order_id)
    );

    // ถ้าไม่พบข้อมูลที่เกี่ยวข้อง ให้แสดงข้อความ "Order not found"
    if (!relevantArray) {
      return;
    }

    // กรองรายการที่เกี่ยวข้องกับคำสั่งนี้
    const filteredOrders = relevantArray.data.filter(
      (order) => order.order_id === selectedOrder.order_id
    );

    // ใช้ Set เพื่อเก็บ URL ที่ไม่ซ้ำ
    const urlsSet = new Set();
    filteredOrders.forEach((order) => {
      urlsSet.add(order.url);
    });

    setUniqueUrls(urlsSet);
  }, [orderDataDetails, selectedOrder]);

    // กรองรายการที่เกี่ยวข้องกับคำสั่งนี้
    const filteredOrders = relevantArray.data.filter(
      (order) => order.order_id === selectedOrder.order_id
    );
    console.log("filteredOrders =>",filteredOrders)

    // คำนวณราคารวมของรายการที่ไม่ใช่ "Canceled" และ "Refund"
    const totalNonCanceledPrice = filteredOrders
      .filter((order) => order.status !== "Canceled" && order.status !== "Refund")
      .reduce((total, order) => total + order.price, 0);

    // แปลงเป็นชนิด Number เพื่อให้แน่ใจว่าเป็นค่าที่สามารถใช้งานได้
    const totalNonCanceledPriceNumber = Number(totalNonCanceledPrice);

    // คำนวณราคารวมเป็นทศนิยม 2 ตำแหน่ง
    const formattedTotalPrice = totalNonCanceledPriceNumber.toFixed(2);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur bg-opacity-60">
        <div className="relative bg-white p-2 sm:p-4 md:p-6 rounded-lg shadow-lg max-w-md w-full overflow-y-auto max-h-screen">
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
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
          <h2 className="text-sm md:text-lg font-semibold mb-2">Order Details</h2>
          <div className="space-y-1">
            <p className="text-xs md:text-sm text-gray-600">
              Order ID: {selectedOrder.order_id}
            </p>
            <hr className="my-1 border-gray-300" />
            {filteredOrders.map((order) => (
              <div key={order.id} className="mb-2">
                <p className="text-sm font-semibold">
                  Service Name: {order.service_name}
                </p>
                <p className="text-xs text-gray-600">
                  {" "}
                  <StatusBadge status={order.status} />
                </p>
                <p className="text-xs text-gray-600">
                  Quantity: {order.quantity}
                </p>
                <p className="text-xs text-gray-600">
                  Start Count: {order.start_count}
                </p>
                <p className="text-xs text-gray-600">
                URL: <a href={order.url} target="_blank" rel="noopener noreferrer">{order.url}</a>
              </p>


                <p className="text-xs text-gray-600">Price: {order.price}</p>
                <hr className="my-1 border-gray-300" />
              </div>
            ))}
            <div className="mb-2" />
            <p className="text-xs md:text-sm text-gray-600 font-semibold">
              Total Price (Non-Canceled and Non-Refund): {formattedTotalPrice}
              BATH
            </p>
          </div>
        </div>
      </div>
    );
  };

  export default OrderDetailsModal;
