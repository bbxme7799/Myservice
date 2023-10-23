import Link from "next/link";
import React, { memo } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import SidebarItem from "./sidebarItem";

const API_BASE_URL = process.env.BACKEND_URL_CSR;

const Sidebar = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    console.log("Clicked");
    try {
      await axios.post(`${API_BASE_URL}/api/auth/signout`, null, {
        withCredentials: true,
      });
      console.log("Sign out successful");
      router.push("/users/signin");
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <div className="flex flex-col flex-auto flex-shrink-0 antialiased text-gray-800">
      <div className="fixed flex flex-col top-0 left-0 w-64 bg-white h-full border-r z-50">
        <div className="flex items-center justify-center h-16 border-b">
          <Link href="/users" prefetch>
            <div>MyService</div>
          </Link>
        </div>
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            <SidebarItem icon="home" text="คำสั่งซื้อใหม่" href="/users" />
            <SidebarItem icon="credit" text="เติมเครดิต" href="/users/credit" />
            <SidebarItem
              icon="withdraw"
              text="ถอนเครดิต"
              href="/users/withdraw"
            />
            <SidebarItem
              icon="order-history"
              text="ประวัติ ออเดอร์"
              href="/users/history"
            />
            <SidebarItem
              icon="credit-history"
              text="ประวัติฝากเครดิต"
              href="/users/creditHistory"
            />
            <SidebarItem
              icon="withdraw-history"
              text="ประวัติถอนเครดิต"
              href="/users/withdrawhistory"
            />
            <SidebarItem
              icon="settings"
              text="ตั้งค่าข้อมูลส่วนตัว"
              href="/users/settings"
            />
            <li className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                <button onClick={handleSignOut}>ออกจากระบบ</button>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default memo(Sidebar);
