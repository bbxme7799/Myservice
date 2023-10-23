import React, { useState } from "react";
import Link from "next/link";
import GoogleIcon from "@/components/icons/google-iconlogin.png";
import MetamaskIcon from "@/components/icons/Metamaskiconlogin.png";
import Image from "next/image";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignInButton from "../../components/signin/SignInButton";
import Web3 from "web3";
import { useRouter } from "next/router";

const API_BASE_URL = process.env.BACKEND_URL;
const frontendUrl = process.env.FRONTEND_URL;

const SignInSection = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");
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
  const handleLogin = async (e) => {
    e.preventDefault();

    const toastOptions = {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/signin`, // ใช้ API_BASE_URL ที่เพิ่มขึ้น
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
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
          router.push("/users");
        }, 1000);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error?.message;

      if (errorMessage === "Invalid credentials") {
        console.log("Invalid credentials error:", errorMessage);
        toast.error("Invalid credentials", toastOptions);
      } else if (errorMessage === "Email is not verified") {
        console.log("Email is not verified error:", errorMessage);
        toast.error("Email is not verified", toastOptions);
      } else {
        console.log("Other error:", errorMessage);
        toast.error("An error occurred", toastOptions);
      }
    }
  };

  const getNonce = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/auth/nonce`);
      return response.data.nonce;
    } catch (error) {
      console.error("Error fetching nonce:", error);
      throw error;
    }
  };

  const handleMetamaskLogin = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);

      try {
        // Request access to accounts
        await window.ethereum.enable();

        const accounts = await web3.eth.getAccounts();
        const selectedAddress = accounts[0];

        // Call your Metamask authentication endpoint with the selectedAddress
        const nonceResponse = await axios.get(`${API_BASE_URL}/api/auth/nonce`);

        const { nonce } = nonceResponse.data;

        // Sign the nonce with Metamask
        const signedMessage = await web3.eth.personal.sign(
          `Login to YourApp: ${nonce}`,
          selectedAddress,
          ""
        );

        // Call your Metamask authentication endpoint with the signed message
        const response = await axios.post(
          `${API_BASE_URL}/api/auth/metamask`,
          {
            signedMessage,
            message: `Login to YourApp: ${nonce}`,
            address: selectedAddress,
          },
          {
            withCredentials: true,
          }
        );

        // Handle successful Metamask login...
        // หลังจาก login สำเร็จ ให้ใช้ router.push() เพื่อนำผู้ใช้ไปยังหน้า "/users"
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
            router.push("/users");
          }, 1000);
        }
      } catch (error) {
        console.error("Error with Metamask:", error);
      }
    } else {
      console.error("Metamask is not installed.");
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
                  ยินดีต้อนรับกลับ!
                </h1>
                <p className="mt-6 text-lg font-normal text-gray-600 font-pj">
                  เข้าสู่ระบบเพื่อเลือกซื้อบริการในระบบ
                </p>

                <SignInButton
                  href={`${API_BASE_URL}/api/auth/google`}
                  iconSrc={GoogleIcon}
                  text="เข้าสู่ระบบด้วย Google"
                />
                <button
                  className="
    flex items-center justify-center w-full px-6 py-3 mt-8
    text-sm font-bold text-gray-900 transition-all duration-200
    bg-gray-100 border border-transparent rounded-xl hover:bg-gray-200
    focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200
    font-pj"
                  onClick={handleMetamaskLogin}
                  role="button"
                >
                  <div className="flex items-center">
                    <Image
                      className="w-5 h-5 mr-4"
                      src={MetamaskIcon}
                      alt="Icon"
                    />
                    <span className="text-base">เข้าสู่ระบบด้วย Metamask</span>
                  </div>
                </button>

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
                        onChange={handleEmailChange}
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
                        href={`${frontendUrl}/users/forgotpassword`}
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

              <p className="mt-5 text-base font-normal text-center text-gray-900 font-pj">
                คุณยังไม่มีบัญชี?{" "}
                <Link
                  href="/users/signup"
                  title=""
                  className="font-bold rounded hover:underline focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                >
                  สร้างบัญชีฟรี
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInSection;
