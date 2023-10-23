import React from "react";
import ResetPasswordForm from "../../components/forgotpassword/ResetPasswordForm";
// import axios from "axios";
import MainHeader from "@/components/layout/main-header";

// export const getServerSideProps = async (context) => {
//   try {
//     const API_BASE_URL = process.env.BACKEND_URL;
//     const response = await axios.get(`${API_BASE_URL}/api/users/me`, {
//       headers: { cookie: context.req.headers.cookie },
//       withCredentials: true,
//     });

//     if (response.status === 200) {
//       const me = response.data;
//       console.log("user/me info => ", me);

//       if (me) {
//         return {
//           redirect: {
//             destination: "/users",
//             permanent: false,
//           },
//         };
//       }
//     }

//     return {
//       props: {
//         me: null,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching user info: ", error);
//     return {
//       props: {
//         me: null,
//       },
//     };
//   }
// };

const LoginPage = ({ me }) => (
  <>
    <MainHeader />
    <ResetPasswordForm />
  </>
);

export default LoginPage;
