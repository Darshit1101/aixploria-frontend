import React, { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { IoMdStar } from "react-icons/io";
import { api } from "axiosApi";

const AllTools = () => {
  const [toolsByCategory, setToolsByCategory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await api.get(`/cards/getallcards`);
        const grouped = groupByCategory(response.data);
        setToolsByCategory(grouped);
      } catch (error) {
        console.error("Error fetching tools:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  const groupByCategory = (tools) => {
    const grouped = {};
    tools.forEach((tool) => {
      const category = tool.category || "Uncategorized";
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(tool);
    });
    return grouped;
  };

  const priorityCategories = [
    "Top 50 Trends [24h]",
    "Latest AI",
    "AI Exploria Selection",
    "Super Tools",
  ];

  if (loading) {
    return <div className="text-white p-6">Loading tools...</div>;
  }

  const sortedCategories = Object.entries(toolsByCategory).sort(([a], [b]) => {
    const aIndex = priorityCategories.indexOf(a);
    const bIndex = priorityCategories.indexOf(b);

    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    } else if (aIndex !== -1) {
      return -1;
    } else if (bIndex !== -1) {
      return 1;
    } else {
      return a.localeCompare(b);
    }
  });

  return (
    <div className="bg-black min-h-screen p-6 text-white font-[Poppins]">
      <div className="max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2">
        {sortedCategories.map(([category, tools]) => (
          <div key={category} className="bg-[#191919] p-5 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-3 text-center text-[#E67802]">
              {category}
            </h2>
            <ul className="space-y-2 max-h-64 overflow-y-auto custom-scroll">
              {tools.map((tool) => (
                <li
                  key={tool.id}
                  className="text-[#767676]  flex justify-between border border-[#767676] hover:text-[#767676] hover:bg-[#2a2a2a] px-3 py-2 rounded cursor-pointer"
                  onClick={() => window.open(`${tool.visitlink}`, "_blank")}
                >
                  <div className="flex items-center">
                    <IoMdStar className="mt-0.5" />
                    &nbsp;{tool.name}
                  </div>
                  <div className="border border-b-3 rounded-lg">
                    <ChevronUp />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Scrollbar styling */}
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
