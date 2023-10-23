import React, { useState } from "react";
import GoogleIcon from "@/components/icons/google-iconlogin.png";
import Image from "next/image";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const API_BASE_URL = process.env.BACKEND_URL;
const frontendURL = process.env.FRONTEND_URL;

const SignInSection = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (newEmail === "") {
      setEmailError("");
    } else if (!validateEmail(newEmail)) {
      setEmailError("กรุณากรอกอีเมลที่ถูกต้อง");
    } else {
      setEmailError("");
    }
  };

  const handleShowToast = () => {
    toast.success("This is a success toast message!", {
      position: "top-right", // Set the position of the toast
      autoClose: 3000, // Auto close the toast after 3000ms (3 seconds)
      hideProgressBar: false, // Display a progress bar
      closeOnClick: true, // Close the toast when clicked
      pauseOnHover: true, // Pause autoClose on hover
      draggable: true, // Allow dragging the toast
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/signin`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(
        "🚀 ~ file: SignInAdmin.js:43 ~ handleLogin ~ response:",
        response
      );

      // Handle successful login
      if (response.data.message === "success") {
        console.log("Login successful!");
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          router.push("/admin");
        }, 1000);
      }
    } catch (error) {
      if (error.response.data.error.message === "Invalid credentials") {
        console.log(
          "🚀 ~ file: SignInSection.js:58 ~ handleLogin ~  error.response.data.error.message:",
          error.response.data.error.message
        );
        toast.error("Invalid credentials", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  return (
    <section
      className="relative py-12 bg-gray-900 sm:py-16 lg:py-20"
      style={{ backgroundAttachment: "fixed", height: "100vh" }}
    >
      <div className="relative px-4 mx-auto max-w-7xl sm:px-4 lg:px-6">
        <div className="relative max-w-md mx-auto mt-8 lg:max-w-xl">
          <div className="absolute inset-x-0 top-6 -inset-y-4">
            <div
              className="w-full h-full mx-auto rotate-180 rounded-3xl opacity-90 blur-xl filter"
              style={{
                background:
                  "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)",
              }}
            ></div>
          </div>

          <div className="relative overflow-hidden bg-white rounded-2xl lg:rounded-3xl">
            <div className="px-4 py-5 sm:px-6 sm:py-6">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 font-pj sm:text-4xl xl:text-5xl">
                  ยินดีต้อนรับ!
                </h1>
                <p className="mt-6 text-lg font-normal text-gray-600 font-pj">
                  เข้าสู่ระบบแอดมิน
                </p>

                <div
                  title=""
                  className="
                  flex items-center justify-center w-full px-6 py-3 mt-8
                  text-sm font-bold text-gray-900 transition-all duration-200
                  bg-gray-100 border border-transparent rounded-xl hover:bg-gray-200
                  focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200
                  font-pj
  "
                  role="button"
                >
                  <a
                    href={`${API_BASE_URL}/api/auth/google`} // Use API_BASE_URL
                    className="flex items-center"
                  >
                    <Image
                      className="w-5 h-5 mr-4"
                      src={GoogleIcon}
                      alt="GoogleIcon"
                    />
                    <span className="text-base">เข้าสู่ระบบด้วย Google</span>
                  </a>
                </div>

                <p className="mt-8 text-sm font-normal text-center text-gray-600">
                  หรือ เข้าสู่ระบบด้วยอีเมล
                </p>
              </div>

              <form onSubmit={handleLogin}>
                <div className="space-y-3">
                  <div>
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900 font-pj"
                    >
                      อีเมล
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={(e) => {
                          if (!validateEmail(e.target.value)) {
                            setEmailError("กรุณากรอกอีเมลที่ถูกต้อง");
                          } else {
                            setEmailError("");
                          }
                        }}
                        className="block w-full px-6 py-3 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                      />
                      {emailError && (
                        <p className="text-red-500">{emailError}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor=""
                        className="text-base font-medium text-gray-900 font-pj"
                      >
                        รหัสผ่าน
                      </label>

                      <a
                        href="#"
                        title=""
                        className="text-base font-medium text-gray-500 rounded font-pj hover:text-gray-900 hover:underline focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                      >
                        ลืมรหัสผ่าน?
                      </a>
                    </div>
                    <div className="mt-2.5">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password (min. 8 characters)"
                        className="block w-full px-6 py-3 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    // onClick={handleShowToast}
                    className="flex items-center justify-center w-full px-6 py-3 text-sm font-bold
                    text-white transition-all duration-200 bg-gray-900 border border-transparent
                    rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                    font-pj hover:bg-gray-600"
                  >
                    Sign in
                  </button>
                  <ToastContainer />
                </div>
              </form>

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

export default SignInSection;
