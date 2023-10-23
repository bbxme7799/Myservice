import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const API_BASE_URL = process.env.BACKEND_URL_CSR;

const TableWithdrawal = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20); // จำนวนรายการต่อหน้า
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [transactionType, setTransactionType] = useState("ALL");
  const [filteredData, setFilteredData] = useState([]);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalWithdraw, setTotalWithdraw] = useState(0);
  const [totalPages, setTotalPages] = useState(0); // จำนวนหน้าทั้งหมด
  const [loading, setLoading] = useState(false);

  const fetchData = async (page) => {
    try {
      setLoading(true); // เปิด loading
      const response = await axios.get(
        `${API_BASE_URL}/api/transactoins/admin`,
        {
          withCredentials: true,
          params: {
            page: page,
            per_page: itemsPerPage,
          },
        }
      );
      const data = response.data;
      setUsers(data);
      setTotalPages(data.total_page);
      setLoading(false); // ปิด loading เมื่อข้อมูลโหลดเสร็จ
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false); // ปิด loading ในกรณีเกิดข้อผิดพลาด
    }
  };

  useEffect(() => {
    fetchData(currentPage); // Fetch data for the current page
  }, [transactionType, searchTerm, currentPage]);

  const handleNextPage = async () => {
    if (currentPage < totalPages && !loading) {
      setCurrentPage(currentPage + 1);
      await fetchData(currentPage + 1); // รอให้ข้อมูลเสร็จก่อนเรนเดอร์หน้าถัดไป
    }
  };

  const handleEditBalance = (user) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    filterData();
  }, [transactionType, users, currentPage, itemsPerPage]);

  const filterData = () => {
    if (transactionType === "ALL") {
      setFilteredData(users.data);
    } else {
      const filtered = users.data.filter(
        (user) => user.status === transactionType
      );
      setFilteredData(filtered);
      console.log("🚀  user.status:", filtered);
    }
  };

  useEffect(() => {
    const depositTotal = filteredData?.reduce((total, user) => {
      if (user.status === "DEPOSIT") {
        return total + parseFloat(user.amount);
      }
      return total;
    }, 0);

    const withdrawTotal = filteredData?.reduce((total, user) => {
      if (user.status === "WITHDRAW") {
        return total + parseFloat(user.amount);
      }
      return total;
    }, 0);

    setTotalDeposit(depositTotal);
    setTotalWithdraw(withdrawTotal);
  }, [filteredData, transactionType]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredUsers = users.data
    ? users.data.filter(
        (user) =>
          user.user.username
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          user.user.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.user.status?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const currentUsers = users.data
    ? filteredUsers.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const formatThaiDateTime = (utcDateTime) => {
    const optionsDate = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Bangkok",
    };

    const optionsTime = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Bangkok",
    };

    const utcDate = new Date(utcDateTime);
    const thaiDate = utcDate.toLocaleDateString("th-TH", optionsDate);
    const thaiTime = utcDate.toLocaleTimeString("th-TH", optionsTime);

    return `${thaiDate} ${thaiTime}`;
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <div className="flex justify-between items-center p-5">
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="border rounded px-2 py-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="text-gray-500">
          Showing {Math.min(indexOfLastItem, filteredUsers.length)} of{" "}
          {filteredUsers.length} entries
        </div>
        <div>
          <button
            className={`px-3 py-1 mx-2 border rounded ${
              transactionType === "DEPOSIT"
                ? "bg-green-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => {
              setTransactionType("DEPOSIT");
            }}
          >
            DEPOSIT
          </button>
          <button
            className={`px-3 py-1 mx-2 border rounded ${
              transactionType === "WITHDRAW"
                ? "bg-red-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => {
              setTransactionType("WITHDRAW");
            }}
          >
            WITHDRAW
          </button>
          <button
            className={`px-3 py-1 mx-2 border rounded ${
              transactionType === "ALL"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => {
              setTransactionType("ALL");
            }}
          >
            ALL
          </button>
        </div>
      </div>
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              id
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              amount
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              user
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              status
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              createdAt
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-medium text-gray-900"
            ></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {filteredData?.map((user) => (
            <tr key={user.id} className="hover-bg-gray-50">
              <td className="px-6 py-4">{user.id}</td>
              <td className="px-6 py-4">{user.amount}</td>
              <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                <div className="relative h-10 w-10">
                  <img
                    className="h-full w-full rounded-full object-cover object-center"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-700">
                    {user.user.username || "NULL"}
                  </div>
                  <div className="text-gray-400">
                    {user.user.email || user.user.address || "NULL"}
                  </div>
                </div>
              </th>
              <td
                className={`px-6 py-4 ${
                  user.status === "WITHDRAW" ? "text-red-600" : "text-green-600"
                }`}
              >
                <span
                  className={`inline-flex items-center gap-1 rounded-full bg-${
                    user.status === "WITHDRAW" ? "red" : "green"
                  }-50 px-2 py-1 text-xs font-semibold text-${
                    user.status === "WITHDRAW" ? "red" : "green"
                  }-600`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full bg-${
                      user.status === "WITHDRAW" ? "red" : "green"
                    }-600`}
                  ></span>
                  {user.status === "DEPOSIT" ? "DEPOSIT" : "WITHDRAW"}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2 truncate">
                  {formatThaiDateTime(user.createdAt)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-gray-100">
            <td colSpan="2"></td>
            <td className="px-6 py-4 font-medium text-gray-900">
              Total Deposit:
            </td>
            <td className="px-6 py-4">{totalDeposit}</td>
            <td className="px-6 py-4 font-medium text-gray-900">
              Total Withdraw:
            </td>
            <td className="px-6 py-4">{totalWithdraw}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <div className="flex justify-center p-5">
        <div className="text-gray-500">
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, filteredUsers.length)} of{" "}
          {filteredUsers.length} entries
        </div>
        <div className="ml-5">
          <button
            className="px-3 py-1 border rounded"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <button
            className="ml-2 px-3 py-1 border rounded"
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableWithdrawal;
