import SidebarAdmin from "../../components/admin/layout/sidebarAdmin";
import NavbarAdmin from "../../components/admin/layout/navbarAdmin";
import SaleItem from "../../components/admin/layout/dashboard/SaleItem";
import SalesReport from "../../components/admin/layout/dashboard/SalesReport";
import TransactionsList from "../../components/admin/layout/dashboard/TransactionsList";
import CustomersList from "../../components/admin/layout/dashboard/CustomersList";
import PageMetadata from "@/components/PageMetadata";
import axios from "axios";
import { useEffect, useState } from "react";

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
        destination: "/admin/signin",
        permanent: false,
      },
    };
  } else if (me.role !== 1) {
    // เพิ่มเงื่อนไขตรวจสอบ role ที่ต้องการ
    return {
      redirect: {
        destination: "/users", // หน้าที่ต้องการ redirect ไป
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

export default function AdminDashBoardPage() {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalWithdraw, setTotalWithdraw] = useState(0);
  const [DataTransaction, setDataTransaction] = useState(0);
  const [DataOrderProfit, setDataOrderProfit] = useState(0);

  useEffect(() => {
    // Fetch total transactions data from the API
    axios
      .get(`${API_BASE_URL_CSR}/api/transactoins/report`, {
        withCredentials: true,
      }) // Fix the URL
      .then((response) => {
        const { totalDeposit, totalWithdraw, profit } = response.data.data; // Assuming the API response has this structure
        setTotalProfit(profit);
        setTotalDeposit(totalDeposit);
        setTotalWithdraw(totalWithdraw);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });

    // Fetch total customers from API
    axios
      .get(`${API_BASE_URL_CSR}/api/users/getusers`, {
        withCredentials: true,
      })
      .then((response) => {
        setTotalCustomers(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching total customers:", error);
      });

    axios
      .get(`${API_BASE_URL_CSR}/api/transactoins/admin`, {
        withCredentials: true,
      })
      .then((response) => {
        setDataTransaction(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching total customers:", error);
      });
      axios
      .get(`${API_BASE_URL_CSR}/api/orders/profit-perorder`, {
        withCredentials: true,
      })
      .then((response) => {
        setDataOrderProfit(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching total customers:", error);
      });
  }, []);

  return (
    <>
      <PageMetadata title="Dashboard" />
      <div className="flex flex-col">
        <NavbarAdmin />
        <div className="flex flex-1">
          <SidebarAdmin />

          <div className="flex flex-col flex-1 overflow-x-hidden">
            <main>
              <div className="py-6">
                <div className="px-4 mx-auto sm:px-6 md:px-8">
                  <div className="md:items-center md:flex"></div>
                </div>

                <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                  <div className="space-y-5 sm:space-y-6">
                    <div className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
                      <SaleItem
                        title="total Deposit"
                        amount={totalDeposit}
                        positive
                      />
                      <SaleItem
                        title="total Withdraw"
                        amount={totalWithdraw}
                        positive={false}
                      />
                      <SaleItem
                        title="profit"
                        amount={totalProfit}
                        positive={false}
                      />
                      <SaleItem
                        title="Total Customers"
                        amount={totalCustomers.toLocaleString()}
                        positive
                      />
                       <SaleItem
                        title="Total OrderProfit"
                        amount={totalCustomers.toLocaleString()}
                        positive
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-6">
                      <SalesReport />

                      {/* <div className="overflow-hidden bg-white border border-gray-200 rounded-xl lg:col-span-2">
                        <TrafficSourcesChart />
                      </div> */}
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-6">
                      <TransactionsList data={DataTransaction} />

                      <div className="overflow-hidden bg-white border border-gray-200 rounded-xl lg:col-span-2">
                        <CustomersList />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
