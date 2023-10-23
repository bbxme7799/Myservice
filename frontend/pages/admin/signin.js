import React from "react";
import SignInAdmin from "../../components/admin/SignInAdmin";
import axios from "axios";
const API_BASE_URL_SSR = process.env.BACKEND_URL_SSR;
const API_BASE_URL_CSR = process.env.BACKEND_URL_CSR;

export const getServerSideProps = async (context) => {
  try {
    let me = null;

    const response = await axios.get(`${API_BASE_URL_SSR}/api/users/me`, {
      headers: { cookie: context.req.headers.cookie },
      withCredentials: true,
    });

    if (response.status === 200) {
      me = response.data;
      console.log("user/me info => ", me);
      if (me) {
        if (me.role === 1) {
          return {
            redirect: {
              destination: "/admin",
              permanent: false,
            },
          };
        } else if (me.role === 0) {
          return {
            redirect: {
              destination: "/users",
              permanent: false,
            },
          };
        }
      }
    }

    return {
      props: {
        me,
      },
    };
  } catch (error) {
    return {
      props: {
        me: null,
      },
    };
  }
};

export default function LoginAdminPage({ me }) {
  return (
    <>
      <SignInAdmin />
    </>
  );
}
