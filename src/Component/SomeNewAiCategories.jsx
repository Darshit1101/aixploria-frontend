"use client";
import { useEffect, useState, useRef } from "react";
import { ChevronUp } from "lucide-react";
import { IoMdStar } from "react-icons/io";
import API_BASE_URL from "../Admin/utils/api"; // Import API base URL for consistency
import axios from "axios";
import { Link } from "react-router-dom";

export default function SomeAICategories() {
  const [tools, setTools] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [visibleItems, setVisibleItems] = useState(8);
  const containerRef = useRef(null);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/categories/getsomecategories`
        );
        const fetchedCategories = res.data.map((cat) => cat.name);
        console.log(res.data, "res");

        setCategories(fetchedCategories);
        // Set the first category as active if categories are fetched
        if (fetchedCategories.length > 0) {
          setActiveCategory(fetchedCategories[0]);
        }
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch tools from API
  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/cards`);
        const fetchedTools = res.data.map((tool) => ({
          id: tool.id,
          name: tool.name,
          createdAt: tool.createdAt || new Date().toISOString().split("T")[0], // Fallback to current date if not provided
          category: tool.category,
          visitlink: tool.visitlink,
        }));
        setTools(fetchedTools);
      } catch (error) {
        console.error("Error fetching tools", error);
        // Fallback to empty array to avoid breaking the UI
        setTools([]);
      }
    };
    fetchTools();
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setVisibleItems(8);
    if (containerRef.current) containerRef.current.scrollTop = 0;
  };

  const loadMore = () => {
    setVisibleItems((prev) => Math.min(prev + 8, filteredTools.length));
  };

  const redirectToUrl = (url) => {
    window.open(url, "_blank");
  };

  const filteredTools = tools.filter(
    (tool) => tool.category === activeCategory
  );

  return (
    <div className="relative w-full bg-black py-16 px-4 md:px-8 overflow-hidden text-white">
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-[#FA9021] text-3xl md:text-4xl font-bold text-center mb-8">
          SOME AI CATEGORIES
        </h2>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories?.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className={`px-6 py-2 rounded-full transition-colors cursor-pointer text-sm md:text-base ${
                activeCategory === category
                  ? "bg-gradient-to-r from-[#E67802] to-[#FB9E3C] text-white font-medium"
                  : "bg-[#222222] border-2 border-[#FF9D2D] text-[#767676] hover:bg-[#333333]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tool List */}
        <div
          ref={containerRef}
          className="bg-[#1A1A1A] rounded-xl p-4 md:p-6 mb-8 max-h-[500px] overflow-y-auto custom-scroll"
        >
          <div className="grid grid-cols-1 gap-2">
            {filteredTools.slice(0, visibleItems).map((tool) => (
              <div
                key={tool.id}
                className="flex justify-between items-center bg-[#222222] border border-[#333333] rounded-lg px-4 py-2 hover:bg-[#2A2A2A] transition-colors"
              >
                {/* Tool Info */}
                <div className="text-sm flex items-center text-[#767676] font-medium">
                  {new Date(tool.createdAt).toLocaleDateString()} |{" "}
                  <IoMdStar className="ml-1 mr-1 text-[#FA9021]" /> {tool.name}
                </div>
                {/* Redirect Icon */}
                <button
                  onClick={() => redirectToUrl(tool.visitlink)}
                  className="text-[#FA9021] hover:text-white border border-[#333333] rounded-[8px] p-1 transition-colors"
                >
                  <ChevronUp className="text-[#767676]" size={16} />
                </button>
              </div>
            ))}
            {filteredTools.length === 0 && (
              <div className="text-center text-[#888] py-4">
                No tools available in this category.
              </div>
            )}
          </div>
        </div>

        {/* Load More Button */}
        {visibleItems < filteredTools.length && (
          <div className="flex justify-center mb-8">
            <button
              onClick={loadMore}
              className="bg-gradient-to-b from-[#E67802] to-[#FB9E3C] hover:from-transparent hover:to-transparent border border-[#FA9021] text-white font-medium px-8 py-2 rounded-full transition-colors"
            >
              MORE AI LIST
            </button>
          </div>
        )}
        <div className="flex justify-center">
          <Link
            to="/all-ai-tools"
            className="bg-gradient-to-b from-[#E67802] to-[#FB9E3C] hover:from-transparent hover:to-transparent border border-[#FA9021] text-white font-medium px-8 py-2 rounded-full transition-colors"
          >
            SHOW MORE
          </Link>
        </div>
      </div>

      {/* Custom Scrollbar */}
      <style>{`
        .custom-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: #fa9021;
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scroll {
          scrollbar-width: thin;
          scrollbar-color: #fa9021 transparent;
        }
      `}</style>
    </div>
  );
}
