import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../Admin/utils/api";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!blog) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/" className="text-blue-500 underline mb-4 inline-block">← Back to Blogs</Link>

      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover rounded mb-4" />
      <p className="text-gray-700 mb-6">{blog.description}</p>
      {blog.link && (
        <a href={blog.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          Visit Main Link
        </a>
      )}

      <h2 className="text-2xl font-semibold mt-8 mb-4">Subitems</h2>
      {Array.isArray(blog.subitems) && blog.subitems.length > 0 ? (
        blog.subitems.map((item, idx) => (
          <div key={idx} className="border rounded p-4 mb-4 bg-gray-50">
            {item.image && <img src={item.image} alt={item.title} className="w-full h-40 object-cover mb-3 rounded" />}
            <h3 className="text-lg font-bold">{item.title}</h3>
            <p className="text-gray-600 mb-2">{item.description}</p>
            {item.link && (
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                Visit Sub Link
              </a>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No subitems available.</p>
      )}
    </div>
  );
};

export default BlogDetail;
