import React, { useState, useEffect } from "react";
import PageMetadata from "@/components/PageMetadata";
import PrivacySettingsHeader from "../../components/UserSetting/PrivacySettingsHeader";
import ProfileSection from "../../components/UserSetting/ProfileSection";
import PasswordChangeModal from "../../components/UserSetting/PasswordChangeModal";
import axios from "axios";
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

    if (!me) {
      return {
        redirect: {
          destination: "/users/signin",
          permanent: false,
        },
      };
    }

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
    console.error("Error fetching user data:", error);
    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }
};

export default function SettingPage({ me }) {
  const [formData, setFormData] = useState({
    newUsername: me.username,
    email: me.email,
    address: me.address,
  });

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `${API_BASE_URL_CSR}/api/users/update-username`,
        {
          newUsername: formData.newUsername,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Response data:", response.data);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const openPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  return (
    <>
      <Layout me={me}></Layout>
      <PageMetadata title="Privacy Setting" />
      <div className="ml-[255px] mt-[65px] h-auto">
        <PrivacySettingsHeader />
        <div className="mx-[200px] my-8 shadow-md h-full">
          <div className="bg-white rounded-lg px-8 py-8">
            <div className="relative">
              <main>
                <div className="py-6">
                  <ProfileSection />
                  <form className="max-w-3xl mt-8" onSubmit={handleSubmit}>
                    <div className="space-y-8">
                      <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                        <div className="sm:mt-px sm:pt-2">
                          <label
                            htmlFor="newUsername"
                            className="block text-sm font-bold text-gray-900"
                          >
                            Username
                          </label>
                        </div>
                        <div className="mt-2 sm:mt-0 sm:col-span-2">
                          <div className="relative flex">
                            <input
                              type="text"
                              name="newUsername"
                              id="newUsername"
                              placeholder=""
                              value={formData.newUsername || ""}
                              onChange={handleInputChange}
                              className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                            />

                            <button
                              type="button"
                              className="text-sm font-semibold text-indigo-600 transition-all duration-200 bg-white rounded-md hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 absolute top-1/2 right-4 transform -translate-y-1/2"
                              onClick={handleSubmit}
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                        <label
                          htmlFor="email"
                          className="block text-sm font-bold text-gray-900 sm:mt-px sm:pt-2"
                        >
                          Email
                        </label>
                        <div className="mt-2 sm:mt-0 sm:col-span-2">
                          <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder=""
                            disabled
                            value={formData.email}
                            className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                          />
                        </div>
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-5 sm:items-start">
                        <label
                          htmlFor="address"
                          className="block text-sm font-bold text-gray-900 sm:mt-px sm:pt-2"
                        >
                          Wallet Address
                        </label>
                        <div className="mt-2 sm:mt-0 sm:col-span-2">
                          <input
                            type="text"
                            name="address"
                            id="address"
                            placeholder=""
                            disabled
                            value={formData.address}
                            className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 sm:mt-12">
                      {me.google_id === null && me.address === null && (
                        <button
                          type="button"
                          className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-500"
                          onClick={openPasswordModal}
                        >
                          CHANGE PASSWORD
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
      {me.google_id === null && me.address === null && (
        <PasswordChangeModal
          isOpen={isPasswordModalOpen}
          onClose={closePasswordModal}
        />
      )}
    </>
  );
}
