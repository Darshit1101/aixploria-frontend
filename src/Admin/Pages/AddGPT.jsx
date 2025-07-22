import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import API_BASE_URL from '../utils/api';

const AddGPT = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    hashtags: '',
    link: '',
    categoryId: '',
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
      const res = await axios.get(`${API_BASE_URL}/api/gpt-categories`);
      setCategories(res.data);
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  };

  const fetchGptList = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/gpt`);
      setGptList(res.data);
    } catch (err) {
      console.error('Error loading GPT list:', err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.categoryId) {
      Swal.fire('Validation Error', 'Please select a category.', 'warning');
      return;
    }

    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/gpt/${editingId}`, form);
        Swal.fire('Updated!', 'GPT entry updated successfully.', 'success');
      } else {
        await axios.post(`${API_BASE_URL}/api/gpt`, form);
        Swal.fire('Created!', 'GPT entry added successfully.', 'success');
      }

      setForm({
        title: '',
        description: '',
        hashtags: '',
        link: '',
        categoryId: '',
      });
      setEditingId(null);
      fetchGptList();
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Something went wrong.', 'error');
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
      title: 'Are you sure?',
      text: 'This GPT entry will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${API_BASE_URL}/api/gpt/${id}`);
        Swal.fire('Deleted!', 'GPT entry deleted.', 'success');
        fetchGptList();
      } catch (err) {
        Swal.fire('Error', 'Failed to delete GPT entry.', 'error');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto font-[Poppins] px-4 py-6">
      
      <h1 className="text-2xl font-bold mb-4">{editingId ? 'Edit GPT' : 'Add GPT'}</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded p-6 mb-10">
        <input 
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded mb-4"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded mb-4"
        />
        <input
          type="text"
          name="hashtags"
          placeholder="#hashtags (comma separated)"
          value={form.hashtags}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded mb-4"
        />
        <input
          type="text"
          name="link"
          placeholder="Link"
          value={form.link}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded mb-4"
        />

        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded mb-4"
          required
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          {editingId ? 'Update GPT' : 'Add GPT'}
        </button>
      </form>

      {/* GPT List */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">GPT List</h2>
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Hashtags</th>
              <th className="p-2 text-left">Link</th>
              <th className="p-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {gptList.map((gpt) => (
              <tr key={gpt.id} className="border-t">
                <td className="p-2">{gpt.title}</td>
                <td className="p-2">{gpt.GPTCategory?.name || 'N/A'}</td>
                <td className="p-2">{gpt.hashtags}</td>
                <td className="p-2">
                  <a href={gpt.link} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                    Visit
                  </a>
                </td>
                <td className="p-2 text-right">
                  <button
                    onClick={() => handleEdit(gpt)}
                    className="text-sm text-blue-600 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(gpt.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {gptList.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No GPT data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddGPT;
