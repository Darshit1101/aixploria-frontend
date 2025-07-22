import React from "react";
import hubspot from "../Images/hubspot.png"; // Use your icon image here

export default function Card1() {
  return (
    <div className="relative w-full max-w-[399px] aspect-square bg-[#191919] rounded-[2rem] p-6 overflow-hidden shadow-2xl text-center mx-auto">

      {/* 🔶 Orange Blurred Circle */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#FA9021] rounded-full blur-[80px] z-0" />

      {/* Background AI Text */}
      <div className="absolute -top-25 -left-2 text-[210px] font-black text-white/5 z-0 select-none">
        AI
      </div>

      {/* Foreground Content */}
      <img src={hubspot} alt="" className="-mt-10 z-10 relative" />
      
      <h2 className="text-[#FA9021] font-semibold text-[30px] -mt-25 z-10 relative">HubSpot AI Tools</h2>
      <h2 className="text-[#767676] font-normal text-[16px] mt-2 z-10 relative">
        Discover top-quality and secure tools for business and enterprise.
      </h2>
    </div>
  );
}
