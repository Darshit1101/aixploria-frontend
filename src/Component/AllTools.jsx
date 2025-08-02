import React, { useEffect, useState } from "react";
import { api } from "axiosApi";

const AllCategoriesTools = () => {
  const [tools, setTools] = useState([]);
  const [categories, setCategories] = useState([]);
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get(`/categories/getsomecategories`);
        const fetchedCategories = res.data.map((cat) => cat.name);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories", error);
        setCategories([]);
      }
    };

    const fetchTools = async () => {
      try {
        const res = await api.get(`/cards/getallcards`);
        const fetchedTools = res.data.map((tool) => ({
          id: tool.id,
          name: tool.name,
          createdAt: tool.createdAt || new Date().toISOString().split("T")[0],
          category: tool.category,
          visitlink: tool.visitlink,
        }));
        setTools(fetchedTools);
      } catch (error) {
        console.error("Error fetching tools", error);
        setTools([]);
      }
    };

    fetchCategories();
    fetchTools();
  }, []);

  const handleClick = (visitlink, toolName) => {
    const url =
      visitlink || `https://${toolName.toLowerCase().replace(/\s+/g, "")}.com`;
    window.open(url, "_blank");
  };

  const toggleFavorite = (toolId) => {
    setFavorites((prev) => ({
      ...prev,
      [toolId]: !prev[toolId],
    }));
  };

  // Group tools by category
  const groupedTools = tools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {});

  return (
    <>
      <div className="bg-black py-10 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => (
              <div
                key={category}
                className="bg-[#191919] text-white rounded-[20px] p-5 shadow-lg flex flex-col justify-between h-full"
              >
                <h2 className="text-center text-xl font-semibold mb-4">
                  {category}
                </h2>
                <div className="max-h-80 overflow-y-auto custom-scroll pr-2">
                  {groupedTools[category]?.map((tool) => (
                    <div
                      key={tool.id}
                      className="flex items-center justify-between py-1 border-b border-gray-700 cursor-pointer hover:bg-gray-800 rounded-md px-2"
                      onClick={() => handleClick(tool.visitlink, tool.name)}
                    >
                      <div className="flex items-center space-x-2">
                        <span
                          className="text-yellow-400 text-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(tool.id);
                          }}
                        >
                          {favorites[tool.id] ? "★" : "☆"}
                        </span>
                        <span className="text-sm ">{tool.name}</span>
                      </div>
                      {/* <span className="text-gray-400 text-xs">⋮</span> */}
                    </div>
                  ))}
                </div>
                <button className="mt-4 w-full bg-transparent hover:bg-gradient-to-b hover:from-[#FB9E3C] cursor-pointer hover:to-[#E67802] border border-[#FA9021] text-white py-2 rounded-[30px] transition-colors">
                  MORE {category.toUpperCase().replace(/\s+/g, " ")}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Scrollbar styles */}
        <style>{`
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: #fa9021;
          border-radius: 6px;
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
    </>
  );
};

export default AllCategoriesTools;
