import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import API_BASE_URL from '../utils/api';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";

const AddHubspot = () => {
  const [form, setForm] = useState({ title: '', description: '', link: '' });
  const [options, setOptions] = useState(['']);
  const [hubspots, setHubspots] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchHubspots();
  }, []);

  const fetchHubspots = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/hubspot`);
      setHubspots(res.data);
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch data', 'error');
    }
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index) => {
    const updated = options.filter((_, i) => i !== index);
    setOptions(updated.length ? updated : ['']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/hubspot/${editingId}`, {
          ...form,
          options,
        });
        Swal.fire('Updated!', 'Hubspot entry has been updated.', 'success');
      } else {
        await axios.post(`${API_BASE_URL}/api/hubspot`, {
          ...form,
          options,
        });
        Swal.fire('Success', 'Hubspot entry added successfully.', 'success');
      }

      setForm({ title: '', description: '', link: '' });
      setOptions(['']);
      setEditingId(null);
      fetchHubspots();
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'Something went wrong.', 'error');
    }
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title || '',
      description: item.description || '',
      link: item.link || '',
    });

    const parsedOptions = Array.isArray(item.options)
      ? item.options
      : typeof item.options === 'string'
      ? [item.options]
      : [''];

    setOptions(parsedOptions);
    setEditingId(item._id || item.id);

    Swal.fire('Edit Mode', 'You are now editing this entry.', 'info');
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This entry will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_BASE_URL}/api/hubspot/${id}`);
        Swal.fire('Deleted!', 'Entry has been deleted.', 'success');
        fetchHubspots();
      } catch (error) {
        Swal.fire('Error', 'Failed to delete entry.', 'error');
      }
    }
  };

  return (
    <div className="font-[Poppins]">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        {editingId ? 'Edit Hubspot' : 'Add Hubspot'}
      </h1>

      {/* Form */}
      <div className="max-w-7xl p-6 bg-white shadow rounded mb-10">
        <form onSubmit={handleSubmit}>
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
            <label className="block mb-2 font-medium">Paragraphs (Options)</label>
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
                    &times;
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
            {editingId ? 'Update Hubspot' : 'Add Hubspot'}
          </button>
        </form>
      </div>

      {/* List */}
      <div className="max-w-7xl bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Hubspot List</h2>
        <table className="w-full table-auto border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">#</th>
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
                <td colSpan="6" className="text-center py-4">No hubspot data found.</td>
              </tr>
            ) : (
              hubspots.map((item, index) => (
                <tr key={item._id || item.id} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">{item.description}</td>
                  <td className="px-4 py-2">
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      {item.link}
                    </a>
                  </td>
                  <td className="px-4 py-2">
                    <ul className="list-disc pl-4 text-sm text-gray-700">
                      {(Array.isArray(item.options) ? item.options : []).map((opt, idx) => (
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
                        onClick={() => handleDelete(item._id || item.id)}
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
