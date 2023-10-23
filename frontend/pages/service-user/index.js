import Table from "@/components/serviceTable/Table";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.css"; // core css
import PageMetadata from "@/components/PageMetadata";
import MainHeader from "@/components/layout/main-header";
import axios from "axios";
import { useState, useEffect } from "react";
import SearchInput from "@/components/serviceTable/SearchInput";

const API_BASE_URL = process.env.BACKEND_URL; // Add this line

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("th-TH", options);
};

export const getServerSideProps = async (context) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/me`, {
      headers: { cookie: context.req.headers.cookie },
      withCredentials: true,
    });

    if (response.status === 200) {
      const me = response.data;
      console.log("user/me info => ", me);

      if (me) {
        return {
          redirect: {
            destination: "/users",
            permanent: false,
          },
        };
      }
    }

    return {
      props: {
        me: null,
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

export default function SerivceUserPage({ me }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [apiData, setApiData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = `${API_BASE_URL}/api/products?page=${currentPage}&per_page=20`;

        if (searchQuery) {
          apiUrl += `&keyword=${encodeURIComponent(searchQuery)}`;
        }

        const response = await axios.get(apiUrl);

        const newData = response.data.data;

        // Set data from the current page
        setApiData(newData);
        setTotalPages(response.data.total_page);
      } catch (error) {
        console.error("Error fetching API data: ", error);
      }
    };

    fetchData();
  }, [currentPage, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <PageMetadata title="Service" />
      <MainHeader />

      <section className="py-12 mt-6 bg-white sm:py-16 lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
              บริการในระบบ
            </h2>
          </div>

          <div className="max-w-8xl mx-auto mt-8 sm:mt-14">
            <div className="space-y-4">
              {apiData.length > 0 ? (
                <div>
                  <SearchInput value={searchQuery} onSearch={handleSearch} />
                  <Table
                    products={apiData}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              ) : (
                <p className="text-center text-gray-500">
                  No services to display at the moment.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
