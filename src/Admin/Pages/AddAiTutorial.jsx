// src/pages/AddVideo.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import API_BASE_URL from '../utils/api';
import VideoList from '../Components/VideoList';
import { api } from "axiosApi";

const AddVideo = () => {
  const [form, setForm] = useState({
    category: '',
    title: '',
    length: '',
    youtubeLink: '',
    hashtags: '',
  });

  const [videos, setVideos] = useState([]);
  const [videoCategories, setVideoCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchVideos();
    fetchCategories();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/videos`);
      setVideos(res.data);
    } catch (err) {
      console.error('Failed to load videos', err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/video-categories`);
      setVideoCategories(res.data);
    } catch (err) {
      console.error('Failed to load video categories', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const resetForm = () => {
    setForm({
      category: '',
      title: '',
      length: '',
      youtubeLink: '',
      hashtags: '',
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      hashtags: form.hashtags.split(',').map((tag) => tag.trim()),
    };

    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/videos/${editingId}`, payload);
        Swal.fire('Success', 'Video updated!', 'success');
      } else {
        await axios.post(`${API_BASE_URL}/api/videos`, payload);
        Swal.fire('Success', 'Video added!', 'success');
      }

      fetchVideos();
      resetForm();
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Something went wrong', 'error');
    }
  };

  const handleEdit = (video) => {
    setForm({
      category: video.category,
      title: video.title,
      length: video.length,
      youtubeLink: video.youtubeLink,
      hashtags: video.hashtags.join(','),
    });
    setEditingId(video.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/videos/${id}`);
        Swal.fire('Deleted', 'Video removed.', 'success');
        fetchVideos();
      } catch (err) {
        Swal.fire('Error', 'Failed to delete video', 'error');
      }
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        {editingId ? 'Edit Video' : 'Add Video'}
      </h1>

      <div className="max-w-7xl mt-10 font-[Poppins]">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Dropdown */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          >
            <option value="" disabled>Select a category</option>
            {videoCategories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Other Inputs */}
          <input
            name="title"
            placeholder="Video Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />

          <input
            name="length"
            placeholder="Length (e.g., 5:30)"
            value={form.length}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />

          <input
            name="youtubeLink"
            placeholder="YouTube Link"
            value={form.youtubeLink}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />

          <input
            name="hashtags"
            placeholder="Hashtags (comma separated) ex: vlog, travel"
            value={form.hashtags}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="w-[20%] bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {editingId ? 'Update Video' : 'Add Video'}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="w-[20%] bg-gray-500 text-white py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div> 
        </form> 

        <div className="mt-10">
          <VideoList videos={videos} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
    </>
  );
};

export default AddVideo;
