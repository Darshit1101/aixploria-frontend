/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import API_BASE_URL from "../utils/api";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { api } from "../../axiosApi";

const Blog = () => {
  const [form, setForm] = useState({
    title: "",
    image: "",
    description: "",
    link: "",
    subitems: [],
  });
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/blogs/getallblog`);
      const normalized = res.data.map((blog) => ({
        ...blog,
        id: blog._id || blog.id,
        subitems: Array.isArray(blog.subitems) ? blog.subitems : [],
      }));
      setBlogs(normalized);
    } catch (err) {
      setError("Failed to fetch blogs.");
      Swal.fire("Error", "Failed to fetch blogs.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubitemChange = (index, field, value) => {
    const updated = [...form.subitems];
    updated[index][field] = value;
    setForm({ ...form, subitems: updated });
  };

  const addSubitem = () => {
    setForm({
      ...form,
      subitems: [
        ...form.subitems,
        { title: "", image: "", description: "", link: "" },
      ],
    });
  };

  const removeSubitem = (index) => {
    const updated = [...form.subitems];
    updated.splice(index, 1);
    setForm({ ...form, subitems: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.image.trim() || !form.description.trim()) {
      Swal.fire(
        "Validation Error",
        "Title, image, and description are required.",
        "warning"
      );
      return;
    }
    try {
      if (editingId) {
        await api.put(`/blogs/updateblog/${editingId}`, form);
        Swal.fire("Success", "Blog updated successfully!", "success");
      } else {
        await api.post(`/blogs/addblog`, form);
        Swal.fire("Success", "Blog added successfully!", "success");
      }
      setForm({
        title: "",
        image: "",
        description: "",
        link: "",
        subitems: [],
      });
      setEditingId(null);
      fetchBlogs();
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to save blog.",
        "error"
      );
    }
  };

  const handleEdit = (blog) => {
    setEditingId(blog.id);
    setForm({
      title: blog.title,
      image: blog.image,
      description: blog.description,
      link: blog.link,
      subitems: Array.isArray(blog.subitems) ? blog.subitems : [],
    });
    Swal.fire("Edit Mode", "Edit your blog data.", "info");
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the blog and its subitems.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/blogs/deleteblog/${id}`);
        Swal.fire("Deleted!", "Blog deleted.", "success");
        fetchBlogs();
      } catch (err) {
        Swal.fire("Error", "Failed to delete blog.", "error");
      }
    }
  };

  return (
    <div className="font-[Poppins] px-4 py-8 mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 sm:p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {editingId ? "Edit Blog" : "Add New Blog"}
        </h1>
      </div>

      {/* Blog Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl p-4 sm:p-6 rounded-2xl mb-8"
      >
        <div className="space-y-4">
          <div>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Blog Title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
              required
            />
          </div>
          <div>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Main Image URL"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
              required
            />
          </div>
          <div>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Main Description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
              rows="4"
              required
            />
          </div>
          <div>
            <input
              name="link"
              value={form.link}
              onChange={handleChange}
              placeholder="Main Link"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
            />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              Sub Items
            </h3>
            {form.subitems.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 p-4 rounded-lg space-y-2 mb-2"
              >
                <input
                  value={item.title}
                  onChange={(e) =>
                    handleSubitemChange(index, "title", e.target.value)
                  }
                  placeholder="Sub Title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
                />
                <input
                  value={item.image}
                  onChange={(e) =>
                    handleSubitemChange(index, "image", e.target.value)
                  }
                  placeholder="Sub Image URL"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
                />
                <input
                  value={item.link}
                  onChange={(e) =>
                    handleSubitemChange(index, "link", e.target.value)
                  }
                  placeholder="Sub Link"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
                />
                <textarea
                  value={item.description}
                  onChange={(e) =>
                    handleSubitemChange(index, "description", e.target.value)
                  }
                  placeholder="Sub Description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
                  rows="3"
                />
                <button
                  type="button"
                  onClick={() => removeSubitem(index)}
                  className="text-red-600 hover:text-red-800 text-sm transition-colors"
                >
                  Remove Subitem
                </button>
              </div>
            ))}
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={addSubitem}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 hover:scale-105 shadow-md"
              >
                Add Subitem
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105 shadow-md"
              >
                {editingId ? (
                  <div className="flex items-center justify-center">
                    <IoSaveOutline className="mr-2" /> Update Blog
                  </div>
                ) : (
                  "Add Blog"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Blog Display */}
      <div className="bg-white shadow-xl p-4 sm:p-6 rounded-2xl">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
          All Blogs
        </h2>
        {loading ? (
          <p className="text-gray-500 text-center">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : blogs.length === 0 ? (
          <p className="text-gray-500 text-center">No blogs found.</p>
        ) : (
          <div className="space-y-6">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
              >
                <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {blog.title}
                </h4>
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full max-h-60 object-cover rounded-lg mb-2"
                  />
                )}
                <p className="text-gray-700 mb-2">{blog.description}</p>
                {blog.link && (
                  <a
                    href={blog.link}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit Main Link
                  </a>
                )}
                {Array.isArray(blog.subitems) && blog.subitems.length > 0 && (
                  <div className="mt-4">
                    <h5 className="font-semibold text-gray-900 mb-2">
                      Sub Items:
                    </h5>
                    {blog.subitems.map((sub, i) => (
                      <div
                        key={i}
                        className="mt-2 border-t border-gray-200 pt-2"
                      >
                        <h6 className="font-medium text-gray-900">
                          {sub.title}
                        </h6>
                        {sub.image && (
                          <img
                            src={sub.image}
                            alt={sub.title}
                            className="w-full max-h-40 object-cover rounded-lg mt-1"
                          />
                        )}
                        <p className="text-gray-700">{sub.description}</p>
                        {sub.link && (
                          <a
                            href={sub.link}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Visit Sub Link
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-4 flex flex-wrap gap-4">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="flex items-center gap-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all duration-200 hover:scale-105 shadow-md"
                  >
                    <FaRegEdit size={18} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="flex items-center gap-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 hover:scale-105 shadow-md"
                  >
                    <MdOutlineDeleteOutline size={20} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
