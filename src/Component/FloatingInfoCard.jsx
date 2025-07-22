import React from "react";

export default function FloatingInfoCard({ image, description }) {
  return (
    <div className="relative min-w-[300px] sm:min-w-[200px] md:min-w-[200px] h-[250px] bg-[#191919] rounded-3xl p-6 shadow-2xl overflow-visible text-left z-0 flex-shrink-0">

      {/* Background AI Text */}
      <div className="absolute right-4 bottom-3 text-[180px] font-black text-white/5 z-0 select-none">
        AI
      </div>

      {/* Floating Icon */}
      <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-10">
        <img
          src={image}
          alt="Card Icon"
          className="w-[100px] h-[100px] object-contain"
        />
      </div>

      {/* Description Text */}
      <p className="relative z-10 text-[#767676] text-justify text-sm font-[Poppins] leading-relaxed mt-20">
        {description}
      </p>
    </div>
  );
}
