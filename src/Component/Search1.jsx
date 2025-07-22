import React from 'react'
import { Search, ArrowUp } from "lucide-react";
import IfLogo from "../Images/If.png";
import Video from "../Images/Video.png";
import Kreado from "../Images/Kreado.png";
import Looka from "../Images/Looka.png";

const Search1 = () => {

  const Ai = [
    {
      id: 1,
      name: "iFable",
      description: "Endless AI-Powered Interactive Playground: Your Gameplay Grow AI Soulmates",
      logo: IfLogo,
    },
    {
      id: 2,
      name: "Videoidea.ai",
      description: "Your AI YouTube Content Factory. Generate viral-worthy scripts and engaging content in minutes.",
      logo: Video
    },
    {
      id: 3,
      name: "Kreado Voice Clone",
      description: "Clone your voice in less than a minute with 99% accuracy. Great for dubbing and videos.",
      logo: Kreado
    },
    {
      id: 4,
      name: "Looka",
      description: "A powerful AI logo generator. Create professional logos and access 300+ marketing templates.",
      logo: Looka
    }
  ];

  return (
    <div className='bg-black text-white'>
      {/* Search Bar */}
      <div className="flex justify-center items-center py-8">
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Search over 5000+ AI"
            className="border border-[#FA9021] w-full rounded-full outline-none py-3 pl-10 pr-4 text-white placeholder-gray-400 bg-transparent"
          />
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-6 px-4 pb-10">
        {Ai.map((tool) => (
          <div
            key={tool.id}
            className="group relative w-[300px] h-[300px] rounded-[30px] p-5 text-white bg-[#191919] opacity-[90%] overflow-hidden shadow-xl"
          >
            {/* Glow Circle */}
            <div className="absolute top-[-20px] right-[-20px] w-[80px] h-[80px] rounded-full bg-orange-400 opacity-40 blur-2xl z-0" />

            {/* Faint AI Text */}
            <div className="absolute text-[150px] font-black text-white/5 top-[-70px] left-[-10px] select-none pointer-events-none z-0">
              AI
            </div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div />
                <div className="flex items-center gap-1 font-[Poppins] text-sm font-medium text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width={15}
                    height={15}
                    fill="#FA9021"
                  >
                    <polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 
                    142.534,318.842 95.762,502.431 255.898,401.21 416.035,502.431 369.263,318.842" />
                  </svg>
                  Featured
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold">
                  56
                  <div className="bg-[#FA9021] rounded-full">
                    <ArrowUp size={16} className="text-[#191919]" />
                  </div>
                </div>
              </div>

              {/* Logo and Title */}
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={tool.logo}
                  alt={tool.name}
                  className="w-10 h-10 object-cover rounded"
                />
                <h3 className="font-[Poppins] text-lg font-bold">{tool.name}</h3>
                <svg
                            id="Layer_1"
                            height="17"
                            viewBox="0 0 24 24"
                            width="17"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="m22.17 9.866a1.683 1.683 0 0 0 -.69-2.12l-1.92-1.14a.178.178 0 0 1 -.09-.12l-.5-2.19a1.692 1.692 0 0 0 -1.8-1.31l-2.23.2a.149.149 0 0 1 -.14-.04l-1.69-1.48a1.7 1.7 0 0 0 -2.22 0l-1.69 1.48a.149.149 0 0 1 -.14.04l-2.23-.2a1.683 1.683 0 0 0 -1.8 1.314l-.5 2.19a.178.178 0 0 1 -.09.12l-1.92 1.136a1.683 1.683 0 0 0 -.69 2.12l.89 2.06a.2.2 0 0 1 0 .15l-.89 2.06a1.674 1.674 0 0 0 .69 2.11l1.93 1.154a.2.2 0 0 1 .08.12l.5 2.19a1.683 1.683 0 0 0 1.8 1.31l2.23-.21a.187.187 0 0 1 .14.05l1.69 1.48a1.708 1.708 0 0 0 2.22 0l1.69-1.48a.187.187 0 0 1 .14-.05l2.23.21a1.683 1.683 0 0 0 1.8-1.31l.5-2.19a.178.178 0 0 1 .09-.12l1.92-1.15a1.674 1.674 0 0 0 .69-2.11l-.89-2.06a.2.2 0 0 1 0-.15zm-5.68.12-4.96 5.08a.791.791 0 0 1 -.54.22.74.74 0 0 1 -.44-.14l-2.94-2.1a.752.752 0 0 1 .88-1.22l2.41 1.73 4.52-4.62a.745.745 0 0 1 1.06-.01.754.754 0 0 1 .01 1.06z"
                                fill="#FA9021"
                            />
                        </svg>
              </div>

              {/* Description */}
              <p className="text-sm text-[#767676] font-[Poppins] leading-snug mb-6">
                {tool.description}
              </p>

              {/* Visit Button */}
              <div className="flex justify-center">
                <button className="w-3/4 sm:w-[80%] md:w-[85%] bg-transparent hover:bg-gradient-to-b hover:from-[#FB9E3C] hover:to-[#E67802] border border-[#FA9021] transition-all duration-300 text-white py-2.5 sm:py-3 rounded-full cursor-pointer font-semibold text-sm sm:text-base shadow-md text-center">
                  VISIT US
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search1;
