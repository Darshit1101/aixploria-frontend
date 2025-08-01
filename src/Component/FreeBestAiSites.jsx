"use client";

import Down from "../Images/Magnifine.png"; // Adjust if needed
import True from "../Images/Question.png"; // Adjust if needed
import DirectoryCard from "./DirectoryCard";
const directoryData = [
  {
    id: 1,
    text: `Choosing to use free AI tools, often without registration, is not just about saving money. It's also about being able to test, experiment, and learn without financial barriers. This page presents an impressive range of AI services, categorized by category, popularity, and even price. You'll find free websites, paid, freemium, and of course, free trial versions here.`,
    image: True,
    iconColor: "from-[#FF9D2D] to-[#FF7A1A]",
    question: "WHY CHOOSE FREE AI TOOLS?",
  },
  {
    id: 2,
    text: ` This section is designed to quickly guide you to the most appropriate AI tool for your projects. We've meticulously selected the best free AI tools on the market and placed them in this list. With daily updates, you'll always find new AI websites to explore. And if you still can't find the AI that suits you, don't hesitate to use the search bar.`,
    image: Down,
    iconColor: "from-[#E11D48] to-[#BE123C]",
    question: "A SELECTION OF QUALITY AI SERVICES?",
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
