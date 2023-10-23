import React from "react";
import { useState } from "react";
import PageMetadata from "@/components/PageMetadata";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Layout from "@/components/layout/layout";
import Image from "next/image";
import Metamaskiconlogin from "../../../components/icons/Metamaskiconlogin.png";

// Add this line to get the API base URL from environment variables
const API_BASE_URL = process.env.BACKEND_URL;

export const getServerSideProps = async (context) => {
  const me = await axios
    .get(`${API_BASE_URL}/api/users/me`, {
      // Use API_BASE_URL to construct the URL
      headers: { cookie: context.req.headers.cookie },
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch(() => null);

  console.log("user/me info => ", me);

  if (!me) {
    return {
      redirect: {
        destination: "/users/signin",
        permanent: false,
      },
    };
  }

  // Check if the user is banned
  if (me.is_banned) {
    return {
      redirect: {
        destination: "/suspended",
        permanent: false,
      },
    };
  }

  return {
    props: {
      me,
    },
  };
};

export default function WithdrawPage({ me }) {
  const [creditAmount, setCreditAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const handleCreditChange = (e) => {
    setCreditAmount(e.target.value);
  };

  const handleWalletAddressChange = (e) => {
    setWalletAddress(e.target.value);
  };

  const handleWithdrawal = async () => {
    try {
      if (!creditAmount || !walletAddress) {
        toast.error("Please fill in both wallet address and amount.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      // Convert creditAmount to a number
      const amount = parseFloat(creditAmount);

      // Send a POST request to the withdrawal API
      const response = await axios.post(
        `${API_BASE_URL}/api/transactoins/request-withdraw`, // Use API_BASE_URL to construct the URL
        {
          amount: amount,
          walletPublicKey: walletAddress,
        },
        {
          withCredentials: true, // Include credentials
        }
      );
      // Check the response for success or error messages
      if (response.data.message === "success") {
        toast.success("Withdrawal request sent successfully.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error("Failed to send withdrawal request.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error with withdrawal:", error);
      toast.error("An error occurred during withdrawal request.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <>
      <PageMetadata title="WithDraw" />
      <Layout me={me}></Layout>
      <div className="ml-[255px] mt-[65px] h-auto">
        <div className="bg-white my-[2px] ">
          <div className="flex mx-2 py-2">
            <h1 className="font-bold text-lg">WithDraw credit:</h1>
            <p className="text-lg pl-2">ถอนเครดิต</p>
          </div>
        </div>
        <div className="mx-[200px] my-8  h-full">
          <div className="h-auto rounded-lg px-8 py-8">
            <div className="relative">
              <div className="flex items-center justify-center px-5 pt-3 pb-10">
                <div className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700 sm:max-w-md">
                  <div className="w-full pt-1 pb-5">
                    <div className="bg-black text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-12 h-12"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="mb-10">
                    <h1 className="text-center font-bold text-xl uppercase">
                      Withdraw credit
                    </h1>
                  </div>
                  <div className="mb-3 flex -mx-2">
                    <div className="px-2">
                      <label
                        htmlFor="type1"
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          className="form-radio h-5 w-5 text-indigo-500"
                          name="type"
                          id="type1"
                          defaultChecked
                        />
                        <Image
                          src={Metamaskiconlogin}
                          className="w-8 h-8 mr-4"
                          alt="Metamask Icon"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="font-bold text-sm mb-2 ml-1">
                      Withdrawal Wallet Address
                    </label>
                    <div>
                      <input
                        className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-black transition-colors"
                        type="text"
                        value={walletAddress}
                        onChange={handleWalletAddressChange}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="font-bold text-sm mb-2 ml-1">
                      Amount
                    </label>
                    <div>
                      <input
                        className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-black transition-colors"
                        placeholder="1"
                        type="number"
                        value={creditAmount}
                        onChange={handleCreditChange}
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={handleWithdrawal}
                      className="block w-full max-w-xs mx-auto bg-black hover:bg-gray-900 focus:bg-gray-900 text-white rounded-lg px-3 py-3 font-semibold mt-10"
                    >
                      <i className="mdi mdi-lock-outline mr-1"></i> WITHDRAW NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
