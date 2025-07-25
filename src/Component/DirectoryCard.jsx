export default function DirectoryCard({ content, image, question }) {
  return (
    <div className="relative w-full bg-[#191919] rounded-3xl p-6 shadow-2xl text-left z-0">
      {/* Background AI Text */}
      <div className="absolute -top-20 right-0 text-[180px] font-black text-white/5 z-0 select-none">
        AI
      </div>

      {/* Floating Icon */}
      <div className="absolute -top-5 md:-top-14  z-10">
        <img
          src={image}
          alt="Gear Icon"
          className="md:w-[140px] md:h-[150px] w-[100px] h-[110px]"
        />
      </div>

      {/* Description */}
      <div className="relative z-10 mt-20">
        {/* Question */}
        <p className="text-end text-[#FA9021] text-xl font-semibold mb-4">
          {question}
        </p>

        {/* Content */}
        <p className="text-[#767676] text-justify text-[12px] md:text-[16px] font-[Poppins] leading-relaxed">
          {content}
        </p>
      </div>
    </div>
  );
}
