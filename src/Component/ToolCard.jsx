"use client";

import { useState } from "react";
import { Star, CheckCircle, Flame } from "lucide-react";

const ToolCard = ({
  name,
  logo,
  description,
  featured = false,
  ranking,
  websiteUrl,
  backgroundLogo = null,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleVisitClick = () => {
    window.open(websiteUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="relative w-[294px] h-[304px] bg-[#121212] rounded-xl p-5 overflow-hidden transition-all duration-300"
      style={{
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: isHovered
          ? "0 10px 20px rgba(0, 0, 0, 0.3)"
          : "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background logo with low opacity */}
      {backgroundLogo && (
        <div className="absolute inset-0 flex items-center justify-center opacity-5 overflow-hidden">
          <img
            src={backgroundLogo || "/placeholder.svg"}
            alt=""
            className="w-full h-full object-cover"
            style={{ transform: "scale(1.5)" }}
          />
        </div>
      )}

      {/* Featured badge */}
      {featured && (
        <div className="absolute top-4 left-4 flex items-center text-amber-400">
          <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
          <span className="ml-1 text-xs font-medium">Featured</span>
        </div>
      )}

      {/* Ranking */}
      {ranking && (
        <div className="absolute top-4 right-4 flex items-center text-amber-400">
          <span className="mr-1 text-xs font-medium">#{ranking}</span>
          <Flame className="w-4 h-4 fill-amber-400 stroke-amber-400" />
        </div>
      )}

      {/* Tool info */}
      <div className="mt-12 flex items-start">
        {/* Logo */}
        <div className="w-12 h-12 rounded-md bg-amber-400 flex items-center justify-center mr-3 flex-shrink-0">
          {logo ? (
            <img
              src={logo || "/placeholder.svg"}
              alt={name}
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <span className="text-black font-bold text-lg">
              {name.substring(0, 2)}
            </span>
          )}
        </div>

        {/* Name with verified badge */}
        <div className="flex items-center">
          <h3 className="text-white font-medium text-lg">{name}</h3>
          <CheckCircle className="w-4 h-4 ml-1 text-amber-500 fill-amber-500" />
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm mt-4 line-clamp-3">{description}</p>

      {/* Visit button */}
      <button
        onClick={handleVisitClick}
        className="absolute bottom-6 left-5 right-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-full text-center transition-transform duration-200"
        style={{
          transform: isHovered ? "scale(1.03)" : "scale(1)",
        }}
      >
        VISIT US
      </button>
    </div>
  );
};

export default ToolCard;
