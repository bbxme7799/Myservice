import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import busdIcon from "../icons/binance-usd-busd-logo.png";

const API_BASE_URL = process.env.BACKEND_URL; // Added API_BASE_URL

const Navbar = ({ me }) => {
  const [usdToThbRate, setUsdToThbRate] = useState(null);
  const [usdBalance, setUsdBalance] = useState(null);

  useEffect(() => {
    // Fetch USD to THB exchange rate from the API
    const fetchUsdToThbRate = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/usd`); // Use API_BASE_URL
        setUsdToThbRate(response.data.rate);
      } catch (error) {
        console.error("Error fetching USD to THB exchange rate:", error);
      }
    };

    fetchUsdToThbRate();
  }, []);

  useEffect(() => {
    // Calculate USD balance when the exchange rate or THB balance changes
    if (usdToThbRate !== null && me.balance !== undefined) {
      const usdEquivalent = me.balance / parseFloat(usdToThbRate[0]?.rate); // Convert rate to a number
      setUsdBalance(usdEquivalent.toFixed(2)); // Round to 2 decimal places
    }
  }, [usdToThbRate, me.balance]);

  const renderBalance = () => {
    if (usdBalance !== null) {
      return (
        <span className="font-semibold">
          {parseFloat(me.balance).toFixed(2)} ({usdBalance}
          <Image
            src={busdIcon}
            alt="BUSD Icon"
            className="inline-block w-4 h-4 ml-1"
          />
          )
        </span>
      );
    } else {
      return <span>Loading...</span>;
    }
  };

  return (
    <nav className="shadow bg-white fixed w-full z-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-[63px]">
          <div className="flex-shrink-0 flex items-center">
            {/* Your logo image */}
            {/* <Image
              className="hidden lg:block h-8 w-auto"
              src="/logo.svg"
              alt="Logo"
            /> */}
          </div>
          <div className="flex items-center">
            <div className="ml-3 relative">
              <div>
                <Link href="/users/cart">
                  <button
                    className="max-w-xs flex items-center text-sm rounded-full focus:outline-none"
                    id="cart-menu"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Cart Menu</span>
                    <FaShoppingCart className="h-5 w-5 text-gray-600" />
                  </button>
                </Link>
              </div>
            </div>
            <div className="ml-3 relative">
              <button
                className="max-w-xs flex items-center text-sm rounded-full focus:outline-none"
                id="balance-menu"
                aria-haspopup="true"
              >
                {renderBalance()}
              </button>
            </div>
            <div className="ml-3 relative">
              {/* Your logo image for small screens */}
              {/* <Image
                className="block lg:hidden h-8 w-auto"
                src="/logo.svg"
                alt="Logo"
              /> */}
              <span className="hidden md:flex bg-black text-white text-sm px-3 py-4 rounded-xl mr-2 items-center w-[fit-content]">
                <span className="flex-grow">
                  {me.address ? (
                    <>{me.address.substring(0, 10)}...</>
                  ) : (
                    <>{me.username || "Hi"}</>
                  )}
                </span>
              </span>

              {/* <img
                className="object-cover w-10 h-10 rounded-md"
                src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/images/avatar-square/avatar-square.png"
                alt=""
              /> */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
