/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import API_BASE_URL from "../utils/api";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { api } from "../../axiosApi";

const AddGPT = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    hashtags: "",
    link: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);
  const [gptList, setGptList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchGptList();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get(`/gpt-categories/getgptcategories`);
      setCategories(res.data);
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  };

  const fetchGptList = async () => {
    try {
      const res = await api.get(`/gpt/getallgpts`);
      setGptList(res.data);
    } catch (err) {
      console.error("Error loading GPT list:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.categoryId) {
      Swal.fire("Validation Error", "Please select a category.", "warning");
      return;
    }

    try {
      if (editingId) {
        await api.put(`/gpt/updategpt/${editingId}`, form);
        Swal.fire("Updated!", "GPT entry updated successfully.", "success");
      } else {
        await api.post(`/gpt/addgpt`, form);
        Swal.fire("Created!", "GPT entry added successfully.", "success");
      }

      setForm({
        title: "",
        description: "",
        hashtags: "",
        link: "",
        categoryId: "",
      });
      setEditingId(null);
      fetchGptList();
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Something went wrong.",
        "error"
      );
    }
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title,
      description: item.description,
      hashtags: item.hashtags,
      link: item.link,
      categoryId: item.categoryId,
    });
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This GPT entry will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await api.delete(`/gpt/deletegpt/${id}`);
        Swal.fire("Deleted!", "GPT entry deleted.", "success");
        fetchGptList();
      } catch (err) {
        Swal.fire("Error", "Failed to delete GPT entry.", "error");
      }
    }
  };

  return (
    <div className="font-[Poppins] px-4 py-8 mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 sm:p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {editingId ? "Edit GPT" : "Add GPT"}
        </h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl p-4 sm:p-6 rounded-2xl mb-10"
      >
        <div className="space-y-4">
          <div>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
              required
            />
          </div>
          <div>
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
              rows="4"
            />
          </div>
          <div>
            <input
              type="text"
              name="hashtags"
              placeholder="#hashtags (comma separated)"
              value={form.hashtags}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
            />
          </div>
          <div>
            <input
              type="text"
              name="link"
              placeholder="Link"
              value={form.link}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
            />
          </div>
          <div>
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105 shadow-md"
          >
            {editingId ? "Update GPT" : "Add GPT"}
          </button>
        </div>
      </form>

      {/* GPT List */}
      <div className="bg-white shadow-xl p-4 sm:p-6 rounded-2xl">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
          GPT List
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm sm:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 font-semibold text-gray-700">Title</th>
                <th className="py-3 px-4 font-semibold text-gray-700">
                  Category
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700">
                  Hashtags
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700">Link</th>
                <th className="py-3 px-4 font-semibold text-gray-700 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {gptList.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="py-6 px-4 text-center text-gray-500"
                  >
                    No GPT data available.
                  </td>
                </tr>
              ) : (
                gptList.map((gpt) => (
                  <tr
                    key={gpt.id}
                    className="border-t hover:bg-gray-50 transition-all duration-200"
                  >
                    <td className="py-3 px-4 text-gray-900">{gpt.title}</td>
                    <td className="py-3 px-4 text-gray-700">
                      {gpt.GPTCategory?.name || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-gray-700">{gpt.hashtags}</td>
                    <td className="py-3 px-4">
                      <a
                        href={gpt.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Visit
                      </a>
                    </td>
                    <td className="py-3 px-4 text-right space-x-3">
                      <button
                        onClick={() => handleEdit(gpt)}
                        className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
                      >
                        <FaRegEdit size={18} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(gpt.id)}
                        className="text-red-600 hover:text-red-800 transition-colors flex items-center gap-1"
                      >
                        <MdOutlineDeleteOutline size={20} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddGPT;
