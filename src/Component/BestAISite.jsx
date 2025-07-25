"use client";

import { useState } from "react";
import DirectoryCard from "./DirectoryCard"; // Import the new component
import Down from "../Images/Magnifine.png"; // Adjust if needed
import True from "../Images/Question.png"; // Adjust if needed

const directoryData = [
  {
    id: 1,
    text: ` As a result, the AI tool directory quickly becomes unreadable, and this option becomes essential. With great patience, we have carefully selected the most innovative and useful AIs to offer you the best options available. By the way on this subject, you can check our “top 10” list in the tab (of the same name) at the top of this page.`,
    image: True,
    iconColor: "from-[#FF9D2D] to-[#FF7A1A]",
    question: "HOW TO CHOOSE THE RIGHT AI TOOL FOR MY NEEDS?",
  },
  {
    id: 2,
    text: ` Meanwhile, a new special section called « top 10 AI » has been created. This one updates in real time and allows you to see the top 10 AI in each category at a glance. It’s very useful, because it’s sometimes hard to find your way around, with so many new AI tools coming out every day.`,
    image: Down,
    iconColor: "from-[#E11D48] to-[#BE123C]",
    question: "HOW TO BEST UTILIZE RECENT AI TOOLS?",
  },
];

export default function Top10() {
  return (
    <div className="w-full bg-black py-16 px-4 md:px-8 font-[Poppins]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-[#FA9021] text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
            A LIST OF THE BEST FREE AI SITES
          </h2>
          <p className="text-white text-[12px] max-w-3xl mx-auto">
            AI tools into their projects, without any cost.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          {directoryData.map((item) => (
            <DirectoryCard
              key={item.id}
              question={item.question}
              content={item.text}
              iconColor={item.iconColor}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
