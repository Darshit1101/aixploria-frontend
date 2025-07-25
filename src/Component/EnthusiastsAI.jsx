import EnthPlus from "../Images/Explore/EnthPlus.png"; // Adjust if needed
import EnthUser from "../Images/Explore/EnthUser.png"; // Adjust if needed
import DirectoryCard from "./DirectoryCard";
const directoryData = [
  {
    id: 1,
    text: `As already mentioned, our platform is easy to use due to its intentionally simplified design. This makes it ideal for curious beginners as well as for experts who want to discover the latest advances in AI. Ultimately, no matter what your level is, our site is designed to be safely explored and meet your expectations without delay.`,
    image: EnthUser,
    iconColor: "from-[#FF9D2D] to-[#FF7A1A]",
  },
  {
    id: 2,
    text: `Because AI are now clearly part of our daily lives, but also the tools of our future, keeping up to date with the latest trends is becoming essential. Aixploria can help you keep up to date and stay one step ahead of your competitors.`,
    image: EnthPlus,
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
            A WEBSITE FOR ALL AI ENTHUSIASTS AND AFICIONADOS
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
