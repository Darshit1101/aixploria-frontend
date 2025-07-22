"use client";

import { useState } from "react";
import { Layers } from "lucide-react";

export default function ExploreAiCard({
  title = "HubSpot AI Tools",
  description = "Discover top-quality and secure tools for business and enterprise.",
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="relative w-full max-w-[400px] aspect-square rounded-3xl bg-gradient-to-br from-[#1A1A1A] to-[#111111] overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Background "A" letter */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 flex items-center justify-center pointer-events-none">
        <span className="text-[300px] font-bold text-gray-700">AI</span>
      </div>

      {/* Content container */}
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center p-6 text-center">
        {/* Icon with floating animation */}
        <div
          className={`
            relative mb-6 
            ${isHovered ? "animate-float" : "animate-float-slow"}
          `}
        >
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#FF9D2D] to-[#FF7A1A] flex items-center justify-center shadow-lg">
            <Layers className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[#FF9D2D] text-2xl md:text-3xl font-bold mb-3">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm md:text-base max-w-[80%]">
          {description}
        </p>
      </div>
    </div>
  );
}
