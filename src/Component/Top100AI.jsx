import React, { useState } from "react";
import HeroSection from "./HeroSection";
import robot from "../Images/GAI.png";
import Star1 from "../Images/Star.png";
import { ChevronUp } from "lucide-react";

const tools = [
  {
    id: 1,
    title: "Latest AI",
    items: [
      "iFable",
      "Grok",
      "ChatGPT",
      "Bard",
      "Claude",
      "Gemini",
      "LLaMA",
      "Mistral",
      "GrokX",
      "Perplexity",
    ],
  },
  {
    id: 2,
    title: "Top 50 Trends [24h]",
    items: [
      "TrendBot",
      "InsightAI",
      "TrendMaster",
      "PulseAI",
      "TrendSpotter",
      "WaveAI",
      "TrendFlow",
      "PeakAI",
      "TrendWave",
      "InsightPro",
    ],
  },
  {
    id: 3,
    title: "Image Generators",
    items: [
      "DALL-E",
      "Midjourney",
      "Stable Diffusion",
      "CanvaAI",
      "Artbreeder",
      "RunwayML",
      "DeepAI",
      "NightCafe",
      "Craiyon",
      "PixAI",
    ],
  },
];

// Cards Section
const CardColumn = ({ title, items }) => {
  const [favorites, setFavorites] = useState({});

  const handleClick = (item) => {
    window.open(
      `https://${item.toLowerCase().replace(/\s+/g, "")}.com`,
      "_blank"
    );
  };

  const toggleFavorite = (item, index) => {
    setFavorites((prev) => ({
      ...prev,
      [item + index]: !prev[item + index],
    }));
  };

  return (
    <div className="bg-[#191919] text-white rounded-[20px] p-4 sm:p-5 shadow-lg flex flex-col justify-between h-full">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">
          {title}
        </h2>
        <div className="w-full h-72 sm:h-90 overflow-y-auto custom-scroll pr-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-1 sm:py-2 border-b border-gray-700 cursor-pointer hover:bg-gray-800 rounded-md px-2"
              onClick={() => handleClick(item)}
            >
              <div className="flex items-center space-x-2">
                <span
                  className="text-yellow-400 text-lg sm:text-xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item, index);
                  }}
                >
                  {favorites[item + index] ? "★" : "☆"}
                </span>
                <span className="text-sm sm:text-base">{item}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="mt-2 sm:mt-4 w-full bg-transparent hover:bg-gradient-to-b hover:from-[#FB9E3C] cursor-pointer hover:to-[#E67802] border border-[#FA9021] text-white py-1 sm:py-2 rounded-[30px] transition-colors text-sm sm:text-base">
        MORE LATEST AI
      </button>
    </div>
  );
};

// Description Section
const DescriptionPanel = () => (
  <div className="bg-[#0F0F0F] text-white px-4 sm:px-6 py-6 sm:py-12 max-w-6xl w-full mx-auto rounded-[1rem] sm:rounded-[2rem] shadow-2xl">
    <h1 className="text-center text-xl sm:text-2xl md:text-5xl font-extrabold text-orange-500 mb-4 sm:mb-8 uppercase tracking-wide">
      Top 100 AI Tools: The Most Popular and Trending AI Websites
    </h1>

    <p className="text-center text-gray-400 text-xs sm:text-lg mb-4 sm:mb-10 max-w-xl sm:max-w-3xl mx-auto uppercase leading-relaxed tracking-wide">
      To discover the top 100 most popular AI tools of the moment, Aixploria is
      the place to be. Our mission? To offer you an easy-to-consult page that
      displays the best AIs in real-time.
    </p>

    <div className="space-y-6 sm:space-y-10 max-w-lg sm:max-w-4xl mx-auto">
      <div>
        <h2 className="text-white text-base sm:text-xl font-bold uppercase mb-1 sm:mb-2">
          A Dynamic Top 100 AI Tools
        </h2>
        <p className="text-gray-400 text-xs sm:text-lg uppercase leading-relaxed tracking-wide">
          In the world of AI, things move fast, very fast. That’s why our top
          100 best AI tools adapts in real-time to introduce you to the latest
          and most recent trends. Here, no fixed list or ranking, it evolves
          with the pace of new developments.
        </p>
      </div>

      <div>
        <h2 className="text-white text-base sm:text-xl font-bold uppercase mb-1 sm:mb-2">
          Diving into the World of AI
        </h2>
        <p className="text-gray-400 text-xs sm:text-lg uppercase leading-relaxed tracking-wide">
          The videos presented are a real invitation to explore the various
          aspects of AI. From explanations of basic concepts, to demonstrations
          of the latest technological advances, to discussions of ethical
          issues, each video provides its share of information and insights.
        </p>
      </div>

      <div>
        <h2 className="text-white text-base sm:text-xl font-bold uppercase mb-1 sm:mb-2">
          Direct Access to the Best YouTube AI Videos
        </h2>
        <p className="text-gray-400 text-xs sm:text-lg uppercase leading-relaxed tracking-wide">
          The special feature of this section is the possibility of viewing the
          best YouTube videos about AI directly online, without having to leave
          the site. It’s a real time-saver, and a great way to keep abreast of
          the latest developments in the field of AI. However, if you want to go
          a step further, we invite you to visit the various YouTube channels on
          Aixploria. It’s not uncommon for these YouTubers to offer new and
          complementary content outside the YouTube site.
        </p>
      </div>
    </div>
  </div>
);

// Main Page Component
const AIDashboard = () => {
  return (
    <>
      <HeroSection
        backgroundText="A I T O O L S"
        subtitle="Artificial intelligence for everyone"
        title="Top 100 AI"
        description="Popular and trending AI tools"
        buttonText="GET A PREMIUM"
        buttonLink="/premium"
        buttonIcon={Star1}
        mainImage={robot}
        mainImageAlt="AI Assistant Robot"
      />

      <div className="bg-black font-[Poppins] text-white px-2 sm:px-4 py-6 sm:py-10">
        {/* Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-center items-start max-w-xs sm:max-w-6xl mx-auto mb-6 sm:mb-12">
          {tools.map((category) => (
            <CardColumn
              key={category.id}
              title={category.title}
              items={category.items}
            />
          ))}
        </div>

        {/* Description Section */}
        <DescriptionPanel />
      </div>
    </>
  );
};

export default AIDashboard;

// Scrollbar styles
const styles = `
  .custom-scroll::-webkit-scrollbar {
    width: 4px;
  }
  .custom-scroll::-webkit-scrollbar-thumb {
    background-color: #fa9021;
    border-radius: 4px;
  }
  .custom-scroll::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scroll {
    scrollbar-width: thin;
    scrollbar-color: #fa9021 transparent;
  }
`;
const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(styles);
document.adoptedStyleSheets = [styleSheet];
