import React from "react";
import styles from "./index.module.css";

const OrderStatusButtons = ({ activeStatus, handleButtonClick }) => {
  const statuses = [
    { status: "ALL", label: "All" },
    { status: "โปรดรอ..", label: "โปรดรอ.." },
    { status: "Canceled", label: "Canceled" },
    // ... add other statuses
  ];

  return (
    <ul className={styles.section}>
      {statuses.map(({ status, label }) => (
        <li
          key={status}
          className={`sectionli mx-1 my-3 bg-gray-50 text-gray-500 px-5 py-2 rounded-lg ${
            activeStatus === status ? "active" : ""
          }`}
          onClick={() => handleButtonClick(status)}
        >
          <button onClick={() => handleButtonClick(status)}>{label}</button>
        </li>
      ))}
    </ul>
  );
};

export default OrderStatusButtons;
