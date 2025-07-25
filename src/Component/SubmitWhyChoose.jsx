import Arrow from "../Images/Arrow.png";
import Ribbon from "../Images/Ribbon.png";
import Check from "../Images/Check.png";
import Star from "../Images/Star1.png";
const directoryData = [
  {
    id: 1,
    text: `Looking for a tool to generate text, translate languages, create images, or automate repetitive tasks? You'll definitely find what you're looking for on AIxploria. Our site offers AI services in all fields and for all professions.`,
    image: Check,
    iconColor: "from-[#FF9D2D] to-[#FF7A1A]",
    question: "TRUSTED PLATFORM",
  },
  {
    id: 2,
    text: ` Say goodbye to incomprehensible technical jargon! Here, we explain in simple terms how each tool works and what it can do for you. You'll also find concrete examples to help you choose the tool that's right for your project.
`,
    image: Star,
    iconColor: "from-[#E11D48] to-[#BE123C]",
    question: "HIGH SIGNUP RATE",
  },
  {
    id: 3,
    text: ` Looking for a tool to generate text, translate languages, create images, or automate repetitive tasks? You'll definitely find what you're looking for on AIxploria. Our site offers AI services in all fields and for all professions.`,
    image: Arrow,
    iconColor: "from-[#E11D48] to-[#BE123C]",
    question: "REACH MORE CLICKS",
  },
  {
    id: 4,
    text: `Say goodbye to incomprehensible technical jargon! Here, we explain in simple terms how each tool works and what it can do for you. You'll also find concrete examples to help you choose the tool that's right for your project.`,
    image: Ribbon,
    iconColor: "from-[#E11D48] to-[#BE123C]",
    question: "PREMIUM EXPOSURE",
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
