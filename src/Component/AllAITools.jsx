import { useEffect, useState, useRef } from "react";
import { ChevronUp } from "lucide-react";
import { IoMdStar } from "react-icons/io";
import API_BASE_URL from "../Admin/utils/api";
import axios from "axios";

export default function AllAITools() {
  const [tools, setTools] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleItems, setVisibleItems] = useState(8);
  const containerRef = useRef(null);

  // Fetch all categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/categories`);
        const fetchedCategories = res.data.map((cat) => cat.name);
        setCategories(["All", ...fetchedCategories]); // Include "All" as the first option
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch all tools from API
  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/cards`);
        const fetchedTools = res.data.map((tool) => ({
          id: tool.id,
          name: tool.name,
          createdAt: tool.createdAt || new Date().toISOString().split("T")[0],
          category: tool.category,
          visitlink: tool.visitlink,
          description: tool.description || "No description available",
          image: tool.image,
          isVerified: tool.isVerified || false,
          isFeatured: tool.isFeatured || false,
          isNew: tool.isNew || false,
        }));
        setTools(fetchedTools);
      } catch (error) {
        console.error("Error fetching tools", error);
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

  const filteredTools =
    activeCategory === "All"
      ? tools
      : tools.filter((tool) => tool.category === activeCategory);

  return (
    <div className="relative w-full bg-black py-16 px-4 sm:px-6 lg:px-8 overflow-hidden text-white">
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-[#FA9021] text-3xl md:text-4xl font-bold text-center mb-8">
          ALL AI TOOLS
        </h2>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
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
          {categories.length === 0 && (
            <div className="text-center text-[#888] py-4">
              No categories available.
            </div>
          )}
        </div>

        {/* Tools Grid */}
        <div
          ref={containerRef}
          className="bg-[#1A1A1A] rounded-xl p-4 sm:p-6 mb-8 max-h-[500px] overflow-y-auto custom-scroll"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.slice(0, visibleItems).map((tool) => (
              <div
                key={tool.id}
                className="bg-[#222222] border border-[#333333] rounded-lg p-4 hover:bg-[#2A2A2A] transition-colors"
              >
                <div className="flex items-center mb-2">
                  {tool.image && (
                    <img
                      src={
                        tool.image.startsWith("http") ||
                        tool.image.startsWith("https")
                          ? tool.image
                          : `https://${tool.image}`
                      }
                      alt={`${tool.name} logo`}
                      className="w-12 h-12 object-cover rounded mr-3"
                    />
                  )}
                  <div>
                    <div className="text-sm text-[#767676] font-medium">
                      {new Date(tool.createdAt).toLocaleDateString()} |{" "}
                      <IoMdStar className="inline ml-1 mr-1 text-[#FA9021]" />{" "}
                      {tool.name}
                    </div>
                    <div className="text-xs text-[#888]">{tool.category}</div>
                  </div>
                </div>
                <p className="text-sm text-[#767676] mb-3 line-clamp-2">
                  {tool.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    {tool.isVerified && (
                      <span className="text-xs text-[#FA9021] bg-[#333333] px-2 py-1 rounded">
                        Verified
                      </span>
                    )}
                    {tool.isFeatured && (
                      <span className="text-xs text-[#FA9021] bg-[#333333] px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                    {tool.isNew && (
                      <span className="text-xs text-[#FA9021] bg-[#333333] px-2 py-1 rounded">
                        New
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => redirectToUrl(tool.visitlink)}
                    className="text-[#FA9021] hover:text-white border border-[#333333] rounded-[8px] p-1 transition-colors"
                  >
                    <ChevronUp className="text-[#767676]" size={16} />
                  </button>
                </div>
              </div>
            ))}
            {filteredTools.length === 0 && (
              <div className="text-center text-[#888] py-4 col-span-full">
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
              LOAD MORE
            </button>
          </div>
        )}

        {/* Responsive Styles and Custom Scrollbar */}
        <style jsx>{`
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
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          @media (max-width: 640px) {
            .grid {
              grid-template-columns: 1fr;
            }
          }
          @media (min-width: 641px) and (max-width: 1024px) {
            .grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (min-width: 1025px) {
            .grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
