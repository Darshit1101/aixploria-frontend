import React from "react";
import Question from "../Images/Question.png";
import GEAR3 from "../Images/Magnifine.png";
import AIM from "../Images/Explore/BAG.png";
import DirectoryCard from "./DirectoryCard";

// Data for cards
const directoryData = [
  {
    id: 1,
    text: `Looking for a tool to generate text, translate languages, create images, or automate repetitive tasks? You'll definitely find what you're looking for on AIxploria. Our site offers AI services in all fields and for all professions.`,
    image: Question,
    question: "A Wide Choice of Free AI Tools",
  },
  {
    id: 2,
    text: `Say goodbye to incomprehensible technical jargon! Here, we explain in simple terms how each tool works and what it can do for you. You'll also find concrete examples to help you choose the tool that's right for your project.`,
    image: GEAR3,
    question: "Clear and Concise Descriptions",
  },
  {
    id: 3,
    text: `Narrow your search by price, category type, profession, and even keywords. Quickly and easily find the free tools that truly match your goals.`,
    image: AIM,
    question: "An Advanced Filtering System",
  },
];

export default function Top10() {
  // Duplicate cards for seamless infinite scroll
  const infiniteCards = [...directoryData, ...directoryData];

  return (
    <div className="w-full bg-black py-16 font-[Poppins] overflow-hidden relative">
      {/* Inline CSS for animation */}
      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .scrolling-wrapper {
          display: flex;
          animation: slide 60s linear infinite;
          width: max-content;
        }
      `}</style>

      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-[#FA9021] text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
          BENEFITS OFFERED BY FREE AI TOOLS?
        </h2>
        <p className="text-white text-[12px] max-w-3xl mx-auto">
          AI tools into their projects, without any cost.
        </p>
      </div>

      {/* Scrolling Cards */}
      <div className="overflow-x-hidden">
        <div className="scrolling-wrapper gap-6 pt-24 relative">
          {infiniteCards.map((item, index) => (
            <div key={index} className="w-[450px] mr-6 flex-shrink-0">
              <DirectoryCard
                key={item.id}
                content={item.text}
                iconColor={item.iconColor}
                image={item.image}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
