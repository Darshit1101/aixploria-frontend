import React, { useState, useMemo } from 'react';

const VideoList = ({ videos, onEdit, onDelete }) => {
  const [sortBy, setSortBy] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  // Get unique categories for filter dropdown
  const categories = useMemo(() => {
    const unique = new Set(videos.map((v) => v.category));
    return [...unique];
  }, [videos]);

  // Filter + sort logic
  const filteredVideos = useMemo(() => {
    let result = [...videos];

    if (filterCategory) {
      result = result.filter((video) => video.category === filterCategory);
    }

    if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'length') {
      result.sort((a, b) => {
        const [minA, secA] = a.length.split(':').map(Number);
        const [minB, secB] = b.length.split(':').map(Number);
        return (minA * 60 + secA) - (minB * 60 + secB);
      });
    }

    return result;
  }, [videos, sortBy, filterCategory]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div>
          <label className="mr-2">Filter by Category:</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mr-2">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">None</option>
            <option value="title">Title (A–Z)</option>
            <option value="length">Length (Shortest → Longest)</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {filteredVideos.length === 0 ? (
        <p className="text-gray-500">No videos found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="border rounded-lg shadow p-4 bg-white flex flex-col justify-between"
            >
              <div>
                <h2 className="font-bold text-xl mb-1">{video.title}</h2>
                <p className="text-sm text-gray-600 mb-1">Category: {video.category}</p>
                <p className="text-sm text-gray-600 mb-1">Length: {video.length}</p>
                <a
                  href={video.youtubeLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline text-sm"
                >
                  Watch on YouTube
                </a>
                <p className="text-sm mt-2">
                  <span className="font-semibold">Hashtags:</span>{' '}
                  {video.hashtags.join(', ')}
                </p>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => onEdit(video)}
                  className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(video.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoList;
