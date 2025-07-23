import React, { useEffect, useState } from "react";
import axios from "axios";

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
      const res = await axios.get("http://localhost:5000/api/blogs");
      const normalized = res.data.map((blog) => ({
        ...blog,
        id: blog._id || blog.id,
        subitems: Array.isArray(blog.subitems) ? blog.subitems : [],
      }));
      setBlogs(normalized);
    } catch (err) {
      setError("Failed to fetch blogs.");
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
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/blogs/${editingId}`, form);
      } else {
        await axios.post("http://localhost:5000/api/blogs", form);
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
      alert("Failed to save blog.");
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
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      fetchBlogs();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {editingId ? "Edit Blog" : "Add New Blog"}
      </h2>

      {/* Blog Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow"
      >
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Blog Title"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Main Image URL"
          className="w-full px-4 py-2 border rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Main Description"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          name="link"
          value={form.link}
          onChange={handleChange}
          placeholder="Main Link"
          className="w-full px-4 py-2 border rounded"
        />

        <h3 className="text-lg font-semibold mt-6">Sub Items</h3>
        {form.subitems.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50 border p-4 rounded space-y-2 mb-2"
          >
            <input
              value={item.title}
              onChange={(e) =>
                handleSubitemChange(index, "title", e.target.value)
              }
              placeholder="Sub Title"
              className="w-full px-3 py-1 border rounded"
            />
            <input
              value={item.image}
              onChange={(e) =>
                handleSubitemChange(index, "image", e.target.value)
              }
              placeholder="Sub Image URL"
              className="w-full px-3 py-1 border rounded"
            />
            <input
              value={item.link}
              onChange={(e) =>
                handleSubitemChange(index, "link", e.target.value)
              }
              placeholder="Sub Link"
              className="w-full px-3 py-1 border rounded"
            />
            <textarea
              value={item.description}
              onChange={(e) =>
                handleSubitemChange(index, "description", e.target.value)
              }
              placeholder="Sub Description"
              className="w-full px-3 py-1 border rounded"
            />
            <button
              type="button"
              onClick={() => removeSubitem(index)}
              className="text-sm text-red-500 hover:underline"
            >
              Remove Subitem
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addSubitem}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Subitem
        </button>
        <button
          type="submit"
          className="ml-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {editingId ? "Update Blog" : "Add Blog"}
        </button>
      </form>

      {/* Blog Display */}
      <h3 className="text-xl font-bold mt-10 mb-4">All Blogs</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog.id}
            className="border rounded p-4 mb-6 bg-white shadow-sm"
          >
            <h4 className="text-lg font-semibold mb-1">{blog.title}</h4>
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full max-h-60 object-cover mb-2 rounded"
            />
            <p className="mb-1">{blog.description}</p>
            <a
              href={blog.link}
              className="text-blue-600 underline"
              target="_blank"
              rel="noreferrer"
            >
              Visit Main Link
            </a>

            {Array.isArray(blog.subitems) && blog.subitems.length > 0 && (
              <div className="mt-4">
                <h5 className="font-semibold">Sub Items:</h5>
                {blog.subitems.map((sub, i) => (
                  <div key={i} className="mt-2 border-t pt-2">
                    <h6 className="font-medium">{sub.title}</h6>
                    {sub.image && (
                      <img
                        src={sub.image}
                        alt={sub.title}
                        className="w-full max-h-40 object-cover rounded mt-1"
                      />
                    )}
                    <p>{sub.description}</p>
                    <a
                      href={sub.link}
                      className="text-blue-500 underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visit Sub Link
                    </a>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 space-x-2">
              <button
                onClick={() => handleEdit(blog)}
                className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog.id)}
                className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Blog;
