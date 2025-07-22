import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import API_BASE_URL from '../utils/api';
import { FaRegEdit } from 'react-icons/fa';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { IoSaveOutline } from 'react-icons/io5';

const NewsManager = () => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [newsList, setNewsList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingLink, setEditingLink] = useState('');

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/news`);
      setNewsList(res.data);
    } catch (err) {
      console.error('Error fetching news:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/news`, { title, link });
      Swal.fire('Success', 'News added successfully!', 'success');
      setTitle('');
      setLink('');
      fetchNews();
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Something went wrong', 'error');
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will delete the news article.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_BASE_URL}/api/news/${id}`);
        Swal.fire('Deleted!', 'News deleted.', 'success');
        fetchNews();
      } catch (err) {
        Swal.fire('Error', 'Failed to delete news.', 'error');
      }
    }
  };

  const handleEdit = (news) => {
    setEditingId(news.id);
    setEditingTitle(news.title);
    setEditingLink(news.link);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/api/news/${id}`, {
        title: editingTitle,
        link: editingLink,
      });
      Swal.fire('Updated!', 'News updated.', 'success');
      setEditingId(null);
      setEditingTitle('');
      setEditingLink('');
      fetchNews();
    } catch (err) {
      Swal.fire('Error', 'Update failed.', 'error');
    }
  };

  return (
    <div className="font-[Poppins]">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">News Manager</h1>

      <div className="max-w-7xl p-6 bg-white shadow rounded mb-10">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="News Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded mb-4"
            required
          />
          <input
            type="url"
            placeholder="News Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded mb-4"
            required
          />
          <button
            type="submit"
            className="w-[300px] bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
          >
            Add News
          </button>
        </form>
      </div>

      <div className="max-w-7xl bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">News List</h2>
        <table className="w-full table-auto border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Link</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {newsList.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No news articles found.
                </td>
              </tr>
            ) : (
              newsList.map((item, index) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    {editingId === item.id ? (
                      <input
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      item.title
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingId === item.id ? (
                      <input
                        value={editingLink}
                        onChange={(e) => setEditingLink(e.target.value)}
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {item.link}
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-2 text-right">
                    <div className="flex justify-end space-x-2">
                      {editingId === item.id ? (
                        <button
                          onClick={() => handleUpdate(item.id)}
                          className="flex items-center bg-green-600 text-white px-2 py-1 rounded-full hover:bg-green-700"
                        >
                          <IoSaveOutline className="mr-1" />
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(item)}
                          className="flex items-center bg-blue-600 text-white px-2 py-1 rounded-full hover:bg-blue-700"
                        >
                          <FaRegEdit className="mr-1" />
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex items-center bg-red-600 text-white px-2 py-1 rounded-full hover:bg-red-700"
                      >
                        <MdOutlineDeleteOutline className="mr-1" />
                        Delete
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

export default NewsManager;
