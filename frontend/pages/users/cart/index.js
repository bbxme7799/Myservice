import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import CartProduct from "../../../components/cart/CartProduct";
import SubTotal from "../../../components/cart/SubTotal";
import CheckoutButton from "../../../components/cart/CheckoutButton";
import Layout from "@/components/layout/layout";

const API_BASE_URL_SSR = process.env.BACKEND_URL_SSR;
const API_BASE_URL_CSR = process.env.BACKEND_URL_CSR;


export const getServerSideProps = async (context) => {
  try {
    const response = await axios.get(`${API_BASE_URL_SSR}/api/users/me`, {
      headers: { cookie: context.req.headers.cookie },
      withCredentials: true,
    });

    const me = response.data;

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
  } catch (error) {
    return {
      redirect: {
        destination: "/users/signin",
        permanent: false,
      },
    };
  }
};

const CartPage = ({ me }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalSubtotal, setTotalSubtotal] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL_CSR}/api/carts`, {
          headers: { cookie: document.cookie },
          withCredentials: true,
        });

        setCartItems(response.data);
        setTotalItemCount(response.data.length);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    const calculateTotalSubtotal = () => {
      const newTotalSubtotal = cartItems.reduce((total, product) => {
        const itemSubtotal =
          ((product.product.rate * 1.5) / 1000) * product.quantity;
        return total + itemSubtotal;
      }, 0);

      setTotalSubtotal(newTotalSubtotal.toFixed(2));
    };

    calculateTotalSubtotal();
  }, [cartItems]);

  const handleCartItemChange = (changedProduct) => {
    setCartItems((prevItems) =>
      prevItems.map((product) =>
        product.id === changedProduct.id ? changedProduct : product
      )
    );
  };

  const handleCartItemDelete = (deletedProduct) => {
    setCartItems((prevItems) =>
      prevItems.filter((product) => product.id !== deletedProduct.id)
    );
  };

  const handleCheckout = () => {
    Swal.fire({
      title: "ยืนยันที่จะสั่งซื้อ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        proceedWithCheckout();
      }
    });
  };

  const proceedWithCheckout = async () => {
    try {
      const userId = me.id;
      const apiUrl = `${API_BASE_URL_CSR}/api/orders/${userId}`;

      const requestData = {
        cartItems,
        totalSubtotal: totalSubtotal,
      };

      const response = await axios.post(apiUrl, requestData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log("Order placed successfully!");
        setCartItems([]); // Clear cart items after successful order
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <>
      <Layout me={me}></Layout>
      <div className="ml-[255px] mt-[65px]">
        <div className="bg-white my-2">
          <div className="flex mx-2 py-2">
            <h1 className="font-bold text-lg">Cart :</h1>
            <p className="text-lg pl-2">ตะกร้าสินค้า</p>
          </div>
        </div>
      </div>
      <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-xl">
          <div className="flex items-center justify-between md:flex-row">
            <h1 className="text-base md:text-xl lg:text-2xl font-bold text-gray-900">
              Shopping Cart
            </h1>
            <span className="px-2 py-1 ml-4 text-xs font-bold tracking-widest uppercase bg-gray-400 rounded-full rounded-r-nonepy-1 text-gray-50">
              {" "}
              {totalItemCount} Items{" "}
            </span>
          </div>

          <div className="max-w-3xl mx-auto mt-8 md:mt-12">
            <div className="overflow-hidden bg-white shadow rounded-xl">
              <div className="px-4 py-6 sm:px-8 sm:py-10">
                <div className="flow-root">
                  <ul className="divide-y divide-gray-200 -my-4 md:-my-7">
                    {cartItems.map((product) => (
                      <CartProduct
                        key={product.id}
                        product={product}
                        onDelete={handleCartItemDelete}
                        onChange={handleCartItemChange}
                      />
                    ))}
                  </ul>
                </div>

                <hr className="border-gray-200 my-4 md:my-7" />

                <div className="flex items-center justify-between mt-6">
                  <p className="text-lg font-medium text-gray-900">ราคารวม</p>
                  <p className="text-lg font-bold text-gray-900">
                    {totalSubtotal} THB
                  </p>
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={handleCheckout}
                    className="inline-flex items-center justify-center w-full px-6 py-4 text-sm font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartPage;
