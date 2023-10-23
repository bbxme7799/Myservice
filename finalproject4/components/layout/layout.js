import { Fragment } from "react";
import MainHeader from "./main-header";
import Sidebar from "./sidebar";
import { useEffect, useState } from "react";
import Navbar from "./navbar";
import { useRouter } from "next/router";

export default function Layout({ children, me }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (me) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      console.log();
    }
  }, [me]);

  const hideSidebarNavbarPages = [
    "/",
    "/service-user",
    "/blog",
    "/faq",
    "/users/signin",
    "/users/signup",
  ];

  const shouldHideSidebarNavbar = hideSidebarNavbarPages.includes(
    router.pathname
  );

  const isAdminRoute = router.pathname === "/admin"; // เพิ่มตรวจสอบเส้นทาง "/admin"

  return (
    <Fragment>
      {/* <div className="container"> */}
      {!isAdminRoute && !shouldHideSidebarNavbar && isLoggedIn && <Sidebar />}
      {!isAdminRoute && !shouldHideSidebarNavbar && isLoggedIn && (
        <Navbar me={me} />
      )}
      <main>{children}</main>
      {/* </div> */}
    </Fragment>
  );
}
