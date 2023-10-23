import classes from "../components/index.module.css";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Servericon from "@/components/icons/server.png";
import Walleticon from "@/components/icons/wallet.png";
import helpdeskicon from "@/components/icons/help-desk.png";
import Socialicon from "@/components/icons/social-media.png";
import StarIcon from "@/components/icons/star.png";
import Table from "@/components/serviceTable/Table";
import bg from "@/public/images/marketinglogo.png";
import Footer from "@/components/layout/footer";
import PageMetadata from "@/components/PageMetadata";
import MainHeader from "@/components/layout/main-header";
import axios from "axios";
import SearchInput from "@/components/serviceTable/SearchInput";

const API_BASE_URL = process.env.BACKEND_URL;

export const getServerSideProps = async (context) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/me`, {
      headers: { cookie: context.req.headers.cookie },
      withCredentials: true,
    });

    if (response.status === 200) {
      const me = response.data;
      console.log("user/me info => ", me);

      // ถ้ามีข้อมูลผู้ใช้ (เข้าสู่ระบบอยู่) ให้เปลี่ยนเส้นทางไปยังหน้า /users
      if (me) {
        return {
          redirect: {
            destination: "/users",
            permanent: false,
          },
        };
      }

      // ถ้าไม่มีข้อมูลผู้ใช้ (ยังไม่ได้เข้าสู่ระบบ) ให้ส่งข้อมูล me ไปแสดงผลในหน้า
      return {
        props: {
          me,
        },
      };
    }

    // กรณีที่เซิร์ฟเวอร์ส่งข้อมูลไม่ถูกต้องหรือมีปัญหา
    throw new Error("Failed to fetch user data");
  } catch (error) {
    console.error("Error fetching user info: ", error);

    return {
      props: {
        me: null,
      },
    };
  }
};

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [apiData, setApiData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch data based on search query and currentPage
  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = `${API_BASE_URL}/api/products?page=${currentPage}&per_page=10`;

        if (searchQuery) {
          apiUrl += `&keyword=${encodeURIComponent(searchQuery)}`;
        } else {
          apiUrl += "&keyword=Best Service";
        }

        const response = await axios.get(apiUrl);

        const newData = response.data.data;

        // Set data from the current page
        setApiData(newData);
        setTotalPages(response.data.total_page);
      } catch (error) {
        console.error("Error fetching API data: ", error);
      }
    };

    fetchData();
  }, [currentPage, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query); // Set searchQuery state based on input value
    setCurrentPage(1); // Reset currentPage when searching
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const [serviceCards] = useState([
    {
      icon: Servericon,
      title: "3,xxx+ บริการในระบบ",
      desc: "เรามีคู่ค้าและเซิพเวอร์ในระบบมากถึง 3,xxx+ บริการ ตอบโจทย์ทุกรูปแบบ ประเภทบริการ",
    },
    {
      icon: Walleticon,
      title: "มีทีมงานช่วยเหลือ",
      desc: "ราคาสุดพิเศษเพื่อคุณเริ่มต้นเพียง 0.01 บาท ก็สามารถดำเนินการได้ ราคานี้แค่คุณเท่านั้น",
    },
    {
      icon: helpdeskicon,
      title: "ปลอดภัย 100%",
      desc: "ติดต่อสอบถามได้ 24 ชั่วโมง เรามีทีมงานคอยให้คำแนะนำและประสานงานกับเซิพเวอร์ที่ใช้งาน",
    },
    {
      icon: Socialicon,
      title: "ฟรี ราคาถูก ราคาพิเศษ",
      desc: "ราคาสุดพิเศษเพื่อคุณเริ่มต้นเพียง 0.01 บาท ก็สามารถดำเนินการได้ ราคานี้แค่คุณเท่านั้น",
    },
  ]);

  return (
    <>
      <PageMetadata title="Home" />
      <MainHeader />
      <div className={`${classes.container} overflow-hidden`}>
        <div className={classes.body}></div>
        <div className={classes.position}>
          <div className={classes.banner}>
            <div className="grid grid-cols-1 md:grid-cols-2 text-white z-50 gap-4 md:gap-10 my-auto">
              <div className="w-full md:w-3/4">
                <div className={classes.item}>
                  <h1
                    className={`${classes.title} text-2xl md:text-4xl xl:text-5xl`}
                  >
                    เว็บปั้มวิว ปั้มไลค์ ปั้มใจ ปั้มผู้ติดตาม โปรโมท โฆษณา
                    ทำการตลาดออนไลน์
                  </h1>
                  <p className={`${classes.desc} text-sm md:text-base`}>
                    #1 บริการด้านการตลาดออนไลน์ SEO โซเชียลมีเดีย อันดับหนึ่ง
                    ปั้มวิวฟรี ปั้มใจ tiktok ปั้มไลค์ฟรี ปั้มผู้ติดตาม ปั้มฟอลโล
                    ปั้มซับ ระบบสั่งซื้ออัตโนมัติ ใช้งานง่าย อยู่ที่ไหนก็ทำได้
                    24/7
                  </p>
                  <Link href="/users/signup" prefetch>
                    <button
                      className={`${classes.btnlogin} md:w-40 md:h-10 hover:bg-gray-800 hover:text-white`}
                    >
                      สมัครสมาชิก
                    </button>
                  </Link>
                </div>
              </div>
              <div className="hidden md:flex items-center justify-center">
                <div className={classes.banner}>
                  <div className={classes.item}>
                      <Image src={bg} alt="Card Icon" className={classes.img} />
  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-8 mt-32 w-[70%] mx-auto items-center text-center">
          {serviceCards.map((card, index) => (
            <div className={classes.card} key={index}>
              <div className={classes.bodycard}>
                <Image
                  src={card.icon}
                  alt="server"
                  className={classes.cardimg}
                />
                <h2 className={classes.cardtitle}>{card.title}</h2>
                <p className={classes.carddesc}>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 bg-white h-[100px] mx-auto mt-16 shadow-lg rounded-2xl border-gray-50 flex items-center justify-center mb-16">
  <div className="flex items-center">
    <Image src={StarIcon} alt="StarIcon" width={64} height={32} />
    <h1 className="font-bold text-2xl md:text-4xl ml-2">
      TOP Best Services
    </h1>
  </div>
</div>

<div className="w-full md:w-2/3 h-[800px] mx-auto border-[3px] border-gray-50 flex items-center justify-center mb-16">
  {apiData && (
    <div>
      <SearchInput
        value={searchQuery}
        onSearch={handleSearch}
      />
      <Table
        products={apiData}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {/* Rest of your component */}
    </div>
  )}
</div>

<Footer />

      </div>
    </>
  );
};

export default HomePage;
