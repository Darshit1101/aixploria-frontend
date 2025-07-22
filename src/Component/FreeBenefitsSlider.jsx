import React from "react";
import Question from "../Images/Question.png";
import GEAR3 from "../Images/Magnifine.png";
import AIM from "../Images/Explore/BAG.png";

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
                image={item.image}
                content={item.text}
                question={item.question}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Card Component
function DirectoryCard({ image, content, question }) {
  return (
    <div className="relative bg-[#191919] rounded-3xl p-6 shadow-2xl text-left h-full m0px]">
      {/* Background AI Text */}
      <div className="absolute -top-20 right-0 text-[180px] font-black text-white/5 z-0 select-none">
        AI
      </div>

      {/* Floating Icon */}
      <div className="absolute -top-6 md:-top-14 z-10">
        <img
          src={image}
          alt="Icon"
          className="md:w-[140px] md:h-[150px] w-[100px] h-[110px]"
        />
      </div>

      {/* Content Section */}
      <div className="relative z-10 mt-25">
        {/* Question */}
        <p className="text-[#FA9021] text-lg md:text-xl font-semibold mb-3 text-right">
          {question}
        </p>

        {/* Content */}
        <p className="text-[#767676] text-justify text-[12px] md:text-[15px] leading-relaxed">
          {content}
        </p>
      </div>
    </div>
  );
}
