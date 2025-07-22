import React from "react";
import FILES3 from "../Images/Explore/FILES3.png"
import GEAR3 from "../Images/Explore/GEAR3.png";
import AIM from "../Images/Explore/AIM.png";
const directoryData = [
  {
    id: 1,
    text: `Other than that, the site is neat and clear, with good ergonomics to ensure you get quick results. Obviously, the site is accessible for free, without registration and is compatible with computers, tablets and mobiles.`,
    image: FILES3,
  },
  {
    id: 2,
    text: `Whether you’re looking for a machine translation tool, an image generator, or any other AI app, Aixploria offers a variety of high-quality choices. With our intuitive search engine, you can easily find the right AI for your needs.`,
    image: GEAR3,
  },
  {
    id: 3,
    text: `Now, we also have articles written by AI experts to help you understand the latest trends and most popular applications.`,
    image: AIM,
  },
];

export default function Top10() {
  // Duplicate cards for seamless infinite scroll
  const infiniteCards = [...directoryData, ...directoryData];

  return (
    <div className="w-full bg-black py-16  font-[Poppins] overflow-hidden relative">
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
      <div className=" text-center mb-12">
        <h2 className="text-[#FA9021] text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
          AIXPLORIA: YOUR GUIDE TO DISCOVERING THE BEST AI
        </h2>
        <p className="text-white text-[12px] max-w-3xl mx-auto">
          Lorem ipsum is simply dummy text of the printing and typesetting industry.
        </p>
      </div>

      {/* Scrolling Cards */}
      <div className="overflow-x-hidden">
        <div className="scrolling-wrapper gap-6 pt-24 relative">

          {infiniteCards.map((item, index) => (
            <div key={index} className="w-[450px] mr-6 flex-shrink-0">
              <DirectoryCard image={item.image} content={item.text} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DirectoryCard({ image, content }) {
  return (
    <div className="relative bg-[#191919] rounded-3xl p-6 shadow-2xl text-left h-full">
      {/* Background AI Text */}
      <div className="absolute -top-20 right-0 text-[180px] font-black text-white/5 z-0 select-none">
        AI
      </div>

      {/* Floating Icon */}
      <div className="absolute -top-5 md:-top-14  z-10">
        <img src={image} alt="Icon" className="md:w-[140px] md:h-[150px] w-[100px] h-[110px]" />
      </div>

      {/* Description */}
      <p className="relative z-10 text-[#767676] text-justify text-[12px] md:text-[16px] font-[Poppins] leading-relaxed mt-16">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{content}
      </p>
    </div>
  );
}
