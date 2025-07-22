import React from 'react';
import aboutai1 from "../Images/aboutai1.png";
import aboutai2 from "../Images/aboutai2.png";
import Tick from "../Images/Tick.png";
import Position from "../Images/Position.png";
import Location from "../Images/Location.png";
import Trophy from "../Images/Trophy.png";
const AboutAi = () => {
  const sections = [
    {
      title: 'Lists and rankings of the best AI Tools',
      description: 'If you’re interested in AI, you probably know how difficult it can be to find the best AIs in each category. That’s why we’ve put together this comprehensive list of the best AI sites, categorized, with the option of voting for your favorite AI.',
      description2:'With patience and rigor, we have listed the best AI sites in around 50 different categories. The number of categories is growing steadily, as new areas of artificial intelligence emerge every day!',
      image: aboutai1,
    },
    {
      title: 'Ergonomic design',
      description: 'With the Kanban style adopted, you can easily see which AIs are currently trending in each category. Each AI is accompanied by a brief description (mouse-over) and a link to its website.',
      description2:'You can also easily identify their pricing: free, freemium or paid. What’s more, a keyword search function is available for quick navigation to the AIs of your choice.',
      image: aboutai2,
    },
    {
      title: 'AI tools list accessible everywhere',
      description: 'Aixploria, entirely free of charge, lists over 4,000 AIs, offering a wealth of business opportunities for professionals and an invaluable source of learning for AI enthusiasts.',
      description2:'This ranking of the best AIs adapts to all screen sizes: smartphone, tablet, computer, smart TV or projection screen.',
      image: Location,
    },
    {
      title: 'Best AI & Top 10',
      description: 'Each tools list displays a top 10 list of the AIs most appreciated by the community. This Top 10 is evolving and can change very quickly. So don’t be surprised if, within a few days, a new AI tools appears in the top positions. In the fascinating world of artificial intelligence, everything moves extremely fast!',
      description2:'Sometimes, all it takes is a little buzz to propel a site to the top of the AI rankings. A recent example is the video platform HeyGen AI, which in just 24 hours made it into the top 10 in the video publishing category! ',
      image: Trophy,
    },
    {
      title: 'Ranking of AI sites',
      description: 'On this page, called “The Ultimate AI List”, you can also see how each AI ranks and evolves in relation to the others in its respective category..',
      description2:'To achieve this, we used a ranking system based mainly on user votes and the number of views, enriched by other relevant criteria',
      image: Position,
    },
    {
      title: 'AI aggregator & voting',
      description: 'As we have seen, the lists offer easy exploration of the leading AI sites in each field. This is made possible by the many votes cast on our AI aggregator.',
      description2:'On this subject, we’d like to invite you not to hesitate to give your opinion. Your opinion is precious, and this top 10 reflects the best AIs thanks to the evaluations of those who have gone before you. So your vote counts too!',
      image: Tick,
    },
  ];

  return (
    <div className="bg-black py-10 font-[Poppins]">
      <div className="px-4 mx-auto max-w-screen-xl">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`relative bg-[#191919] w-full text-white rounded-[30px] p-6 mb-6 flex flex-col md:flex-row items-center shadow-lg ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            style={{ minHeight: '311px' }}
          >
            <div className="absolute text-stroke-[#FFFFFF] text-[150px] font-black text-white/5 top-[-70px] right-[-10px] select-none pointer-events-none z-0">
                AI
            </div>
            <div className="w-50 h-50 flex-shrink-0 mr-6 mb-4 md:mb-0 z-10">
              <img src={section.image} alt={section.title} className="w-full h-full object-contain " />
            </div>
            <div className="flex-1">
              <h2 className="text-[26px] font-bold mb-8">{section.title}</h2>
              <p className="text-[#767676]">{section.description}</p>
              <p className="text-[#767676]">{section.description2}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutAi;