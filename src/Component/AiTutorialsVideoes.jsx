import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CardComponent from "./CardComponent";
import { api } from "axiosApi";

const AiTutorialsVideos = () => {
  const [categories, setCategories] = useState([]);
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchVideos();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get(`/video-categories/getvideocat`);
      setCategories([{ name: "All", id: 0 }, ...res.data]);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  const fetchVideos = async () => {
    try {
      const res = await api.get(`/videos/getallvideos`);
      setVideos(res.data);
    } catch (err) {
      console.error("Failed to load videos", err);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/video-search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleCategoryClick = (cat) => {
    navigate(`/video-search?q=category:${encodeURIComponent(cat)}`);
  };

  return (
    <div className="bg-black text-white font-[Poppins]">
      {/* Header & Search */}
      <div className="bg-[#191919] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          <button className="bg-gradient-to-b from-[#FB9E3C] to-[#E67802] text-white px-6 py-4 rounded-full font-medium">
            Beta Version
          </button>

          <form onSubmit={handleSearchSubmit} className="w-full sm:max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search over 5000+ AI..."
              className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-full bg-transparent border border-[#FF9D2D] text-sm sm:text-base placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>

          <button className="bg-gradient-to-b from-[#FB9E3C] to-[#E67802] text-white px-6 py-4 rounded-full font-medium">
            {videos.length} Tutorials
          </button>
        </div>
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-3 items-center justify-center overflow-x-auto px-4 py-6 sm:py-10">
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

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-12 pb-12">
        {videos.map((video) => (
          <CardComponent key={video.id} card={video} />
        ))}
      </div>
    </div>
  );
};

export default AiTutorialsVideos;
