"use client";
import { useEffect, useState, useRef } from "react";
import { ChevronUp } from "lucide-react";
import { IoMdStar } from "react-icons/io";
import API_BASE_URL from "../Admin/utils/api";

const categories = ["Latest AI", "AI Exploria Selection", "Super Tools"];

export default function SomeNewAiCategories() {
  const [tools, setTools] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Latest AI");
  const [visibleItems, setVisibleItems] = useState(8);
  const containerRef = useRef(null);

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/cards`);
        const data = await response.json();
        setTools(data);
      } catch (error) {
        console.error("Failed to fetch tools:", error);
      }
    }

    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setVisibleItems(8);
    if (containerRef.current) containerRef.current.scrollTop = 0;
  };

  const loadMore = () => {
    setVisibleItems((prev) =>
      Math.min(prev + 8, filteredTools.length)
    );
  };

  const redirectToUrl = (url) => {
    window.open(url, "_blank");
  };

  const filteredTools = tools.filter(
    (tool) => tool.category === activeCategory
  );

  return (
    <div className="relative w-full bg-black py-16 px-4 md:px-8 overflow-hidden">
      {/* Background AI text */}
      <div className="absolute inset-0 flex justify-center items-center z-0 pointer-events-none">
        <h1 className="text-[200px] md:text-[300px] font-black text-white/50 leading-none select-none">
          AI
        </h1>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-[#FA9021] text-3xl md:text-4xl font-bold text-center mb-8">
          SOME AI CATEGORIES
        </h2>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-8 py-3 rounded-full transition-colors cursor-pointer text-sm md:text-base ${activeCategory === category
                  ? "bg-gradient-to-r from-[#E67802] to-[#FB9E3C] text-white font-[400]"
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
          <div className="grid grid-cols-1 gap-3">
            {filteredTools.slice(0, visibleItems).map((tool) => (
              <div
                key={tool.id}
                className="flex justify-between items-center bg-[#222222] border border-[#767676] rounded-lg px-4 py-3 hover:bg-[#2A2A2A] transition-colors"
              >

                {/* Tool Info */}
                <div className="text-sm flex text-[#767676] font-medium">
                  {new Date(tool.createdAt).toLocaleDateString()} |&nbsp; <IoMdStar className="mt-0.5 mr-1"/> {tool.name}
                </div>

                {/* Redirect Icon */}
                <button
                  onClick={() => redirectToUrl(tool.visitlink)}
                  className="text-[#FA9021] hover:text-white border border-[#767676] rounded-[8px] border-b-3 transition-colors"
                >
                  <ChevronUp className="text-[#767676]" />
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
              className="bg-gradient-to-b from-[#E67802] to-[#FB9E3C] hover:from-transparent hover:to-transparent border border-[#FA9021] text-white font-medium px-10 py-4 rounded-full transition-colors"
            >
              MORE AI LIST
            </button>
          </div>
        )}
      </div>

      {/* Custom Scrollbar */}
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
      `}</style>
    </div>
  );
}
