import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../Admin/utils/api";
import CardComponent from "../Component/CardComponent";

const VideoSearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("q") || "";
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchVideos();
    fetchCategories();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/videos`);
      setVideos(res.data);
    } catch (err) {
      console.error("Error fetching videos", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/video-categories`);
      setCategories([{ name: "All", id: 0 }, ...res.data]);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  const filteredVideos = videos.filter((video) => {
    if (!query) return true;
    if (query.startsWith("category:")) {
      const cat = query.split("category:")[1];
      return video.category?.toLowerCase() === cat.toLowerCase();
    }
    const term = query.toLowerCase();
    return (
      video.title?.toLowerCase().includes(term) ||
      video.description?.toLowerCase().includes(term) ||
      video.hashtags?.some((tag) => tag.toLowerCase().includes(term))
    );
  });

  const handleCategoryClick = (catName) => {
    const newQuery = catName === "All" ? "" : `category:${catName}`;
    navigate(`/video-search?q=${encodeURIComponent(newQuery)}`);
  };

  return (
    <div className="bg-black text-white font-[Poppins] min-h-screen px-4 sm:px-6 lg:px-12 py-8">
      <h1 className="text-2xl font-semibold mb-6">
        Showing results for:{" "}
        <span className="text-[#FB9E3C]">
          {query === "" ? "All Videos" : query}
        </span>
      </h1>

      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.name)}
            className="px-6 py-2.5 rounded-full text-sm whitespace-nowrap transition bg-black border-2 border-[#767676] text-[#767676] hover:bg-gradient-to-b hover:from-[#FB9E3C] hover:to-[#E67802] hover:text-white"
          >
            {cat.name}
          </button>
        ))}
      </div>

      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <CardComponent key={video.id} card={video} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-20">No videos found.</p>
      )}
    </div>
  );
};

export default VideoSearchResults;
