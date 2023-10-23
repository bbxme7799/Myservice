import React from "react";
import Swal from "sweetalert2";

const CheckoutButton = () => {
  const handleCheckoutClick = () => {
    Swal.fire({
      title: "ยืนยันที่จะสั่งซื้อ?",
      // text: "กรุณาเช็คให้ละเอียดก่อนสั่งซื้อ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        // ทำตามกระบวนการชำระเงินที่คุณต้องการ โดยใช้ API หรือเมื่อชำระเงินเสร็จ
        Swal.fire("สำเร็จ!", "การสั่งซื้อเสร็จสิ้น", "success");
      }
    });
  };
  return (
    <button
      type="button"
      onClick={handleCheckoutClick}
      className="inline-flex items-center justify-center w-full px-6 py-4 text-sm font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
    >
      ยืนยันการสั่งซื้อ
    </button>
  );
};

export default CheckoutButton;
