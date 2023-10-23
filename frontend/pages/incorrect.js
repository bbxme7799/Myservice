import { useRouter } from "next/router";

const SuspendedPage = () => {
  const router = useRouter();

  const contactAdmin = () => {
    // ทำการติดต่อผู้ดูแล โดยใช้วิธีที่คุณต้องการ เช่น ส่งอีเมลหรือโทรศัพท์

    // ตัวอย่าง: เมื่อคลิกปุ่ม "ติดต่อผู้ดูแล" คุณสามารถนำผู้ใช้ไปยังหน้า `/users/signin`
    router.push("/users/signin");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-semibold mb-6">บัญชีของคุณได้ทำการสมัครแล้ว</h1>
      <p className="text-xl text-gray-600 text-center mb-8">
        โปรดเข้าสู่ระบบด้วยอีเมลที่คุณทำการลงทะเบียนไว้
      </p>
      <button
        className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-3 px-6 rounded"
        onClick={contactAdmin}
      >
        กลับไปหน้าเข้าสู่ระบบ
      </button>
    </div>
  );
};

export default SuspendedPage;
