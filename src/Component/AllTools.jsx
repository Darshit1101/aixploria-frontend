import React, { useState } from 'react';

const AllTools = () => {
  const tools = [
    { id: 1, title: 'Latest AI', items: ['iFable', 'Grok', 'ChatGPT', 'Bard', 'Claude', 'Gemini', 'LLaMA', 'Mistral', 'GrokX', 'Perplexity'] },
    { id: 2, title: 'Top 50 Trends [24h]', items: ['TrendBot', 'InsightAI', 'TrendMaster', 'PulseAI', 'TrendSpotter', 'WaveAI', 'TrendFlow', 'PeakAI', 'TrendWave', 'InsightPro'] },
    { id: 3, title: 'Image Generators', items: ['DALL-E', 'Midjourney', 'Stable Diffusion', 'CanvaAI', 'Artbreeder', 'RunwayML', 'DeepAI', 'NightCafe', 'Craiyon', 'PixAI'] },
    { id: 4, title: 'Voice Tools', items: ['VoiceMod', 'ElevenLabs', 'Respeecher', 'Descript', 'Synthesia', 'HeyGen', 'VoxWorker', 'Speechify', 'Lalal.ai', 'Voicemod'] },
    { id: 5, title: 'Coding Assistants', items: ['CodePilot', 'GitHub Copilot', 'Tabnine', 'Codeium', 'ReplitAI', 'Cursor', 'Kite', 'CodeGeeX', 'Tabby', 'AI2Code'] },
    { id: 6, title: 'Data Tools', items: ['DataBot', 'PowerBI AI', 'TableauAI', 'Looker', 'QlikSense', 'Sisense', 'ThoughtSpot', 'Zoho Analytics', 'Yellowfin', 'DomoAI'] },
    { id: 7, title: 'Writing Assistants', items: ['TextCortex', 'Jasper', 'Copy.ai', 'Writesonic', 'Rytr', 'Frase', 'Sudowrite', 'Peppertype', 'Anyword', 'WordAI'] },
    { id: 8, title: 'Video Creators', items: ['VideoGen', 'Synthesia', 'Lumen5', 'Invideo AI', 'Pictory', 'Clipchamp', 'Kapwing', 'Descript', 'Veed.io', 'Wave.video'] },
    { id: 9, title: 'Music Generators', items: ['MusicLM', 'Suno AI', 'AIVA', 'Amper Music', 'Soundraw', 'Boomy', 'Ecrett Music', 'Mubert', 'Aimi', 'Jukebox'] },
  ];

  const [favorites, setFavorites] = useState({});

  const handleClick = (item) => {
    window.open(`https://${item.toLowerCase().replace(/\s+/g, '')}.com`, '_blank');
  };

  const toggleFavorite = (item, index) => {
    setFavorites((prev) => ({
      ...prev,
      [item + index]: !prev[item + index],
    }));
  };

  return (
    <div className="bg-black py-10 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tools.map((category) => (
            <div
              key={category.id}
              className="bg-[#191919] text-white rounded-[20px] p-5 shadow-lg flex flex-col justify-between h-full"
            >
              <div>
                <h2 className="text-xl font-semibold mb-4">{category.title}</h2>
                <div className="max-h-56 overflow-y-auto custom-scroll pr-2">
                  {category.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-1 border-b border-gray-700 cursor-pointer hover:bg-gray-800 rounded-md px-2"
                      onClick={() => handleClick(item)}
                    >
                      <div className="flex items-center space-x-2">
                        <span
                          className="text-yellow-400 text-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(item, index);
                          }}
                        >
                          {favorites[item + index] ? '★' : '☆'}
                        </span>
                        <span className="text-sm">{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button className="mt-4 w-full bg-transparent hover:bg-gradient-to-b hover:from-[#FB9E3C] cursor-pointer hover:to-[#E67802] border border-[#FA9021] text-white py-2 rounded-[30px] transition-colors">
                MORE LATEST AI
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Scrollbar styles */}
      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: #fa9021;
          border-radius: 6px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scroll {
          scrollbar-width: thin;
          scrollbar-color: #fa9021 transparent;
        }
      `}</style>
    </div>
  );
};

export default AllTools;
