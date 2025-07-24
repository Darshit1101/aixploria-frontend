"use client";
import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import FeaturedCard from "./FeaturedCard";
import axios from "axios";
import API_BASE_URL from "../Admin/utils/api";
import { useNavigate } from "react-router-dom";

const TopTools = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ category: "", premium: "" });
  const [isVerified, setIsVerified] = useState(false);
  const [recentTools, setRecentTools] = useState([]);

  const navigate = useNavigate();

  // Fetch categories and tools on mount
  useEffect(() => {
    fetchCategories();
    fetchRecentTools();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/categories`);
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  const fetchRecentTools = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/cards`);
      const verifiedTools = res.data
        .filter((tool) => tool.isVerified === true)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 8);
      setRecentTools(verifiedTools);
    } catch (err) {
      console.error("Failed to fetch tools:", err);
    }
  };

  const toggleVerified = () => setIsVerified((prev) => !prev);
  const clearSearch = () => setSearchQuery("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handlePremiumChange = (e) => {
    const selectedPremium = e.target.value;
    setForm((prev) => ({ ...prev, premium: selectedPremium }));
    navigate(`/premium/${selectedPremium}`);
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setForm((prev) => ({ ...prev, category: selectedCategory }));
    navigate(`/category/${selectedCategory}`);
  };

  return (
    <div className="bg-black w-full text-white">
      {/* Search & Filter */}
      <div className="w-full bg-[#191919] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          {/* Search */}
          <form
            onSubmit={handleSearchSubmit}
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

          {/* Verified Toggle */}
          <button
            onClick={toggleVerified}
            className={`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition ${
              isVerified
                ? "bg-[#FF9D2D] text-black"
                : "bg-[#FF9D2D]/30 text-white"
            }`}
          >
            Verified
          </button>

          {/* Premium Dropdown */}
          <select
            name="premium"
            value={form.premium}
            onChange={handlePremiumChange}
            className="w-full sm:w-64 px-4 py-2 sm:py-2.5 border border-[#FF9D2D] bg-black text-white rounded-full text-sm sm:text-base focus:ring-2 focus:ring-[#FF9D2D]/40 focus:outline-none"
          >
            <option value="">Select Premium Type</option>
            <option value="Free">Free</option>
            <option value="Premium">Premium</option>
            <option value="Freemium">Freemium</option>
          </select>

          {/* Category Dropdown */}
          <select
            name="category"
            value={form.category}
            onChange={handleCategoryChange}
            className="w-full sm:w-64 px-4 py-2 sm:py-2.5 border border-[#FF9D2D] bg-black text-white rounded-full text-sm sm:text-base focus:ring-2 focus:ring-[#FF9D2D]/40 focus:outline-none"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Recently Added Tools */}
      <div className="px-4 sm:px-6 lg:px-8 mt-10 max-w-7xl mx-auto">
        {/* <h2 className="text-xl font-semibold mb-4">Recently Added</h2> */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recentTools.map((tool) => (
            <FeaturedCard
              key={tool.id}
              name={tool.name}
              logo={
                tool.image.startsWith("http") || tool.image.startsWith("https")
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
  );
};

export default TopTools;
