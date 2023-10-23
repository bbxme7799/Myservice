import PageMetadata from "@/components/PageMetadata";
import axios from "axios";
import MainHeader from "@/components/layout/main-header";
import { useState, useEffect } from "react";

const API_BASE_URL = process.env.BACKEND_URL; // Add this line

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("th-TH", options);
};

export const getServerSideProps = async (context) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/me`, {
      // Use API_BASE_URL here
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

export default function BlogPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/blog`); // Use API_BASE_URL here
        setPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <PageMetadata title="Blog" />
      <MainHeader />
      <section className="py-12 mt-6 bg-gray-50 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center sm:flex sm:items-end sm:space-x-16 sm:text-left">
            <h2 className="max-w-xs text-3xl font-bold text-gray-900 sm:text-4xl shrink-0">
              บทความล่าสุด
            </h2>
          </div>
          {posts.length === 0 ? (
            <p className="text-center text-gray-500">
              No posts to display at the moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 px-8 mt-12 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:px-0">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex flex-col overflow-hidden transition-all duration-200 transform bg-white border border-gray-100 shadow group rounded-xl hover:shadow-lg hover:-translate-y-1"
                >
                  <a
                    href={`/blog/${encodeURIComponent(post.id)}`}
                    title=""
                    className="flex shrink-0 aspect-w-4 aspect-h-3"
                  >
                    <img
                      className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110"
                      src={post.imageUrl}
                      alt=""
                    />
                  </a>
                  <div className="flex-1 px-4 py-5 sm:p-6">
                    <a
                      href={`/blog/${encodeURIComponent(post.id)}`}
                      title=""
                      className=""
                    >
                      <p className="text-lg font-bold text-gray-900">
                        {post.title}
                      </p>
                      <p className="mt-3 text-sm font-normal leading-6 text-gray-500 line-clamp-3">
                        {post.description}
                      </p>
                    </a>
                  </div>
                  <div className="px-4 py-5 mt-auto border-t border-gray-100 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-gray-900">
                          <a
                            href={`/blog/${encodeURIComponent(post.id)}`}
                            title=""
                            className="line-clamp-3"
                          >
                            {post.content}
                          </a>
                        </p>
                        <span className="text-sm font-medium text-gray-900">
                          {" "}
                          •{" "}
                        </span>
                        <p className="text-sm font-medium text-gray-900">
                          {formatDate(post.createdAt)}
                        </p>
                      </div>
                      <a
                        href={`/blog/${encodeURIComponent(post.id)}`}
                        title=""
                        className=""
                        role="button"
                      >
                        <svg
                          className="w-5 h-5 text-gray-300 transition-all duration-200 group-hover:text-gray-900"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <line x1="17" y1="7" x2="7" y2="17"></line>
                          <polyline points="8 7 17 7 17 16"></polyline>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
