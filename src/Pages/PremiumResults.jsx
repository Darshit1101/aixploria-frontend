import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FeaturedCard from "../Component/FeaturedCard";
import API_BASE_URL from "../Admin/utils/api";

const PremiumResults = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [premiumTypes, setPremiumTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${API_BASE_URL}/api/cards`);
      const tools = res.data;

      // Extract unique premium types
      const uniqueTypes = [...new Set(tools.map((tool) => tool.premiumtype))];
      setPremiumTypes(uniqueTypes);

      const filteredByType = tools.filter(
        (tool) => tool.premiumtype === type
      );
      setResults(filteredByType);
    };

    fetchData();
  }, [type]);

  const handlePremiumChange = (e) => {
    const selected = e.target.value;
    if (selected) {
      navigate(`/premium/${selected}`);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white"><br /><br />
      <div className="px-4 py-8 max-w-7xl mx-auto">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-4">Premium Type: {type}</h1>
          <select
            value={type}
            onChange={handlePremiumChange}
            className="w-full sm:w-64 px-4 py-2 border border-[#FF9D2D] bg-black text-white rounded-full"
          >
            <option value="">Select Premium Type</option>
            {premiumTypes.map((pt) => (
              <option key={pt} value={pt}>
                {pt}
              </option>
            ))}
          </select>
        </div>

        {/* Grid of Tools */}
        <div><br />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {results.map((tool) => (
              <FeaturedCard
                key={tool.id}
                name={tool.name}
                logo={`${API_BASE_URL}${tool.image}`}
                description={tool.description}
                ranking={tool.views}
                verified={tool.verified}
                websiteUrl={`https://${tool.visitlink}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumResults;
