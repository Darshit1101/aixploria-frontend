import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "axiosApi";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/blogs/getallblog`)
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs?.map((blog) => (
        <div
          key={blog.id}
          className="bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
          onClick={() => navigate(`/blogs/${blog.id}`)}
        >
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <p className="text-sm text-gray-600">{blog.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
