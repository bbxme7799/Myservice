import { useState } from "react";

const Question = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className="relative overflow-hidden bg-white border border-gray-200 rounded-xl">
      <h3>
        <button
          onClick={toggleExpand}
          aria-expanded={expanded}
          className="flex items-center justify-between w-full px-6 py-5 text-xl font-bold text-left text-gray-900 sm:p-8 font-pj"
        >
          <span>{title}</span>
          <span aria-hidden="true" className="ml-4">
            {expanded ? (
              <svg
                className="w-6 h-6 text-gray-900"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 12H4"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-900"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            )}
          </span>
        </button>
      </h3>

      {expanded && <div className="px-6 pb-6 sm:px-8 sm:pb-8">{content}</div>}
    </div>
  );
};

export default Question;
