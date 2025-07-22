import React from "react";
import BAG from "../Images/Explore/BAG.png"
import SIM from "../Images/Explore/SIM.png";
import BILL from "../Images/Explore/BILL.png";
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
