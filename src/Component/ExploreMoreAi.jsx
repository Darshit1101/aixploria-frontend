import React from "react";
import AIVideo from "../Images/Explore/AIVideo.png"
import Blog from "../Images/Explore/Blog.png"
import GPT from "../Images/Explore/GPT.png"
import Hugging from "../Images/Explore/Hugging.png"
import News from "../Images/Explore/News.png"
import Top100 from "../Images/Explore/Top100.png"
import Top200 from "../Images/Explore/Top200.png"
import Youtube from "../Images/Explore/Youtube.png";
import Hubspot from "../Images/Explore/Hubspot.png";
import { Link } from "react-router-dom";

const aiToolsData = [
  {
    id: 1,
    title: "HubSpot AI Tools",
    description: "Discover top-quality and secure tools for business and enterprise.",
    image: Hubspot,
    link:'/hub-spot-ai'
  },
  {
    id: 2,
    title: "AI News",
    description: "AI news in real time, at a glance.",
    image: News,
    link:'/ainews'
  },
  {
    id: 3,
    title: "GPTs List",
    description: "A list of the best Custom GPTs.",
    image: GPT,
    link:'/gpt-list'
  },
  {
    id: 4,
    title: "Youtube AI",
    description: "Access the best YouTube channels talking about AI.",
    image: Youtube,
    link:'/aitutorials'
  },
  // {
  //   id: 5,
  //   title: "Top 100 AI (beta)",
  //   description: "Top 100 most popular and trending AIs on Aixploria.",
  //   image: Top100,
  // },
  {
    id: 6,
    title: "Blog & Tips",
    description: "All the tips, tutorials, and AI trends at the moment.",
    image: Blog,
    link:'/'
  },
  {
    id: 7,
    title: "Hugging Face Explorer",
    description: "Search for the best free “Spaces” available on Hugging Face",
    image: Hugging,
    link:'/'
  },
  {
    id: 8,
    title: "Top 200 AI Discord",
    description: "Check out the list of the best AI Discord communities.",
    image: Top200,
    link:'/'
  },
  {
    id: 9,
    title: "AI Video Tutorials",
    description: "Learn how to master the best AI tools on video.",
    image: AIVideo,
    link:'/aitutorials  '
  }
];

const AICard = ({ title, description, image,link }) => {
  return (
    <Link to={link}>
    <div className="relative w-full max-w-[399px] aspect-square bg-[#191919] rounded-[2rem] p-6 overflow-hidden shadow-2xl text-center mx-auto">
      <div className="absolute md:top-0 -top-20 -right-20 md:right-0 w-32 h-32 bg-[#FA9021] rounded-full blur-[80px] z-0" />
      <div className="absolute -top-20 -left-2 text-[210px] font-black text-white/5 z-0 select-none">
        AI
      </div>
      <img
        src={image}
        alt={title}
        className="-mt-34 md:-mt-20 xl:-mt-10 z-10 relative w-[300px] h-[300px] object-contain mx-auto"
      />
      <h2 className="text-[#FA9021] font-semibold text-[12px] md:text-[30px] -mt-30 md:-mt-15 z-10 relative">
        {title}
      </h2>
      <p className="text-[#767676] font-normal text-[8px] md:text-[14px] md:mt-2 z-10 relative">
        {description}
      </p>
    </div>
    </Link>
  );
};

const ExploreMoreAi = () => {
  return (
    <div className="bg-black text-white p-6 font-[Poppins]">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#FA9021]">
          EXPLORE MORE POTENTIAL WITH AI
        </h1>
        <p className="text-white text-sm mt-2">
          Lorem ipsum is simply dummy text of the printing and typesetting industry.
        </p>
      </div>

      {/* Updated Grid Layout */}
      <div className="max-w-7xl mx-auto flex justify-center">
        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 gap-6">
          {aiToolsData.map((tool) => (
            <AICard
              key={tool.id}
              title={tool.title}
              description={tool.description}
              image={tool.image}
              link={tool.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreMoreAi;
