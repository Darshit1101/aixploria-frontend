import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../utils/api";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/blogs`);
        setBlogs(res.data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleToggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  if (loading) return <p className="text-center mt-10">Loading blogs...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 space-y-6">
      {blogs.map((blog) => (
        <div
          key={blog.id || blog._id}
          className="border p-4 rounded shadow bg-white hover:shadow-md transition cursor-pointer"
          onClick={() => handleToggle(blog.id || blog._id)}
        >
          {/* Main Blog Info */}
          <div className="flex items-start">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-32 h-20 object-cover rounded mr-4"
            />
            <div>
              <h2 className="text-xl font-bold">{blog.title}</h2>
              <p className="text-gray-600 text-sm">{blog.description}</p>
              <a
                href={blog.link}
                onClick={(e) => e.stopPropagation()}
                className="text-blue-600 text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Main Link
              </a>
            </div>
          </div>

          {/* Subitems on Click */}
          {expandedId === (blog.id || blog._id) && Array.isArray(blog.subitems) && blog.subitems.length > 0 && (
            <div className="mt-4 border-t pt-4 space-y-3">
              {blog.subitems.map((sub, idx) => (
                <div key={idx} className="flex gap-3">
                  {sub.image && (
                    <img
                      src={sub.image}
                      alt={sub.title}
                      className="w-20 h-14 object-cover rounded"
                    />
                  )}
                  <div>
                    <h4 className="font-semibold">{sub.title}</h4>
                    <p className="text-sm text-gray-700">{sub.description}</p>
                    {sub.link && (
                      <a
                        href={sub.link}
                        className="text-blue-500 text-xs"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Visit Subitem Link
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BlogList;
