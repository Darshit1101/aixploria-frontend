import { useState } from "react";
import FloatingInfoCard from "./FloatingInfoCard"; // Adjust the import path as needed
import hubspot from "../Images/hubspot.png"; // Replace with Aploria icon image
// import SearchIcon from "../assets/search-icon.png"; // Replace with search icon image

export default function WorldBestAiDirectories() {
  // Define card data in a const array
  const cardsData = [
    {
      id: 1,
      icon: hubspot,
      alt: "Aploria",
      content:
        "Aploria is a website dedicated to artificial intelligence that allows you to discover the best AI tools directory available online. Our site features a selection of listings arranged in categories that make it easy for you to find AIs that meet your criteria. In fact, the largest list of sites using AI can be found on this page! Plus, this list is updated daily, so you can bookmark it so you don’t miss out on the latest news.",
    },
    {
      id: 2,
      icon: hubspot,
      alt: "Search",
      content:
        "Lately, the site also posts articles that explain how each AI works. Found an AI tool that doesn’t appear in the list? From now on, it is possible to submit new AIs so that they can be added to the ranking or the top 10. Actually, Aploria is a kind of directory and search engine dedicated to AI. With its simple and clean style, you can easily search using keywords like on a search engine.",
    },
  ];

  return (
    <div className="w-full bg-black py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-[#FF9D2D] text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            THE WORLD'S BEST AI TOOLS DIRECTORY
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Lorem ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>

        {/* Cards Container */}
        <div className="flex justify-center gap-6 lg:gap-10 mt-15">
          {cardsData.map((card) => (
            <FloatingInfoCard key={card.id}>
              <div className="absolute -top-20 left-20 transform -translate-x-1/2 z-10">
                <img
                  src={card.icon}
                  alt={card.alt}
                  className="w-[142px] h-[142px]"
                />
              </div>
              <p className="relative z-10 text-[#767676] text-justify text-sm font-[Poppins] leading-relaxed mt-16">
                {card.content}
              </p>
            </FloatingInfoCard>
          ))}
        </div>
      </div>
    </div>
  );
}