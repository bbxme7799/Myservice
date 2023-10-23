import React from "react";

const StatusBadge = ({ status }) => {
  let backgroundColor = "";
  let textColor = "";
  let svgPath = "";

  switch (status) {
    case "Canceled":
      backgroundColor = "bg-red-500";
      textColor = "text-white";
      svgPath = (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L11 11M11 1L1 11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
      break;
    case "Completed":
      backgroundColor = "bg-green-500";
      textColor = "text-white";
      svgPath = (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 4.92929L5.53033 8.39996L3 5.86962"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
      break;
    case "Refund":
      backgroundColor = "bg-blue-500";
      textColor = "text-white";
      svgPath = (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 1.75C2.82 1.75 0.25 4.32 0.25 7.5C0.25 10.68 2.82 13.25 6 13.25C9.18 13.25 11.75 10.68 11.75 7.5C11.75 4.32 9.18 1.75 6 1.75Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.25 5.25H6.56003C5.76003 5.25 5.25003 5.76 5.25003 6.56V10.25"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
      break;
    case "In progress":
      backgroundColor = "bg-yellow-500";
      textColor = "text-white";
      svgPath = (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 0V12M12 6H0"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
      break;
    // ทำเช่นนี้สำหรับสถานะอื่น ๆ ...
    default:
      backgroundColor = "bg-emerald-100";
      textColor = "text-emerald-500";
      svgPath = (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 3L4.5 8.5L2 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }

  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${backgroundColor} ${textColor}`}
    >
      {svgPath}
      <h2 className="text-sm font-normal">{status}</h2>
    </div>
  );
};

export default StatusBadge;
