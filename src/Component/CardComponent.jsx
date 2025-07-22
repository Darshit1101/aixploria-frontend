import React, { useState } from "react";
import { FiClock, FiPlay } from "react-icons/fi";

const CardComponent = ({ card }) => {
  const [showPlayer, setShowPlayer] = useState(false);

  const getYoutubeVideoId = (url) => {
    if (!url || typeof url !== "string") return null;
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.searchParams.get("v") || parsedUrl.pathname.split("/").pop();
    } catch (e) {
      return null;
    }
  };

  const videoId = getYoutubeVideoId(card.youtubeLink);
  const thumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/0.jpg`
    : "/default-thumbnail.jpg";

  const formatDuration = (minutes) => {
    const mins = parseInt(minutes, 10);
    if (isNaN(mins)) return "15 min"; // fallback

    const hrs = Math.floor(mins / 60);
    const remMins = mins % 60;

    if (hrs > 0) {
      return `${hrs} hr${hrs > 1 ? "s" : ""} ${remMins > 0 ? `${remMins} min` : ""}`;
    }
    return `${remMins} min`;
  };
  

  return (
    <>
      <div className="relative w-full max-w-[450px] mt-5 mx-auto">
        <button className="absolute -top-3 left-4 z-30 bg-[#FA9021] font-[Poppins] px-3 py-1.5 rounded-full shadow text-white flex items-center gap-1 text-sm">
          <FiClock size={16} />
          {formatDuration(card.length)}
        </button>

        <div className="h-[400px] bg-[#191919] shadow rounded-[24px] overflow-hidden relative z-10">
          {/* Thumbnail */}
          <div
            className="relative cursor-pointer"
            onClick={() => setShowPlayer(true)}
          >
            <img
              src={thumbnail}
              alt={card.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <FiPlay size={28} className="text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="p-4 relative h-[calc(100%-210px)]">
            <h2 className="font-bold text-lg font-[Poppins] text-white mb-2">
              {card.title}
            </h2>

            <div className="flex flex-wrap gap-2 max-h-[130px] overflow-y-auto pr-1 custom-scroll">
              {card.hashtags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-[#2C2C2C] text-[#767676] text-xs px-4 py-2 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="absolute bottom-4 right-4 text-xs text-white opacity-30">
              {card.createdAt?.split("T")[0]}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showPlayer && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <div className="relative w-full max-w-3xl mx-auto">
            <button
              onClick={() => setShowPlayer(false)}
              className="absolute top-2 cursor-pointer right-2 text-white text-xl bg-[#FA9021] px-3 py-1 rounded-full"
            >
              ✕
            </button>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-[400px] rounded-xl"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardComponent;
