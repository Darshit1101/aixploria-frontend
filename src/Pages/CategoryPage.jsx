import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FeaturedCard from "../Component/FeaturedCard";
import API_BASE_URL from "../Admin/utils/api";
import axios from "axios";
import { api } from "axiosApi";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const [tools, setTools] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/cards/getallcards`);
        const allTools = res.data;

        // ✅ Extract and normalize all valid unique categories
        const categorySet = new Set();
        allTools.forEach((tool) => {
          if (tool.category && typeof tool.category === "string") {
            categorySet.add(tool.category.trim());
          }
        });
        const uniqueCategories = Array.from(categorySet).sort();
        setCategories(uniqueCategories);

        // ✅ Filter tools by selected category
        const filtered = allTools.filter(
          (tool) =>
            tool.category &&
            tool.category.toLowerCase().trim() === categoryName.toLowerCase()
        );
        setTools(filtered);
      } catch (err) {
        console.error("Failed to fetch tools:", err);
      }
    };

    fetchData();
  }, [categoryName]);

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    if (selected) {
      navigate(`/category/${selected}`);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="pt-24">
          <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-8 gap-4">
            <h1 className="text-2xl md:text-4xl font-bold text-center capitalize">
              {categoryName} Tools
            </h1>
            <select
              value={categoryName}
              onChange={handleCategoryChange}
              className="w-full sm:w-64 px-4 py-2 border border-[#FF9D2D] bg-black text-white rounded-full"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {tools.length > 0 ? (
            tools.map((tool) => (
              <FeaturedCard
                key={tool.id}
                name={tool.name}
                logo={
                  tool.image.startsWith("http") ||
                  tool.image.startsWith("https")
                    ? tool.image
                    : `https://${tool.image}`
                }
                description={tool.description}
                ranking={tool.views}
                verified={tool.verified}
                websiteUrl={
                  tool.visitlink?.startsWith("http")
                    ? tool.visitlink
                    : `https://${tool.visitlink}`
                }
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400">
              No tools found in this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
