/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { api } from "axiosApi";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  // Fetch categories on load
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get(`/categories/getallcategories`);
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories", error);
      Swal.fire("Error", "Failed to fetch categories.", "error");
    }
  };

  // Add new category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name.trim()) {
        Swal.fire(
          "Validation Error",
          "Category name cannot be empty.",
          "warning"
        );
        return;
      }
      const res = await api.post(`/categories/add-category`, { name });
      Swal.fire("Success", res.data.message || "Category added!", "success");
      setName("");
      fetchCategories();
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the category.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/categories/delete-category/${id}`);
        Swal.fire("Deleted!", "Category deleted.", "success");
        fetchCategories();
      } catch (error) {
        Swal.fire("Error", "Failed to delete category.", "error");
      }
    }
  };

  // Edit category
  const handleEdit = (id, name) => {
    setEditingId(id);
    setEditingName(name);
  };

  const handleUpdate = async (id) => {
    try {
      if (!editingName.trim()) {
        Swal.fire(
          "Validation Error",
          "Category name cannot be empty.",
          "warning"
        );
        return;
      }
      await api.put(`/categories/update-category/${id}`, { name: editingName });
      Swal.fire("Updated!", "Category updated.", "success");
      setEditingId(null);
      setEditingName("");
      fetchCategories();
    } catch (error) {
      Swal.fire("Error", "Update failed.", "error");
    }
  };

  return (
    <div className="font-[Poppins] px-4 py-8 mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 sm:p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {editingId ? "Edit Category" : "Add Category"}
        </h1>
      </div>

      {/* Add Category Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl p-4 sm:p-6 rounded-2xl mb-8"
      >
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105 shadow-md"
          >
            Add Category
          </button>
        </div>
      </form>

      {/* Category List */}
      <div className="bg-white shadow-xl p-4 sm:p-6 rounded-2xl">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
          Category List
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
                categories.map((cat, index) => (
                  <tr
                    key={cat.id}
                    className="border-t hover:bg-gray-50 transition-all duration-200"
                  >
                    <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                    <td className="py-3 px-4 text-gray-900">
                      {editingId === cat.id ? (
                        <input
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
                        />
                      ) : (
                        cat.name
                      )}
                    </td>
                    <td className="py-3 px-4 text-right space-x-3">
                      {editingId === cat.id ? (
                        <button
                          onClick={() => handleUpdate(cat.id)}
                          className="flex items-center gap-1 text-green-600 hover:text-green-800 transition-colors"
                        >
                          <IoSaveOutline size={20} />
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(cat.id, cat.name)}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <FaRegEdit size={18} />
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-800 transition-colors"
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

export default AddCategory;
