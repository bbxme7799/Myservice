import React from "react";

// สร้างฟังก์ชันสำหรับแปลงเวลาเป็นรูปแบบไทย
function formatThaiDate(dateString) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    // timeZoneName: "short",
  };
  const thaiDate = new Intl.DateTimeFormat("th-TH", options).format(
    new Date(dateString)
  );
  return thaiDate;
}

const TransactionsList = ({ data }) => {
  return (
    <div className="overflow-hidden bg-white border border-gray-200 rounded-xl lg:col-span-4">
      <div className="px-4 py-5 sm:p-6">
        <div className="sm:flex sm:items-start sm:justify-between">
          <div>
            <p className="text-base font-bold text-gray-900">Transactions</p>
            <p className="mt-1 text-sm font-medium text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipis.
            </p>
          </div>

          <div className="mt-4 sm:mt-0">
            <a
              href="/admin/reportswithdraw"
              title=""
              className="inline-flex items-center text-xs font-semibold tracking-widest text-gray-500 uppercase hover:text-gray-900"
            >
              See all Transactions
              <svg
                className="w-4 h-4 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {data && data.length > 0 ? (
          data.slice(0, 5).map((transaction) => (
            <div
              key={transaction.id}
              className="grid grid-cols-3 py-4 gap-y-4 lg:gap-0 lg:grid-cols-6"
            >
              <div className="col-span-2 px-4 lg:py-4 sm:px-6 lg:col-span-1">
                <span
                  className={`text-xs font-medium ${
                    transaction.status === "DEPOSIT"
                      ? "text-green-900 bg-green-100"
                      : transaction.status === "PENDING"
                      ? "text-yellow-900 bg-yellow-100"
                      : "text-red-900 bg-red-100"
                  } rounded-full inline-flex items-center px-2.5 py-1`}
                >
                  {transaction.status}
                </span>
              </div>

              <div className="px-4 text-right lg:py-4 sm:px-6 lg:order-last">
                {/* <button
                  type="button"
                  className="inline-flex items-center justify-center w-8 h-8 text-gray-400 transition-all duration-200 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    ></path>
                  </svg>
                </button> */}
              </div>

              <div className="px-4 lg:py-4 sm:px-6 lg:col-span-2">
                <p className="text-sm font-bold text-gray-900">
                  {transaction.user.username}
                </p>
                <p className="mt-1 text-sm font-medium text-gray-500">
                  {transaction.user.email}
                </p>
              </div>

              <div className="px-4 lg:py-4 sm:px-6">
                <p className="text-sm font-bold text-gray-900">
                  {transaction.amount}
                </p>
                <p className="mt-1 text-sm font-medium text-gray-500">
                  {formatThaiDate(transaction.createdAt)}
                </p>
              </div>

              {/* <div className="px-4 lg:py-4 sm:px-6">
                <p className="mt-1 text-sm font-medium text-gray-500">
                  {transaction.user.email}
                </p>
              </div> */}
            </div>
          ))
        ) : (
          <p className="py-4 text-gray-500">No transactions available.</p>
        )}
      </div>
    </div>
  );
};

export default TransactionsList;
