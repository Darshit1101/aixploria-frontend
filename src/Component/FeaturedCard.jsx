import { ArrowUp, Plus } from "lucide-react";

export default function FeaturedCard({
  name,
  logo,
  description,
  ranking,
  verified,
  websiteUrl,
  hashtag,
  free, // ⬅️ NEW PROP
}) {
  return (
    <div className="group relative w-full w-full h-auto md:h-[275px] rounded-[30px] p-5 text-white bg-[#191919] opacity-[90%] overflow-hidden shadow-xl flex flex-col">
      {/* Glowing circle and AI background */}
      <div className="absolute top-[-20px] right-[-20px] w-[80px] h-[80px] rounded-full bg-orange-400 opacity-40 blur-2xl z-0" />
      <div className="absolute text-stroke-[#FFFFFF] text-[150px] font-black text-white/5 top-[-70px] left-[-10px] select-none pointer-events-none z-0">
        AI
      </div>

      {/* Card Content */}
      <div className="relative z-10 flex flex-col flex-grow justify-between">
        {/* Top Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            {/* Show Plus icon if free */}
            <div>
              {free && (
                <div className="bg-[#FA9021] rounded-full p-1">
                  <Plus className="w-4 h-4 text-black" />
                </div>
              )}
            </div>

            <div className="flex items-center gap-1 text-[16px] font-medium">
              {free ? (
                <Plus size={15} className="text-green-400" />
              ) : (
                <svg width={15} height={15} fill="#FA9021">
                  <polygon points="7.5,0 9.3,5.1 15,5.7 10.8,9.3 12,15 7.5,12.3 3,15 4.2,9.3 0,5.7 5.7,5.1" />
                </svg>
              )}
              <span
                className={free ? "text-[#11DF60] font-[700]" : "text-white"}
              >
                {free ? "Free" : "Featured"}
              </span>
            </div>

            {/* Ranking */}
            <div className="flex items-center gap-1 text-sm font-semibold">
              {ranking}
              <div className="bg-[#FA9021] rounded-full p-[2px] sm:p-[3px]">
                <ArrowUp className="text-[#191919] w-[14px] h-[14px] sm:w-[16px] sm:h-[16px]" />
              </div>
            </div>
          </div>

          {/* Logo + Title */}
          <div className="flex items-center gap-3 mb-3">
            <img
              src={logo}
              alt={`${name} Logo`}
              className="w-10 h-10 object-cover rounded"
            />
            <div className="flex items-center gap-1 text-lg font-bold">
              <span>{name}</span>
              {verified && (
                <svg
                  id="Layer_1"
                  enable-background="new 0 0 100 100"
                  width={15}
                  fill="#E67802"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m94.1149368 59.6092033c-1.9655228-3.057457-3.9310303-6.0057449-5.896553-9.0632019-.4367828-.6551819-.4367828-1.0919571 0-1.7471352 1.9655228-2.9482727 3.8218384-5.8965454 5.7873611-8.8448334 2.2930984-3.4942474 1.0919495-6.8793106-2.8390808-8.2988548-3.2758636-1.2011566-6.5517197-2.5114975-9.8275833-3.7126369-.6551743-.2183876-.9827652-.6551781-.9827652-1.4195442-.1091919-3.6034508-.3275833-7.2069016-.5459747-10.7011499-.2183838-3.8218393-3.1666641-6.0057468-6.879303-5.022995-3.4942474.8735666-6.9884949 1.8563185-10.3735619 2.8390865-.7643661.2183876-1.2011566 0-1.7471313-.5459766-2.1839104-2.8390865-4.4770203-5.5689716-6.6609268-8.2988567-2.4022942-3.0574741-6.1149483-3.0574741-8.6264305 0-2.1839066 2.7298846-4.4770164 5.4597697-6.5517235 8.1896534-.5459747.7643642-1.0919533.8735666-1.965519.655179-3.3850632-.9827518-6.7701111-1.8563185-9.1724052-2.5114975-4.695406-1.0919533-7.5344753.7643652-7.7528801 4.695406-.2183876 3.6034498-.4367752 7.2069025-.5459766 10.9195375 0 .7643642-.327589 1.0919552-.9827518 1.4195442-3.3850641 1.3103409-6.7701111 2.6206818-10.1551743 3.9310398-3.4942493 1.4195442-4.5862036 4.8045921-2.5114975 7.9712677 1.9655204 3.0574722 3.9310408 6.0057449 5.8965445 9.0632019.4367752.6551819.4367752 1.0919571 0 1.8563385-2.0747061 3.057457-4.040226 6.1149483-6.0057464 9.2816048-1.8563185 2.9482918-.655179 6.4425201 2.6206822 7.7528839 3.3850641 1.3103561 6.8793135 2.6206818 10.2643604 3.9310379.7643642.2184067.9827518.6551819.9827518 1.4195251.1092014 3.4942703.5459766 6.8792953.5459766 10.3735657 0 3.4942627 3.0574741 6.6609192 7.3160877 5.350563 3.3850632-1.0919495 6.7701092-1.8563309 10.1551762-2.8390884.6551781-.218399 1.0919533-.1091995 1.5287285.5459824 2.2931099 2.8390808 4.4770164 5.5689697 6.7701111 8.4080582 2.5114937 3.057457 6.1149483 3.057457 8.5172424 0 2.2931099-2.8390884 4.4770164-5.5689774 6.7701111-8.4080582.4367752-.5459824.7643623-.7643814 1.5287285-.5459824 3.4942513.9827576 6.9884987 1.8563385 10.4827614 2.8390884 3.6034546.9827499 6.6609192-1.2011566 6.7701111-4.9137878.2183914-3.6034393.4367828-7.2069092.5459824-10.9195404 0-.8735504.4367828-1.2011566 1.0919495-1.4195251 3.2758636-1.2011566 6.6609192-2.5114822 9.9367828-3.8218384 3.4942932-1.7471381 4.5862503-5.2414008 2.5115356-8.4080611zm-26.0976944-17.9080352-21.8390732 21.839077c-.5459785.5459747-1.3103447.9827499-2.074707 1.0919495-.2183876 0-.5459785.1092072-.7643661.1092072-.9827499 0-2.0747032-.4367752-2.8390846-1.2011566l-8.9540195-8.9540367c-1.5287285-1.5287285-1.5287285-4.0402412 0-5.5689697 1.5287304-1.5287285 4.0402279-1.5287285 5.5689716 0l6.1149483 6.1149483 18.9999924-18.9999924c1.5287285-1.5287285 4.0402222-1.5287285 5.5689697 0 1.7471007 1.5287283 1.7471007 4.0402258.2183684 5.5689734z" />
                </svg>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-[12px] text-[#767676] leading-snug mb-3">
            « {description}
          </p>

          {/* Hashtags */}
          <div className="flex gap-2 mt-2 overflow-x-auto whitespace-nowrap flex-nowrap thin-orange-scrollbar">
            {hashtag?.map((tag, idx) => (
              <p
                key={idx}
                className="bg-[#2C2C2C] text-white text-xs px-4 py-1 rounded-full inline-block"
              >
                {tag}
              </p>
            ))}
          </div>
        </div>

        {/* Visit Button */}
        <div className="mt-auto pt-3">
          <div className="flex justify-center">
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-3/4 sm:w-[80%] md:w-[85%] bg-transparent hover:bg-gradient-to-b hover:from-[#FB9E3C] hover:to-[#E67802] border border-[#FA9021] transition-all duration-300 text-white py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base shadow-md text-center"
            >
              VISIT US
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
