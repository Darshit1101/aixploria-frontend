import React, { useState } from "react";
import { ChevronUp, List, Star, X } from "lucide-react";

const FavoritesPanel = () => {
  const toolCategories = [
    {
      id: 1,
      title: "Audio Editing",
      items: [
        { name: "E-mail", count: 54 },
        { name: "Education / Studies", count: 222 },
        { name: "Extensions ChatGPT", count: 97 },
        { name: "Files & Spreadsheets", count: 70 },
        { name: "Memory", count: 21 },
        { name: "Search engine", count: 62 },
        { name: "Presentation", count: 26 },
        { name: "Productivity", count: 242 },
        { name: "Translation", count: 42 },
      ],
    },
  ];

  const [favorites, setFavorites] = useState(
    Array(8).fill({ name: "iFable", id: Math.random() })
  );

  const resetFavorites = () => {
    setFavorites([]);
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-black w-full font-[Poppins] text-white">
      {/* Top Bar */}
      <div className="w-full px-6 sm:px-12 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#191919]">
        <button
          onClick={resetFavorites}
          className="bg-gradient-to-r from-[#E67802] to-[#FB9E3C] px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2"
        >
          Reset My Favorite
          <span className="text-white font-[900] text-lg">
            <List />
          </span>
        </button>
        <button className="bg-gradient-to-r from-[#E67802] to-[#FB9E3C] px-4 py-3 rounded-full font-[300] text-sm">
          Share My Favorite{" "}
          <span className="ml-4 text-white text-[10px] font-[400] bg-black px-4 py-2 rounded-full">
            {favorites.length}/100
          </span>
        </button>
      </div>

      {/* Card Section */}
      <div className="flex flex-wrap gap-6 md:ml-10 p-4 sm:p-6">
        {toolCategories.map((category) => (
          <div
            key={category.id}
            className="relative w-full sm:w-[400px] h-[500px] bg-white/5 text-white rounded-[30px] p-6 overflow-hidden shadow-lg border border-white/20"
          >
            {/* Title */}
            <h2 className="text-[16px] font-[Poppins] text-center text-[#E67802] font-bold mb-4">
              {category.title}
            </h2>

            {/* Scrollable list */}
            <div className="overflow-y-auto pr-1 h-[350px] custom-scroll font-[Poppins]">
              <ul className="space-y-2 text-sm">
                {category.items.map((item, index) => (
                  <li key={index}>
                    <div className="absolute text-[200px] font-black text-gray-500/1 -bottom-15 right-0 select-none pointer-events-none z-0">
                      AI
                    </div>
                    <a
                      href="#"
                      className="flex justify-between border p-2 bg-[#191919] rounded-lg items-center text-[#767676] text-[16px] hover:text-white transition"
                    >
                      <div className="flex">
                        <Star fill="#767676" className="w-4 h-4 mt-0.5" />
                        &nbsp;
                        <span>{item.name}&nbsp;</span>
                      </div>
                      <div className="border-b-3 border border-[#767676] rounded-lg">
                        <ChevronUp color="#ffffff" strokeWidth={0.5} />
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Button */}
            <div className="w-full flex justify-center">
              <button className="bg-gradient-to-r from-[#E67802] to-[#FB9E3C] text-white py-3 px-10 mt-5 rounded-full text-sm font-semibold">
                MORE LATEST AI
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPanel;
