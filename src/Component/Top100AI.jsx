import React from "react";
import HeroSection from "./HeroSection";
import robot from "../Images/GAI.png";
import Star1 from "../Images/Star.png";
import { ChevronUp } from "lucide-react";

// Data
const sections = [
  { title: "Latest AI", button: "MORE LATEST AI" },
  { title: "Top 50 Trends [24H]", button: "MORE LATEST AI" },
  { title: "Image Generators", button: "MORE LATEST AI" },
];

const items = new Array(8).fill("iFable");

// Cards Section
const CardColumn = ({ title, button }) => (
  <div className="bg-[#1a1a1a] rounded-3xl shadow-2xl p-4 w-full max-w-[350px] flex flex-col items-center">
    <h2 className="text-orange-500 font-semibold text-lg mb-4">{title}</h2>
    <div className="w-full h-[360px] overflow-y-scroll scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-transparent pr-2">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="bg-[#111] mb-2 p-3 rounded-md flex justify-between items-center text-gray-300"
        >
          <span>★ {item}</span>
          <button
            // onClick={() => redirectToUrl(tool.visitlink)}
            className="text-[#FA9021] hover:text-white border border-[#333333] rounded-[8px] p-1 transition-colors"
          >
            <ChevronUp className="text-[#767676]" size={16} />
          </button>
        </div>
      ))}
    </div>
    <button
      className={`mt-4 px-6 py-2 rounded-full ${
        title === "Latest AI"
          ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white"
          : "border border-orange-500 text-orange-500"
      }`}
    >
      {button}
    </button>
  </div>
);

// Description Section
const DescriptionPanel = () => (
  <div className="bg-[#0F0F0F] text-white px-6 py-12 max-w-6xl w-full mx-auto rounded-[2rem] shadow-2xl">
    <h1 className="text-center text-2xl md:text-3xl font-extrabold text-orange-500 mb-8 uppercase tracking-wide">
      Top 100 AI Tools: The Most Popular and Trending AI Websites
    </h1>

    <p className="text-center text-gray-400 text-sm mb-10 max-w-3xl mx-auto uppercase leading-relaxed tracking-wide">
      To discover the top 100 most popular AI tools of the moment, Aixploria is
      the place to be. Our mission? To offer you an easy-to-consult page that
      displays the best AIs in real-time.
    </p>

    <div className="space-y-10 max-w-4xl mx-auto">
      <div>
        <h2 className="text-white text-lg font-bold uppercase mb-2">
          A Dynamic Top 100 AI Tools
        </h2>
        <p className="text-gray-400 text-sm uppercase leading-relaxed tracking-wide">
          In the world of AI, things move fast, very fast. That’s why our top
          100 best AI tools adapts in real-time to introduce you to the latest
          and most recent trends. Here, no fixed list or ranking, it evolves
          with the pace of new developments.
        </p>
      </div>

      <div>
        <h2 className="text-white text-lg font-bold uppercase mb-2">
          Diving into the World of AI
        </h2>
        <p className="text-gray-400 text-sm uppercase leading-relaxed tracking-wide">
          The videos presented are a real invitation to explore the various
          aspects of AI. From explanations of basic concepts, to demonstrations
          of the latest technological advances, to discussions of ethical
          issues, each video provides its share of information and insights.
        </p>
      </div>

      <div>
        <h2 className="text-white text-lg font-bold uppercase mb-2">
          Direct Access to the Best YouTube AI Videos
        </h2>
        <p className="text-gray-400 text-sm uppercase leading-relaxed tracking-wide">
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

      <div className="bg-black font-[Poppins] text-white px-4 py-10">
        {/* Cards Row */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center max-w-7xl mx-auto mb-12">
          {sections.map((sec, idx) => (
            <CardColumn key={idx} title={sec.title} button={sec.button} />
          ))}
        </div>

        {/* Description Section */}
        <DescriptionPanel />
      </div>
    </>
  );
};

export default AIDashboard;
