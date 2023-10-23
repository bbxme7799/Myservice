import Question from "../../components/faq/Question";
import axios from "axios";
import MainHeader from "@/components/layout/main-header";

const API_BASE_URL = process.env.BACKEND_URL; // Add this line

export const getServerSideProps = async (context) => {
  try {
    let me = null;

    const response = await axios.get(`${API_BASE_URL}/api/users/me`, {
      headers: { cookie: context.req.headers.cookie },
      withCredentials: true,
    });

    if (response.status === 200) {
      me = response.data;
      console.log("user/me info => ", me);
      if (me) {
        return {
          redirect: {
            destination: "/users",
            permanent: false,
          },
        };
      }
    }

    return {
      props: {
        me,
      },
    };
  } catch (error) {
    // Handle errors (e.g., network error, server error)
    // console.error("Error fetching user info: ", error);

    return {
      props: {
        me: null,
      },
    };
  }
};

const FAQPage = ({ me }) => {
  return (
    <>
      <MainHeader />
      <section className="py-12 mt-6 bg-white sm:py-16 lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
              คำถามที่พบบ่อย
            </h2>
            <p className="max-w-lg mx-auto mt-6 text-base text-gray-600 font-pj">
              คำถามหรือคำสั่งที่มักถูกนำเสนอและถูกสอบถามอย่างถี่ที่สุดในบริบทหนึ่ง
            </p>
          </div>

          <div className="max-w-4xl mx-auto mt-8 sm:mt-14">
            <div className="space-y-4">
              <Question
                title="MyService คืออะไร?"
                content="สโตว์นี้ เป็นเว็บไซต์การตลาดออนไลน์เกี่ยวกับโซเชียลมีเดียซึ่งให้บริการโปรโมทโปรไฟล์ของคุณ โปรโมทธุรกิจของคุณ ในราคาเพียงไม่กี่บาท ทำให้โปรไฟล์และธุรกิจของคุณมีคุณภาพสูงด้วยการถูกใจและผู้ติดตามเพิ่มมากขึ้น"
              />

              <Question
                title="เติมเงินยังไง ?"
                content="กดที่เมนู เติมเงินลูกค้าจะต้องมีบัญชี Metamask เพื่อทำการโอนเงิน"
              />

              <Question
                title="สั่งซื้ออย่างไร ?"
                content="หลังจาก ล็อกอินเข้ามา ที่หน้า คำสั่งซื้อใหม่ ให้เลือกหมวดหมู่ที่คุณต้องการทำ >>> เลือกบริการของหมวดหมู่นั้นๆ >>> อ่านรายละเอียดให้ครบถ้วน >>> กรอกปริมาณที่ต้องการ (ระบบจะกรอกปริมาณเริ่มต้นไว้ให้) >>> กรอกลิงก์ของงานนั้นๆ >>> หากมีส่วนลดคุณสามารถกรอกเข้ามาได้ >>> กดยืนยันคำสั่งซื้อ
                โปรดจำไว้ว่า หากคุณยืนยันคำสั่งซื้อแล้ว 99.9% คุณจะไม่สามารถยกเลิกมันได้"
              />

              <Question
                title="ยกเลิกคำสั่งซื้อได้ไหม?"
                content="เป็นเรื่องที่น่าเสียใจ ทุกคำสั่งซื้อเราไม่สามารถยกเลิกคำสั่งซื้อของคุณได้ เมื่ออยู่ในสถานะ กำลังดำเนินการ หรือ เสร็จสิ้น ผู้ใช้ต้องอดทนรอสถานะจากฝั่งเซิพเวอร์เท่านั้น บางครั้งช้า บางครั้งไว เป็นเรื่องปกติของระบบเซิพเวอร์ที่มีการใช้งานสูง"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQPage;
