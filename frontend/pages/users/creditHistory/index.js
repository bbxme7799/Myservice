import React, { useEffect, useState } from "react";
import PageMetadata from "@/components/PageMetadata";
import axios from "axios";
import Layout from "@/components/layout/layout";
import StatusBadge from "@/components/user/credithistory/StatusBadge";

const API_BASE_URL_SSR = process.env.BACKEND_URL_SSR;
const API_BASE_URL_CSR = process.env.BACKEND_URL_CSR;


export const getServerSideProps = async (context) => {
  const me = await axios
    .get(`${API_BASE_URL_SSR}/api/users/me`, {
      headers: { cookie: context.req.headers.cookie },
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch(() => null);

  console.log("user/me info => ", me);

  if (!me) {
    return {
      redirect: {
        destination: "/users/signin",
        permanent: false,
      },
    };
  }

  // Check if the user is banned
  if (me.is_banned) {
    return {
      redirect: {
        destination: "/suspended",
        permanent: false,
      },
    };
  }

  return {
    props: {
      me,
    },
  };
};

function index({ me }) {
  const [statusQuery, setStatusQuery] = useState(""); // เพิ่ม State สำหรับค้นหา status
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  const [topupHistory, setTopupHistory] = useState([]);

  useEffect(() => {
    // Fetch top-up history data from the API with credentials
    axios
      .get(`${API_BASE_URL_CSR}/api/transactoins/`, {
        withCredentials: true, // Include this option to send credentials
      })
      .then((response) => {
        setTopupHistory(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching top-up history:", error);
      });
  }, []);

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  // แสดงรายการการฝากเงินที่ผ่านการค้นหา
  const filteredTopupHistory = topupHistory.filter((item) => {
    const status = item.status || "";
    const sanitizedStatusQuery = statusQuery
      .toLowerCase()
      .replace(/[^\w\s]/g, "");
    const sanitizedStatus = status.toLowerCase().replace(/[^\w\s]/g, "");
    return sanitizedStatus.includes(sanitizedStatusQuery);
  });

  const records = filteredTopupHistory.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const npage = Math.ceil(filteredTopupHistory.length / recordsPerPage);
  const number = [...Array(npage + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage < npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prePage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changeCPage = (page) => {
    setCurrentPage(page);
  };

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
    <>
      <PageMetadata title="Credit history" />
      <Layout me={me}></Layout>
      <div className="ml-[255px] mt-[65px] h-auto">
        <div className="bg-white my-[2px] ">
          <div className="flex mx-2 py-2 ">
            <h1 className="font-bold text-lg"> Orders :</h1>
            <p className="text-lg pl-2"> ประวัติฝากเครดิต</p>
          </div>
        </div>
        <div className="mx-[50px] my-6 shadow-md h-full">
          <div className="bg-white h-auto rounded-lg px-8 py-8 ">
            <div className="relative">
              <div className="w-full my-5 mx-5 px-5 py-5">
                <div className=" ">
                  <table className="w-full mx-auto">
                    <tbody>
                      <tr className="border-b-2">
                        <th className="text-left p-4  ">ID</th>
                        <th className="text-left   ">ช่องทางเงินฝาก</th>
                        <th className="text-left  ">จำนวน</th>
                        <th className="text-center  ">จำนวนที่ได้รับ</th>
                        <th className="text-center  ">สถานะ</th>
                        <th className="text-center ">วันที่สร้าง</th>
                      </tr>
                      {filteredTopupHistory.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No data available
                          </td>
                        </tr>
                      ) : (
                        records.map((item) => (
                          <tr key={item.id} className="border-b-2">
                            <td className="text-left ">
                              <p className="mx-2 my-3">{item.id}</p>
                            </td>
                            <td className="text-left ">
                              <p className="my-3 ">Metamask</p>
                            </td>
                            <td className="text-left ">
                              <p className="my-3 ">{item.amount}</p>
                            </td>
                            <td className="text-center ">
                              <p className="my-3">{item.amount}</p>
                            </td>
                            <td className="text-center ">
                              <StatusBadge status={item.status} />
                            </td>
                            <td className="text-center ">
                              <p className="my-3">
                                {formatThaiDateTime(item.createdAt)}
                              </p>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between mx-3 my-5 ">
                  <div className="my-auto flex items-center">
                    <label htmlFor="dropdownMenu" className="pr-4">
                      แสดง
                    </label>
                    <select
                      id="dropdownMenu"
                      name="dropdownMenu"
                      className="mt-[0.2rem] border-2 rounded-md py-2 px-3"
                      value={recordsPerPage}
                      onChange={(e) =>
                        setRecordsPerPage(parseInt(e.target.value))
                      }
                    >
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                    </select>
                    <label htmlFor="dropdownMenu" className="pl-4 flex">
                      แถว{" "}
                      <p className="ml-3 opacity-70">
                        จากทั้งหมด {filteredTopupHistory.length} ข้อมูล
                      </p>
                    </label>
                  </div>

                  <nav>
                    <ul className="flex justify-end mx-1 my-5">
                      <li className="page-item mx-1 border-2 rounded-l-xl px-2 py-1">
                        <a href="#" className="page-link" onClick={prePage}>
                          ก่อนหน้า
                        </a>
                      </li>
                      {number.map((n, i) => (
                        <li
                          className={`page-item mx-1 px-3 text-center items-center rounded-md ${
                            currentPage === n ? "active" : ""
                          }`}
                          key={i}
                        >
                          <a
                            href="#"
                            className="page-link flex justify-items-center mt-1"
                            onClick={() => changeCPage(n)}
                          >
                            {n}
                          </a>
                        </li>
                      ))}
                      <li className="page-item mx-1 border-2 rounded-r-xl px-2 py-1">
                        <a href="#" className="page-link" onClick={nextPage}>
                          ถัดไป
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default index;
