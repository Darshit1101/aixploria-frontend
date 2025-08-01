import React, { useState, useRef, useEffect } from "react";
import { Search, Settings, ChevronDown, X } from "lucide-react";
import axios from "axios";
import API_BASE_URL from "../Admin/utils/api";
import FeaturedCard from "./FeaturedCard";

const NewAi = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isVerified, setIsVerified] = useState(true);
  const [tools, setTools] = useState([]);
  const [categories, setCategories] = useState(["All Categories"]);

  const dropdownRef = useRef(null);

  // Fetch tools and categories on initial load
  useEffect(() => {
    fetchTools();
    fetchCategories();
  }, []);

  const fetchTools = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/cards`);
      const newTools = res.data.filter((tool) => tool.isNew === true);
      // setTools(newTools);
      setTools(res.data)
    } catch (err) {
      console.error("Failed to fetch tools", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/categories`);
      // Assuming response is array of { id, name }
      const catList = res.data.map((cat) => cat.name);
      setCategories(["All Categories", ...catList]);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Optional: search logic can be implemented here
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const toggleVerified = () => {
    setIsVerified(!isVerified);
  };

  // Filtered tools based on selected category
  const filteredTools = tools?.filter((tool) => {
    const matchesCategory =
      selectedCategory === "All Categories" ||
      tool.category?.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesVerified = isVerified ? tool.isVerified : true;

    return matchesCategory && matchesSearch && matchesVerified;
  });

  return (
    <div className="bg-black w-full text-white">
      {/* Search & Filter */}
      <div className="w-full">
        <div className="flex p-5 bg-[#191919] flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="w-full sm:w-auto flex-1 relative"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search over 5000+ AI..."
                className="w-full sm:w-[380px] pl-10 pr-10 py-2 sm:py-2.5 rounded-full bg-transparent border border-[#FF9D2D] text-sm sm:text-base placeholder-gray-400 focus:ring-2 focus:ring-[#FF9D2D]/40 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </form>

          {/* Verified Filter */}
          <button
            onClick={toggleVerified}
            className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition bg-[#FF9D2D] text-black"
          >
            Verified
            <Settings className="w-5 h-5" />
          </button>

          {/* Category Dropdown */}
          <div className="relative w-full sm:w-64" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between w-full px-4 py-2 sm:py-2.5 border border-[#FF9D2D] rounded-full text-white text-sm sm:text-base"
            >
              <span className="truncate">{selectedCategory}</span>
              <ChevronDown className="w-5 h-5 ml-2" />
            </button>
            {isDropdownOpen && (
              <div className="absolute z-20 mt-2 w-full max-h-60 overflow-y-auto bg-black border border-[#FF9D2D] rounded-lg shadow-xl">
                {categories?.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category)}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-800 text-sm"
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Grid of Tools */}
        <div className="px-4 sm:px-6 lg:px-8 mt-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredTools?.map((tool) => (
              <FeaturedCard
                key={tool.id}
                name={tool.name}
                logo={
                  tool.image.startsWith("http") ||
                  tool.image.startsWith("https")
                    ? tool.image
                    : `https://${tool.image}`
                }
                description={tool.description}
                ranking={tool.views}
                verified={tool.verified}
                websiteUrl={
                  tool.visitlink?.startsWith("http")
                    ? tool.visitlink
                    : `https://${tool.visitlink}`
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAi;
