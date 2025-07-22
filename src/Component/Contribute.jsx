"use client";

import { useState } from "react";
import Info from "../Images/Explore/Info.png"; // Adjust if needed
import ContriUser from "../Images/Explore/ContriUser.png"; // Adjust if needed
const directoryData = [
    {
        id: 1,
        text: `Aixploria is an online platform dedicated to artificial intelligence that encourages community participation. To this end, we believe that AI discovery is a collaborative process and that we all have something to contribute. That’s why we’ve created a space where users can share their own AI findings via a form.`,
        image: Info,
        iconColor: "from-[#FF9D2D] to-[#FF7A1A]",
    },
    {
        id: 2,
        text: `                            Whether you’re a novice, a seasoned developer, or just a fan of AI, you can contribute to the community by sharing your AI findings on Aixploria. This not only allows us to keep our list of AI tools up to date, but also to share your knowledge with other Internet users.`,
        image: ContriUser,
        iconColor: "from-[#E11D48] to-[#BE123C]",
    }
];

export default function Top10() {
    return (
        <div className="w-full bg-black py-16 px-4 md:px-8 font-[Poppins]">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-[#FA9021] text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
                        CONTRIBUTE TO THE COMMUNITY BY SHARING YOUR FINDINGS ON AIXPLORIA
                    </h2>
                    <p className="text-white text-[12px] max-w-3xl mx-auto">
                        Lorem ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </div>

                {/* Responsive Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                    {directoryData.map((item) => (
                        <DirectoryCard
                            key={item.id}
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

function DirectoryCard({ content, iconColor, image }) {
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
            <p className="relative z-10 text-[#767676] text-justify text-[12px] md:text-[16px] font-[Poppins] leading-relaxed mt-16">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {content}&nbsp;
                <br /><br />
            </p>
        </div>
    );
}
