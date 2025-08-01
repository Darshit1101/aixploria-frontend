/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import VideoList from "../Components/VideoList";
import { api } from "axiosApi";

const AddVideo = () => {
  const [form, setForm] = useState({
    category: "",
    title: "",
    length: "",
    youtubeLink: "",
    hashtags: "",
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
      const res = await api.get(`/videos/getallvideos`);
      setVideos(res.data);
    } catch (err) {
      console.error("Failed to load videos", err);
      Swal.fire("Error", "Failed to fetch videos.", "error");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get(`/video-categories/getvideocat`);
      setVideoCategories(res.data);
    } catch (err) {
      console.error("Failed to load video categories", err);
      Swal.fire("Error", "Failed to fetch video categories.", "error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const resetForm = () => {
    setForm({
      category: "",
      title: "",
      length: "",
      youtubeLink: "",
      hashtags: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.category.trim() ||
      !form.title.trim() ||
      !form.length.trim() ||
      !form.youtubeLink.trim()
    ) {
      Swal.fire(
        "Validation Error",
        "All required fields must be filled.",
        "warning"
      );
      return;
    }
    const payload = {
      ...form,
      hashtags: form.hashtags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    };

    try {
      if (editingId) {
        await api.put(`/videos/updatevideo/${editingId}`, payload);
        Swal.fire("Success", "Video updated!", "success");
      } else {
        await api.post(`/addvideo`, payload);
        Swal.fire("Success", "Video added!", "success");
      }

      fetchVideos();
      resetForm();
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  const handleEdit = (video) => {
    setForm({
      category: video.category,
      title: video.title,
      length: video.length,
      youtubeLink: video.youtubeLink,
      hashtags: video.hashtags.join(","),
    });
    setEditingId(video.id);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the video.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/videos/deletevideo/${id}`);
        Swal.fire("Deleted", "Video removed.", "success");
        fetchVideos();
      } catch (err) {
        Swal.fire("Error", "Failed to delete video", "error");
      }
    }
  };

  return (
    <div className="font-[Poppins] px-4 py-8 mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 sm:p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {editingId ? "Edit Video" : "Add Video"}
        </h1>
      </div>

      {/* Add Video Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl p-4 sm:p-6 rounded-2xl mb-8"
      >
        <div className="space-y-4">
          <div>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {videoCategories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <input
              name="title"
              placeholder="Video Title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
              required
            />
          </div>
          <div>
            <input
              name="length"
              placeholder="Length (e.g., 5:30)"
              value={form.length}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
              required
            />
          </div>
          <div>
            <input
              name="youtubeLink"
              placeholder="YouTube Link"
              value={form.youtubeLink}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
              required
            />
          </div>
          <div>
            <input
              name="hashtags"
              placeholder="Hashtags (comma separated, e.g., vlog, travel)"
              value={form.hashtags}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50 focus:ring-2 focus:ring-gray-600 transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105 shadow-md"
            >
              {editingId ? "Update Video" : "Add Video"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="w-full sm:w-auto bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-all duration-200 hover:scale-105 shadow-md"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Video List */}
      <div className="bg-white shadow-xl p-4 sm:p-6 rounded-2xl">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
          Video List
        </h2>
        <VideoList
          videos={videos}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default AddVideo;
