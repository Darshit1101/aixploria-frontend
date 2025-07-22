"use client";

import { useState } from "react";
import Down from "../Images/Magnifine.png"; // Adjust if needed
import True from "../Images/Question.png"; // Adjust if needed
const directoryData = [
    {
        id: 1,
        text: ` As a result, the AI tool directory quickly becomes unreadable, and this option becomes essential. With great patience, we have carefully selected the most innovative and useful AIs to offer you the best options available. By the way on this subject, you can check our “top 10” list in the tab (of the same name) at the top of this page.`,
        image: True,
        iconColor: "from-[#FF9D2D] to-[#FF7A1A]",
        question: "HOW TO CHOOSE THE RIGHT AI TOOL FOR MY NEEDS?"
    },
    {
        id: 2,
        text: ` Meanwhile, a new special section called « top 10 AI » has been created. This one updates in real time and allows you to see the top 10 AI in each category at a glance. It’s very useful, because it’s sometimes hard to find your way around, with so many new AI tools coming out every day.`,
        image: Down,
        iconColor: "from-[#E11D48] to-[#BE123C]",
        question: "HOW TO BEST UTILIZE RECENT AI TOOLS?"
    }
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

function DirectoryCard({ content, iconColor, image, question }) {
    return (
        <div className="relative w-full bg-[#191919] rounded-3xl p-6 shadow-2xl text-left z-0">
            {/* Background AI Text */}
            <div className="absolute -top-20 right-0 text-[180px] font-black text-white/5 z-0 select-none">
                AI
            </div>

            {/* Floating Icon */}
            <div className="absolute -top-5 md:-top-14  z-10">
                <img
                    src={image}
                    alt="Gear Icon"
                    className="md:w-[140px] md:h-[150px] w-[100px] h-[110px]"
                />
            </div>

            {/* Description */}
            <div className="relative z-10 mt-20"> {/* Add top margin to clear image */}
                {/* Question */}
                <p className="text-end text-[#FA9021] text-xl font-semibold mb-4">
                    {question}
                </p>

                {/* Content */}
                <p className="text-[#767676] text-justify text-[12px] md:text-[16px] font-[Poppins] leading-relaxed">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{content}
                </p>
            </div>
        </div>
    );
}
