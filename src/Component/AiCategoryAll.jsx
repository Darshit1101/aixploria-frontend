import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from "../Admin/utils/api";
import { IoMdStar } from "react-icons/io";
import { ChevronUp } from 'lucide-react';
const AllTools = () => {
  const [toolsByCategory, setToolsByCategory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/cards`); // <-- Replace with your actual endpoint
        const grouped = groupByCategory(response.data);
        setToolsByCategory(grouped);
      } catch (error) {
        console.error('Error fetching tools:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  const groupByCategory = (tools) => {
    const grouped = {};
    tools.forEach((tool) => {
      const category = tool.category || 'Uncategorized';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(tool);
    });
    return grouped;
  };

  if (loading) {
    return <div className="text-white p-6">Loading tools...</div>;
  }

  return (
    <div className="bg-black min-h-screen p-6 text-white font-[Poppins]">
      <div className="max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2">
        {Object.entries(toolsByCategory).map(([category, tools]) => (
          <div key={category} className="bg-[#191919] p-5 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-3 text-center text-[#E67802]">{category}</h2>
            <ul className="space-y-2 max-h-64 overflow-y-auto custom-scroll">
              {tools.map((tool) => (
                <li
                  key={tool.id}
                  className="text-[#767676] flex justify-between items-center hover:text-white hover:bg-[#2a2a2a] px-3 py-2 rounded-lg cursor-pointer border border-[#767676]"
                  onClick={() => window.open(`https://${tool.visitlink}`, '_blank')}
                >
                  <div className="flex items-center">
                    <IoMdStar className="mt-0.5" />
                    &nbsp;{tool.name}
                  </div>
                  <div className='border border-b-3 rounded-lg'>
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
