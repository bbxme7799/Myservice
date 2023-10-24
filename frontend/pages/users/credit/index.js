import React from "react";
import { useState } from "react";
import PageMetadata from "@/components/PageMetadata";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Layout from "@/components/layout/layout";
import Web3 from "web3";
import CONTRACT_ABI from "../../../contract/busd-abi.json";
import Image from "next/image";
import Metamaskiconlogin from "../../../components/icons/Metamaskiconlogin.png";


const API_BASE_URL_SSR = process.env.BACKEND_URL_SSR;
const API_BASE_URL_CSR = process.env.BACKEND_URL_CSR;

export const getServerSideProps = async (context) => {
  const me = await axios
    .get(`${API_BASE_URL_SSR}/api/users/me`, {
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

export default function CreditPage({ me }) {
  const [creditAmount, setCreditAmount] = useState("");

  const handleCreditChange = (e) => {
    setCreditAmount(e.target.value);
  };

  const CONTRACT_ADDRESS = process.env.CONTRACT_BUSD_ADDRESS;
  const recipientAddress = process.env.RECIPIENT_ADDRESS;

  const ethereumNodeUrl = "https://getblock.io/nodes/bsc/?gclid=CjwKCAjwgsqoBhBNEiwAwe5w04Zf4x0I59mkeYbhHWihBSDRnfwSuxMnWT_OCG2e6GxqC_bv3sXCOhoCeNUQAvD_BwE";
  const web3 = new Web3(ethereumNodeUrl);
  console.log("web3" ,web3)

  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

  function convertToWei(price) {
    return "0x" + Number(price * 1e18).toString(16);
  }

  const handletopup = async (amount) => {
    try {
      if (!amount) {
        toast.error("โปรดกรอกข้อมูล input ให้ครบถ้วนก่อนที่จะชำระ", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return; // หยุดการทำงานถ้า creditAmount ว่างเปล่า
      }
      if (isNaN(amount) || Number(amount) < 1) {
        toast.error("โปรดกรอกจำนวนเงินมากกว่าหรือเท่ากับ 1", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const selectedAddress = accounts[0];
      console.log("selectedAddress:", selectedAddress);

      const gasEstimate = await window.ethereum.request({
        method: "eth_estimateGas",
        params: [
          {
            from: selectedAddress,
            to: CONTRACT_ADDRESS,
            data: contract.methods
              .transfer(recipientAddress, convertToWei(amount))
              .encodeABI(),
          },
        ],
      });

      const gasPriceEstimate = await window.ethereum.request({
        method: "eth_gasPrice",
      });
      console.log("gasEstimate =>", gasEstimate);
      console.log("gasPriceEstimate =>", gasPriceEstimate);

      // สร้างทรานแซ็คชั่น Ethereum สำหรับการโอน BUSD
      let result = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: selectedAddress,
            to: CONTRACT_ADDRESS,
            chainId: 97,
            data: contract.methods
              .transfer(
                "0x81C23828DB9d3cCb12a477CD756B64a16720c93f",
                convertToWei(amount)
              )
              .encodeABI(),
            gas: gasEstimate, // ปรับค่า gas limit ตามที่ต้องการ
            gasPrice: gasPriceEstimate, // ปรับค่า gas price ตามที่ต้องการ
          },
        ],
      });
      console.log("Transaction Result:", result);

      // แก้ URL ของ API เป็น URL ของเว็บเซิร์ฟเวอร์ของคุณ
      const response = await axios.post(
        `${API_BASE_URL_CSR}/api/topup`,
        {
          txHash: result,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Response:", response);
    } catch (error) {
      console.error("Error with Metamask:", error);
      toast.error("เกิดข้อผิดพลาดในการทำธุรกรรม", {
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
      <PageMetadata title="Add" />
      <Layout me={me}></Layout>
      <div className="ml-[255px] mt-[65px] h-auto">
        <div className="bg-white my-[2px] ">
          <div className="flex mx-2 py-2">
            <h1 className="font-bold text-lg">Add credit:</h1>
            <p className="text-lg pl-2">เติมเครดิต</p>
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
                      Add credit
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
                          alt="Metamask Login Icon"
                          className="w-8 h-8 mr-4"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="font-bold text-sm mb-2 ml-1">
                      Address transfer
                    </label>
                    <div>
                      <input
                        className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-black transition-colors"
                        value="0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee"
                        type="text"
                        disabled
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
                      onClick={() => handletopup(creditAmount)}
                      className="block w-full max-w-xs mx-auto bg-black hover:bg-gray-900 focus:bg-gray-900 text-white rounded-lg px-3 py-3 font-semibold mt-10"
                    >
                      <i className="mdi mdi-lock-outline mr-1"></i> PAY NOW
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
