import React from "react";
import BAG from "../Images/Explore/BAG.png";
import SIM from "../Images/Explore/SIM.png";
import BILL from "../Images/Explore/BILL.png";
import DirectoryCard from "./DirectoryCard";
const directoryData = [
  {
    id: 1,
    text: ` To date, the best answer might be: “Out of curiosity” but there are many other reasons. First, you can come to Aixploria to learn about the latest trends and advances in AI or to find a specific AI. Why not come along and simply learn how the various AI in our database list work?`,
    image: BAG,
  },
  {
    id: 2,
    text: ` who new sections have recently been added to the site, and they seem to have become quite popular: an area dedicated to news about artificial intelligence. These news items are available in both written (AI News`,
    image: SIM,
  },
  {
    id: 3,
    text: ` Sharing your own AI discoveries with the community can also be interesting. However, the best excuse to drop by Aixploria.com is surely the choice and the number of AI present in each category.`,
    image: BILL,
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
          WHY COME TO THIS AI TOOLS DIRECTORY?
        </h2>
        <p className="text-white text-[12px] max-w-3xl mx-auto">
          Lorem ipsum is simply dummy text of the printing and typesetting
          industry.
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


