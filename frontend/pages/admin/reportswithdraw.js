import SidebarAdmin from "../../components/admin/layout/sidebarAdmin";
import NavbarAdmin from "../../components/admin/layout/navbarAdmin";
import PageMetadata from "@/components/PageMetadata";
import UserWithdrawal from "@/components/admin/layout/withdraw-deposit/WithdrawDeposit";
import axios from "axios";

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

export default function WithdrawalPage() {
  return (
    <>
      <PageMetadata title="Report Withdraw" />
      <div className="flex flex-col">
        <NavbarAdmin />
        <div className="flex flex-1">
          <SidebarAdmin />
          <div className="flex flex-col flex-1 overflow-x-hidden">
            <div className="py-6">
              <div className="px-4 mx-auto sm:px-6 md:px-12">
                <h1 className="text-2xl font-semibold ">
                  รายงานการทำธุรกรรม ฝาก-ถอน Transaction Report: Deposits and
                  Withdrawals
                </h1>
                <UserWithdrawal />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
