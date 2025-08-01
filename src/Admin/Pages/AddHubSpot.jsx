/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import API_BASE_URL from "../utils/api";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { FiUploadCloud } from "react-icons/fi";
import { api } from "../../axiosApi";

const AddHubspot = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    image: null,
  });
  const [options, setOptions] = useState([""]);
  const [hubspots, setHubspots] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetchHubspots();
  }, []);

  const fetchHubspots = async () => {
    try {
      const res = await api.get(`/hubspot/gethubspot`);
      setHubspots(res.data.data || []);
    } catch (error) {
      setHubspots([]);
      Swal.fire("Error", "No Data Found", "error");
    }
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setForm({ ...form, image: file });
    }
  };

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    const updated = options.filter((_, i) => i !== index);
    setOptions(updated.length ? updated : [""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate title, link, and image
    if (!form.title.trim() || !form.link.trim()) {
      Swal.fire(
        "Validation Error",
        "Title and link cannot be empty.",
        "warning"
      );
      return;
    }
    if (!form.image && !editingId) {
      Swal.fire("Validation Error", "Please select an image.", "warning");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("link", form.link);
      formData.append(
        "options",
        JSON.stringify(options.filter((opt) => opt.trim().length > 0))
      );
      if (form.image) {
        formData.append("image", form.image);
      }

      if (editingId) {
        await api.put(`/hubspot/updatehubspot/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        Swal.fire("Updated", "HubSpot Updated", "success");
      } else {
        await api.post(`/hubspot/addhubspot`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        Swal.fire("Success!", "HubSpot Added", "success");
      }

      setForm({ title: "", description: "", link: "", image: null });
      setOptions([""]);
      setPreview("");
      setEditingId(null);
      fetchHubspots();
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.error || "Something Went Wrong",
        "error"
      );
    }
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title,
      description: item.description,
      link: item.link,
      image: null, // Reset image to avoid sending old file
    });
    setOptions(item.options || [""]);
    setPreview(item.image ? `${API_BASE_URL}/${item.image}` : "");
    setEditingId(item.id);
    Swal.fire("Edit Mode", "Edit Your Data", "info");
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure you want to delete?",
      text: "This entry will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete!",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/hubspot/deletehubspot/${id}`);
        Swal.fire("Deleted!", "Entry deleted", "success");
        fetchHubspots();
      } catch (error) {
        Swal.fire("Error", "Error in deleting", "error");
      }
    }
  };

  return (
    <div className="font-[Poppins] px-4 py-8 mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 sm:p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {editingId ? "Edit Hubspot" : "Add Hubspot"}
        </h1>
      </div>

      {/* Add Hubspot Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl p-4 sm:p-6 rounded-2xl mb-8"
      >
        <div className="space-y-4">
          <div className="group relative h-64 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-400 transition-colors cursor-pointer">
            <input
              type="file"
              onChange={handleFileChange}
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              id="postFile"
              accept="image/*"
            />
            <label
              htmlFor="postFile"
              className="h-full flex flex-col items-center justify-center p-4"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <>
                  <FiUploadCloud className="w-12 h-12 text-gray-400 mb-3 group-hover:text-blue-500 transition-colors" />
                  <p className="text-gray-500 text-center">
                    <span className="text-blue-500 font-medium">
                      Upload Post Image
                    </span>
                    <br />
                    <span className="text-sm text-gray-400">
                      1600x900 recommended
                    </span>
                  </p>
                </>
              )}
            </label>
          </div>
          <div>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleFormChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
              required
            />
          </div>
          <div>
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleFormChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
              rows="4"
            />
          </div>
          <div>
            <input
              type="url"
              name="link"
              placeholder="Link"
              value={form.link}
              onChange={handleFormChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Options
            </label>
            {options.map((opt, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
                />
                {options.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="text-red-600 hover:text-red-800 font-bold transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="text-blue-600 hover:text-blue-800 text-sm mt-1 transition-colors"
            >
              + Add Option
            </button>
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105 shadow-md"
          >
            {editingId ? (
              <div className="flex items-center justify-center">
                <IoSaveOutline className="mr-2" /> Update Hubspot
              </div>
            ) : (
              "Add Hubspot"
            )}
          </button>
        </div>
      </form>

      {/* Hubspot List */}
      <div className="bg-white shadow-xl p-4 sm:p-6 rounded-2xl">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
          Hubspot List
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm sm:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 font-semibold text-gray-700">#</th>
                <th className="py-3 px-4 font-semibold text-gray-700">Image</th>
                <th className="py-3 px-4 font-semibold text-gray-700">Title</th>
                <th className="py-3 px-4 font-semibold text-gray-700">
                  Description
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700">Link</th>
                <th className="py-3 px-4 font-semibold text-gray-700">
                  Options
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {hubspots.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="py-6 px-4 text-center text-gray-500"
                  >
                    No hubspot entries found.
                  </td>
                </tr>
              ) : (
                hubspots?.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-t hover:bg-gray-50 transition-all duration-200"
                  >
                    <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                    <td className="py-3 px-4">
                      {item.image ? (
                        <img
                          src={`${API_BASE_URL}/${item.image}`}
                          alt={item.title}
                          className="w-16 h-16 object-contain rounded-lg"
                        />
                      ) : (
                        <span className="text-gray-500">No Image</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-900">{item.title}</td>
                    <td className="py-3 px-4 text-gray-900">
                      {item.description}
                    </td>
                    <td className="py-3 px-4">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        {item.link}
                      </a>
                    </td>
                    <td className="py-3 px-4">
                      <ul className="list-disc pl-4 text-sm text-gray-700">
                        {item?.options?.map((opt, idx) => (
                          <li key={idx}>{opt}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-3 px-4 text-right space-x-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <FaRegEdit size={18} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
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

export default AddHubspot;
