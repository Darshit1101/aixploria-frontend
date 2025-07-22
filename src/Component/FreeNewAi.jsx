import React, { useState, useRef, useEffect } from "react";
import { Search, Settings, ChevronDown, X } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../Admin/utils/api";
import FeaturedCard from "./FeaturedCard";

const NewAi = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [tools, setTools] = useState([]);
  const [categories, setCategories] = useState(["All Categories"]);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTools();
    fetchCategories();
  }, []);

  const fetchTools = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/cards`);
      setTools(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/categories`);
      setCategories(["All Categories", ...res.data.map(c => c.name)]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = e => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleCategorySelect = category => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
    if (category !== "All Categories") navigate(`/category/${encodeURIComponent(category)}`);
  };

  const clearSearch = () => setSearchQuery("");

  const filtered = tools.filter(tool =>
    tool.premiumtype === "Free" && tool.isVerified
  );

  return (
    <div className="bg-black text-white">
      <div className="flex p-5 bg-[#191919] gap-4 sm:flex-row flex-col">
        <form onSubmit={handleSearch} className="relative flex-1 sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search over 5000+ AI..."
            className="pl-10 pr-10 py-2 rounded-full bg-transparent border border-[#FF9D2D] w-full sm:w-[380px]"
          />
          {searchQuery && (
            <button type="button" onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          )}
        </form>

        <div className="relative sm:w-64 w-full" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex justify-between items-center w-full px-4 py-2 border border-[#FF9D2D] rounded-full"
          >
            {selectedCategory}
            <ChevronDown className="w-5 h-5" />
          </button>
          {isDropdownOpen && (
            <div className="absolute mt-2 w-full bg-black border border-[#FF9D2D] rounded-lg z-20">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className="block w-full px-4 py-2 hover:bg-gray-800 text-left"
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.slice(0, 8).map(tool => (
            <FeaturedCard key={tool.id} {...tool} free={tool.premiumtype === "Free"} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewAi;
