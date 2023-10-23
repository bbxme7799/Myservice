import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import PageMetadata from "@/components/PageMetadata";
import MainHeader from "@/components/layout/main-header";
const API_BASE_URL = process.env.BACKEND_URL;
export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await axios.get(`${API_BASE_URL}/api/blog/${id}`);
          setPost(response.data);
        }
      } catch (error) {
        setError("Error fetching post");
      }
    };

    fetchData();
  }, [id]);

  const formatCreatedAt = (createdAt) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(createdAt).toLocaleDateString(undefined, options);
  };

  return (
    <>
      {error && <p>Error: {error}</p>}
      {post && (
        <>
          <PageMetadata title={post.title} />
          <MainHeader />
          <section className="py-12 mt-6 bg-gray-50 sm:py-16 lg:py-20">
            <main className="mt-10">
              <div className="mb-4 md:mb-0 w-full mx-auto relative">
                <div className="px-4 lg:px-0">
                  <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
                    {post.title}
                  </h2>
                  <a
                    href="#"
                    className="py-2 text-green-700 inline-flex items-center justify-center mb-2"
                  >
                    {formatCreatedAt(post.createdAt)}
                  </a>
                </div>

                <img
                  src={post.imageUrl}
                  className="w-full object-cover lg:rounded"
                  style={{ height: "28em" }}
                />
              </div>
              <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
                {/* Use dangerouslySetInnerHTML to render HTML content */}
                <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
              </div>
            </main>
          </section>
        </>
      )}
    </>
  );
}
