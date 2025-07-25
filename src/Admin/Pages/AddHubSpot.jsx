/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import API_BASE_URL from "../utils/api";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { FiUploadCloud } from "react-icons/fi";

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
      const res = await axios.get(`${API_BASE_URL}/api/hubspot`);
      console.log(res.data.data, "dataaa");
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
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("link", form.link);
      formData.append(
        "options",
        options.filter((opt) => opt.trim().length > 0)
      );
      if (form.image) {
        formData.append("image", form.image);
      }

      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/hubspot/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        Swal.fire("Updated", "HubSpot Updated", "success");
      } else {
        await axios.post(`${API_BASE_URL}/api/hubspot`, formData, {
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
        await axios.delete(`${API_BASE_URL}/api/hubspot/${id}`);
        Swal.fire("Deleted!", "Entry deleted", "success");
        fetchHubspots();
      } catch (error) {
        Swal.fire("Error", "Error in deleting", "error");
      }
    }
  };

  return (
    <div className="font-[Poppins] p-4 md:p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        {editingId ? "Edit Hubspot" : "Add Hubspot"}
      </h1>

      <div className="max-w-7xl p-6 bg-white shadow rounded mb-10">
        <form onSubmit={handleSubmit}>
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
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleFormChange}
            className="w-full border px-4 py-2 rounded mb-4"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleFormChange}
            className="w-full border px-4 py-2 rounded mb-4"
          />
          <input
            type="text"
            name="link"
            placeholder="Link"
            value={form.link}
            onChange={handleFormChange}
            className="w-full border px-4 py-2 rounded mb-4"
          />

          <div className="mb-4">
            <label className="block mb-2 font-medium">Options</label>
            {options.map((opt, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="flex-1 border px-4 py-2 rounded"
                />
                {options.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="text-red-500 font-bold"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="text-blue-600 hover:underline text-sm mt-1"
            >
              + Add Option
            </button>
          </div>

          <button
            type="submit"
            className="w-[300px] bg-orange-500 text-white py-2 rounded hover:bg-blue-700"
          >
            {editingId ? (
              <div className="flex items-center justify-center">
                <IoSaveOutline className="mr-2" /> Update Hubspot
              </div>
            ) : (
              "Add Hubspot"
            )}
          </button>
        </form>
      </div>

      <div className="max-w-7xl bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Hubspot List</h2>
        <table className="w-full table-auto border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Link</th>
              <th className="px-4 py-2 text-left">Options</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hubspots.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  Koi data nahi hai.
                </td>
              </tr>
            ) : (
              hubspots?.map((item, index) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    {item.image ? (
                      <img
                        src={`${API_BASE_URL}/${item.image}`}
                        alt={item.title}
                        className="w-16 h-16 object-contain rounded"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">{item.description}</td>
                  <td className="px-4 py-2">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {item.link}
                    </a>
                  </td>
                  <td className="px-4 py-2">
                    <ul className="list-disc pl-4 text-sm text-gray-700">
                      {item?.options?.map((opt, idx) => (
                        <li key={idx}>{opt}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="flex items-center bg-blue-600 text-white px-2 py-1 rounded-full hover:underline"
                      >
                        <FaRegEdit className="mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex items-center bg-red-600 text-white px-2 py-1 rounded-full hover:underline"
                      >
                        <MdOutlineDeleteOutline className="mr-1" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddHubspot;
