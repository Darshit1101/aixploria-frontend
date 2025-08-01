/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import API_BASE_URL from "../utils/api";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import AddGPT from "../Pages/AddGPT";
import { api } from "../../axiosApi";

const AddGPTCategory = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get(`/gpt-categories/getgptcategories`);
      setCategories(res.data);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch categories", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name.trim()) return;

      if (editingId) {
        await api.put(`/gpt-categories/updategptcategory/${editingId}`, {
          name,
        });
        Swal.fire("Updated!", "Category updated successfully.", "success");
      } else {
        await api.post(`/gpt-categories/addgptcategory`, { name });
        Swal.fire("Created!", "Category added successfully.", "success");
      }

      setName("");
      setEditingId(null);
      fetchCategories();
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Something went wrong.",
        "error"
      );
    }
  };

  const handleEdit = (category) => {
    setName(category.name);
    setEditingId(category.id);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This category will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await api.delete(`/gpt-categories/deletegptcategory${id}`);
        Swal.fire("Deleted!", "Category deleted successfully.", "success");
        fetchCategories();
      } catch (error) {
        Swal.fire("Error", "Failed to delete category.", "error");
      }
    }
  };

  return (
    <div className="font-[Poppins] px-4 py-8 mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 sm:p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {editingId ? "Edit GPT Category" : "Add GPT Category"}
        </h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl p-4 sm:p-6 rounded-2xl mb-8"
      >
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter category name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105 shadow-md"
        >
          {editingId ? "Update Category" : "Add Category"}
        </button>
      </form>

      {/* List */}
      <div className="bg-white shadow-xl p-4 sm:p-6 rounded-2xl">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
          All Categories
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm sm:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 font-semibold text-gray-700">#</th>
                <th className="py-3 px-4 font-semibold text-gray-700">Name</th>
                <th className="py-3 px-4 font-semibold text-gray-700 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="py-6 px-4 text-center text-gray-500"
                  >
                    No categories found.
                  </td>
                </tr>
              ) : (
                categories?.map((cat, index) => (
                  <tr
                    key={cat.id}
                    className="border-t hover:bg-gray-50 transition-all duration-200"
                  >
                    <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                    <td className="py-3 px-4 text-gray-900">{cat.name}</td>
                    <td className="py-3 px-4 text-right space-x-3">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
                      >
                        <FaRegEdit size={18} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
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

      {/* AddGPT Component */}
      <div className="mt-8">
        <AddGPT />
      </div>
    </div>
  );
};

export default AddGPTCategory;
