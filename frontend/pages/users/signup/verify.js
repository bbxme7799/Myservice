import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";

const API_BASE_URL_SSR = process.env.BACKEND_URL_SSR;
const API_BASE_URL_CSR = process.env.BACKEND_URL_CSR;

export default function VerifyPage() {
  const router = useRouter();
  const [verificationStatus, setVerificationStatus] = useState("Verifying...");

  const verifyEmail = async () => {
    try {
      // Use API_BASE_URL to construct the verifyUrl
      const verifyUrl = `${API_BASE_URL_CSR}/api/auth/verify/${router.query.email}?token=${router.query.token}`;
      const response = await axios.get(verifyUrl);
      console.log(
        "🚀 ~ file: verify.js:14 ~ verifyEmail ~ response:",
        response
      );

      if (response.data.message === "Email verified successfully.") {
        setVerificationStatus("Email verified successfully");
        router.push("/users/signin");
      } else {
        setVerificationStatus("Email verification failed");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      setVerificationStatus("Error verifying email");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-5 bg-[#111724] min-w-screen">
      <div className="max-w-xl p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12">
        <h3 className="text-2xl">Thanks for signing up for MyService!</h3>
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-24 h-24 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
            />
          </svg>
        </div>

        <p>We're happy you're here. Let's get your email address verified:</p>
        <div className="mt-4">
          <button
            onClick={verifyEmail}
            className="px-2 py-2 mt-4 text-blue-200 bg-blue-600 rounded cursor-pointer"
          >
            Verify Email
          </button>
        </div>
        <div className="mt-2 text-blue-600">{verificationStatus}</div>
      </div>
    </div>
  );
}
