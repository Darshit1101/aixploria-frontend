import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import FeaturedCard from "../Component/FeaturedCard"; // adjust path as needed
import API_BASE_URL from "../Admin/utils/api";

const SearchResults = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/cards`);
        const filtered = res.data.filter((tool) =>
          tool.name.toLowerCase().includes(query.toLowerCase())
        );
        setTools(filtered);
      } catch (err) {
        console.error("Failed to fetch search results:", err);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchSearchResults();
  }, [query]);

  return (
    <>
    <div className="bg-black"><br /><br />
      <div className="bg-black text-white px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">
            Search Results for: <span className="text-[#FF9D2D]">{query}</span>
          </h1>

          {loading ? (
            <p>Loading...</p>
          ) : tools.length === 0 ? (
            <p>No results found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {tools.map((tool) => (
                <FeaturedCard
                  key={tool.id}
                  name={tool.name}
                  logo={`${API_BASE_URL}${tool.image}`}
                  description={tool.description}
                  ranking={tool.views}
                  verified={tool.verified}
                  websiteUrl={
                    tool.visitlink?.startsWith("http")
                      ? tool.visitlink
                      : `https://${tool.visitlink}`
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  );
};

export default SearchResults;
