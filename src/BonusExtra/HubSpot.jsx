import React, { useEffect, useState } from "react";
import axios from "axios";
import robot from "../Images/GAI.png";
import Star1 from "../Images/Star.png";
import HeroSection from "../Component/HeroSection";
import API_BASE_URL from "../Admin/utils/api";

const HubSpot = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/hubspot`);
        const data = response.data.data || [];
        // Parse options if it's a JSON string
        const formattedTools = data.map((tool) => ({
          ...tool,
          options:
            typeof tool.options === "string" &&
            tool.options.startsWith("[") &&
            tool.options.endsWith("]")
              ? JSON.parse(tool.options)
              : Array.isArray(tool.options)
              ? tool.options
              : [],
        }));
        setTools(formattedTools);
      } catch (error) {
        console.error("Error fetching tools:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading tools...</div>;
  }

  return (
    <>
      <HeroSection
        backgroundText="A I T O O L S"
        subtitle="Artificial intelligence for everyone"
        title="HubSpot AI tools"
        description="For enterprises and professionals Discover a list of top-quality and secure tools"
        buttonText="GET A PREMIUM"
        buttonLink="/premium"
        buttonIcon={Star1}
        mainImage={robot}
        mainImageAlt="AI Assistant Robot"
      />

      <div className="bg-black min-h-screen font-sans py-16 px-4 sm:px-8 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4">
            DISCOVER A LIST OF TOP-QUALITY AND SECURE TOOLS
          </h1>
          <p className="text-gray-300 text-sm mb-12">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 relative">
            {tools?.length > 0 ? (
              tools?.map((tool) => (
                <div
                  key={tool.id}
                  className="relative bg-[#1e1e1e] rounded-[30px] p-8 text-left min-h-[320px] flex flex-col justify-start"
                >
                  <div
                    className="absolute top-6 left-0 z-20"
                    style={{ transform: "translate(0, -50%)" }}
                  >
                    <div className="flex items-center justify-center shadow-lg">
                      {/* {iconMap[tool.iconKey] || Star1} */}
                      <img
                        className="h-30 w-full"
                        src={`${API_BASE_URL}/${tool.image}`}
                        alt="hubspot"
                      />
                    </div>
                  </div>

                  <div className="absolute right-0 -top-22 text-[200px] text-[#2a2a2a] font-bold opacity-20 select-none pointer-events-none">
                    AI
                  </div>

                  <h3 className="text-lg font-semibold text-[#FFA500] mb-4 uppercase mt-12">
                    {tool.title}
                  </h3>

                  {tool.options && tool.options.length > 0 ? (
                    <ul className="text-gray-300 text-sm space-y-2 flex-grow">
                      {tool.options.map((point, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="mr-2">-</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-300 text-sm flex-grow">
                      {tool.description || "No description available"}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <p>No tools found. Please add some through the admin panel.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HubSpot;
