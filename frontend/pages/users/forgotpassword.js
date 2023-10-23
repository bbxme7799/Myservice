import React from "react";
import ForgotPasswordForm from "../../components/forgotpassword/ForgotPasswordForm";
import axios from "axios";
import MainHeader from "@/components/layout/main-header";

// export const getServerSideProps = async (context) => {
//   const API_BASE_URL = process.env.BACKEND_URL;
//   const me = await axios
//     .get(`${API_BASE_URL}/api/users/me`, {
//       headers: { cookie: context.req.headers.cookie },
//       withCredentials: true,
//     })
//     .then((response) => response.data)
//     .catch(() => null);

//   console.log("user/me info => ", me);

//   if (!me) {
//     return {
//       redirect: {
//         destination: "/users/signin",
//         permanent: false,
//       },
//     };
//   }

//   // Check if the user is banned
//   if (me.is_banned) {
//     return {
//       redirect: {
//         destination: "/suspended",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       me,
//     },
//   };
// };

export default function ForgotpasswordPage({ me }) {
  return (
    <>
      <MainHeader />
      <ForgotPasswordForm />
    </>
  );
}
