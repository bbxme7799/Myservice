import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";

import { useRouter } from "next/router";

const API_BASE_URL = process.env.BACKEND_URL_CSR;
const ResetPasswordForm = () => {
  const router = useRouter();
  const { token, email } = router.query;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        showError("New password and confirm password do not match.");
        return;
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/users/reset-password/${token}`,
        {
          newPassword: newPassword,
        }
      );

      if (response.status === 200) {
        showSuccess("Password reset successfully.");
      }
    } catch (error) {
      console.error(error);
      showError(
        "Failed to reset password. Please check your input and try again."
      );
    }
  };

  const showError = (message) => {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: message,
    });
  };

  const showSuccess = (message) => {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: message,
    });
  };

  return (
    <section
      className="relative py-12 bg-gray-900 sm:py-16 lg:py-20"
      style={{ backgroundAttachment: "fixed", height: "100vh" }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          className="object-cover object-bottom w-full h-full transform rotate-180 opacity-10"
          src="https://cdn.rareblocks.xyz/collection/clarity/images/features/6/background-pattern.png"
          alt=""
        />
      </div>

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative max-w-md mx-auto mt-10 lg:max-w-xl">
          <div className="absolute inset-x-1.5 top-8 -inset-y-4">
            <div
              className="w-full h-full mx-auto rotate-180 rounded-3xl opacity-90 blur-xl filter"
              style={{
                background:
                  "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)",
              }}
            ></div>
          </div>

          <div className="relative overflow-hidden bg-white rounded-2xl lg:rounded-3xl">
            <div className="px-6 py-7 sm:px-12 sm:py-10">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 font-pj sm:text-4xl xl:text-5xl">
                  ลืมรหัสผ่าน
                </h1>

                <p className="mt-8 text-sm font-normal text-center text-gray-600">
                  รีเซ็ตรหัสผ่าน
                </p>
              </div>
              {/* <form action="#" method="POST" className="mt-8"> */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900 font-pj"
                  >
                    Your Email
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="email"
                      value={email || ""}
                      placeholder="Email address"
                      className="block w-full px-6 py-3 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                      disabled
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900 font-pj"
                  >
                    New Password
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="password"
                      value={newPassword}
                      placeholder="New password"
                      className="block w-full px-6 py-3 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900 font-pj"
                  >
                    Confirm password
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="password"
                      value={confirmPassword}
                      placeholder="Confirm password"
                      className="block w-full px-6 py-3 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  onClick={handleResetPassword}
                  className="flex items-center justify-center w-full px-6 py-3 text-base font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj hover:bg-gray-600"
                >
                  Reset Password
                </button>
              </div>
              {/* </form> */}

              <svg
                className="w-auto h-4 mx-auto mt-8 text-gray-300"
                viewBox="0 0 172 16"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Replace the SVG lines with the original SVG lines */}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordForm;
