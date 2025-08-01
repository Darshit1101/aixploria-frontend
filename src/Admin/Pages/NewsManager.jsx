/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import API_BASE_URL from '../utils/api';
import { FaRegEdit } from 'react-icons/fa';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { IoSaveOutline } from 'react-icons/io5';
import { api } from 'axiosApi';

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
      const res = await api.get(`/news/getAllNews`);
      setNewsList(res.data);
    } catch (err) {
      console.error('Error fetching news:', err);
      Swal.fire('Error', 'Failed to fetch news.', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !link.trim()) {
      Swal.fire('Validation Error', 'Title and link cannot be empty.', 'warning');
      return;
    }
    try {
      await api.post(`/news/createNews`, { title, link });
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
        await api.delete(`/news/deleteNews/${id}`);
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
    if (!editingTitle.trim() || !editingLink.trim()) {
      Swal.fire('Validation Error', 'Title and link cannot be empty.', 'warning');
      return;
    }
    try {
      await api.put(`/news/updateNews/${id}`, { title: editingTitle, link: editingLink });
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
    <div className="font-[Poppins] px-4 py-8 mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 sm:p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {editingId ? 'Edit News' : 'News Manager'}
        </h1>
      </div>

      {/* Add News Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl p-4 sm:p-6 rounded-2xl mb-8"
      >
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="News Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
              required
            />
          </div>
          <div>
            <input
              type="url"
              placeholder="News Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105 shadow-md"
          >
            Add News
          </button>
        </div>
      </form>

      {/* News List */}
      <div className="bg-white shadow-xl p-4 sm:p-6 rounded-2xl">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
          News List
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm sm:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 font-semibold text-gray-700">#</th>
                <th className="py-3 px-4 font-semibold text-gray-700">Title</th>
                <th className="py-3 px-4 font-semibold text-gray-700">Link</th>
                <th className="py-3 px-4 font-semibold text-gray-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {newsList.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="py-6 px-4 text-center text-gray-500"
                  >
                    No news articles found.
                  </td>
                </tr>
              ) : (
                newsList.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-t hover:bg-gray-50 transition-all duration-200"
                  >
                    <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                    <td className="py-3 px-4 text-gray-900">
                      {editingId === item.id ? (
                        <input
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
                        />
                      ) : (
                        item.title
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-900">
                      {editingId === item.id ? (
                        <input
                          value={editingLink}
                          onChange={(e) => setEditingLink(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
                        />
                      ) : (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          {item.link}
                        </a>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right space-x-3">
                      {editingId === item.id ? (
                        <button
                          onClick={() => handleUpdate(item.id)}
                          className="flex items-center gap-1 text-green-600 hover:text-green-800 transition-colors"
                        >
                          <IoSaveOutline size={20} />
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(item)}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <FaRegEdit size={18} />
                          Edit
                        </button>
                      )}
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

export default NewsManager;