import GearIcon from "../Images/Stack.png"; // Adjust if needed
import Magnifine from "../Images/Magnifine.png"; // Adjust if needed
import DirectoryCard from "./DirectoryCard";
const directoryData = [
  {
    id: 1,
    text: `Aixploria is a website dedicated to artificial intelligence that allows you to discover the best AI tools directory available online. Our site features a selection of listings arranged in categories that make it easy for you to find AIs that meet your criteria. In fact, the largest list of sites using AI can be found on this page! Plus, this list is updated daily, so you can bookmark it so you don’t miss out on the latest news.`,
    image: GearIcon,
    iconColor: "from-[#FF9D2D] to-[#FF7A1A]",
  },
  {
    id: 2,
    text: `Lately, the site also posts articles that explain how each AI works. Found an AI tools that doesn’t appear in the list? From now on, it is possible to submit new AIs so that they can be added to the ranking or the top 10. Actually, Aixploria is a kind of directory and search engine dedicated to AI. With its simple and clean style, you easily search using keywords like on a search engine.`,
    image: Magnifine,
    iconColor: "from-[#E11D48] to-[#BE123C]",
  },
];

export default function Top10() {
  return (
    <div className="w-full bg-black py-16 px-4 md:px-8 font-[Poppins]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-[#FA9021] text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
            THE WORLD'S BEST AI TOOLS DIRECTORY
          </h2>
          <p className="text-white text-[12px] max-w-3xl mx-auto">
            Lorem ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          {directoryData.map((item) => (
            <DirectoryCard
              key={item.id}
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
