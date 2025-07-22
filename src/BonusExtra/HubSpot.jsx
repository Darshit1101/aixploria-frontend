import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRobot, FaPencilAlt, FaRocket, FaBullhorn } from "react-icons/fa";
import { MdOutlineContentPasteSearch } from "react-icons/md";
import { SiWordpress } from "react-icons/si";
import { GiWorld } from "react-icons/gi";
import API_BASE_URL from "../Admin/utils/api";

const iconMap = {
  robot: <FaRobot className="text-orange-500 text-2xl" />,
  pencil: <FaPencilAlt className="text-orange-500 text-2xl" />,
  rocket: <FaRocket className="text-orange-500 text-2xl" />,
  bullhorn: <FaBullhorn className="text-orange-500 text-2xl" />,
  search: <MdOutlineContentPasteSearch className="text-orange-500 text-2xl" />,
  wordpress: <SiWordpress className="text-orange-500 text-2xl" />,
  world: <GiWorld className="text-orange-500 text-2xl" />,
};

const HubSpot = () => {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    const fetchHubspots = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/hubspot/`);
        console.log("Raw API response:", res.data); // DEBUG

        const formatted = Array.isArray(res.data)
          ? res.data.map((tool) => {
            let parsedOptions = [];

            try {
              // Parse first level
              const level1 = JSON.parse(tool.options);
              // Parse second level if it's a string
              parsedOptions = Array.isArray(level1)
                ? JSON.parse(level1[0])
                : [];
            } catch (e) {
              console.warn("Failed to parse options for tool:", tool.title);
            }

            return {
              ...tool,
              options: parsedOptions,
            };
          })
          : [];

        setTools(formatted);
      } catch (error) {
        console.error("Failed to fetch tools:", error);
      }
    };

    fetchHubspots();
  }, []);


  return (
    <div className="bg-black min-h-screen font-sans py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1D1D1F] mb-2">
          <span className="inline-flex items-center gap-2 text-orange-600">
            <img
              src="https://static.hsappstatic.net/ui-icons/static-2.11.0/images/logo.svg"
              alt="HubSpot"
              className="w-6 h-6"
            />
            HubSpot AI tools
          </span>
        </h1>
        <p className="italic text-gray-100 text-sm mb-2">
          For enterprises and professionals
        </p>
        <p className="text-lg text-[#767676] font-medium mb-12">
          Discover a list of top-quality and secure tools
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <a href={tool.link.startsWith("http") ? tool.link : `https://${tool.link}`} target="_blank" rel="noopener noreferrer">
              <div
                key={index}
                className="bg-[#191919] p-6 rounded-xl h-[300px] shadow-md text-left hover:shadow-lg transition-all"
              >
                <div className="flex items-center border-b-2 border-red-200 py-2 gap-3 mb-4 font-semibold text-lg text-white">
                  {iconMap[tool.iconKey] || iconMap.robot}
                  {tool.title}
                </div>
                {/* <div className="text-sm text-gray-500">
                  {tool.description}
                </div> */}
                <ul className="text-[16px] text-[#767676] space-y-2 list-disc pl-5">
                  {tool.options && tool.options.length > 0 ? (
                    tool.options.map((point, idx) => <li key={idx}>{point}</li>)
                  ) : (
                    <li>No features listed</li>
                  )}
                </ul>
              </div></a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HubSpot;
