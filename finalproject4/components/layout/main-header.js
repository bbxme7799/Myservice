import Link from "next/link";
import styles from "./main-header.module.css";
import React, { memo } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const API_BASE_URL = process.env.BACKEND_URL; // Added API_BASE_URL

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Service",
    url: "/service-user",
  },
  {
    id: 3,
    title: "Blog",
    url: "/blog",
  },
  {
    id: 4,
    title: "FAQ",
    url: "/faq",
  },
];

const MainHeader = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    console.log("Clicked");
    try {
      const test = await axios.post(
        `${API_BASE_URL}/api/auth/signout`, // Use API_BASE_URL
        {
          headers: { Cookie: document.cookie },
        },
        {
          withCredentials: true,
        }
      );
      console.log("🚀 ~ file: main-header.js:39 ~ handleSignOut ~ test:", test);
      console.log("Sign out successful");
      router.push("/");
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.area}></div>
      <div className={styles.nav}>
        <Link href="/" className={styles.logo}>
          MyService
        </Link>
        <div className={styles.links}>
          {links.map((link) => (
            <a key={link.id} href={link.url} className={styles.link}>
              {link.title}
            </a>
          ))}
        </div>
        <Link href="/users/signin" passHref>
          <button className={styles.login}>เข้าสู่ระบบ</button>
        </Link>
      </div>
    </div>
  );
};

export default memo(MainHeader);
