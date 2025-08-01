import React, { useEffect, useState } from "react";
import HeroSection from "../Component/HeroSection";
import robot from "../Images/GAI.png";
import Star1 from "../Images/Star.png";
import { api } from "axiosApi";

const GptGallery = () => {
  const [gpts, setGpts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [gptRes, catRes] = await Promise.all([
        api.get(`/gpt/getallgpts`),
        api.get(`/gpt-categories/getgptcategories`),
      ]);
      setGpts(gptRes.data);
      setCategories(catRes.data);
    } catch (error) {
      console.error("Error loading GPTs or categories", error);
    }
  };

  const filteredGpts = gpts.filter((gpt) => {
    const matchesCategory =
      selectedCategory === "All" || gpt.GPTCategory?.name === selectedCategory;
    const matchesSearch = gpt.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className="bg-black">
        <HeroSection
          backgroundText="A I T O O L S"
          subtitle="Artificial intelligence for everyone"
          title="GPTs List"
          description="Th Best Custom GPTs to use in ChatgGPT"
          buttonText="GET A PREMIUM"
          buttonLink="/premium"
          buttonIcon={Star1}
          mainImage={robot}
          mainImageAlt="AI Assistant Robot"
        />

        <div className="font-[Poppins] px-4 py-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex text-white justify-between items-center mb-6">
            <h1 className="text-4xl text-orange-500 font-bold">GPTs</h1>
            <span className="bg-gray-200 text-black text-sm px-3 py-1 rounded">
              {gpts.length} GPTs
            </span>
          </div>

          {/* Search bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search for a GPTs..."
              className="w-full px-4 py-2 border text-white border-orange-500 rounded-xl bg-black placeholder-gray-200"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-6 ">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 border-2 border-white text-white rounded-full ${
                selectedCategory === "All" ? "bg-orange-500 text-blue-600" : ""
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 border-2 border-white text-white rounded-full ${
                  selectedCategory === cat.name
                    ? "bg-orange-500 text-blue-600"
                    : ""
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* GPT Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGpts.map((gpt) => {
              const link = gpt.link.startsWith("http")
                ? gpt.link
                : `https://${gpt.link}`;

              return (
                <div
                  key={gpt.id}
                  className="bg-[#191919] h-[250px] p-4 rounded-lg shadow hover:shadow-md transition flex flex-col justify-between"
                >
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 text-sm "
                  >
                    {" "}
                    <div>
                      <h2 className="text-2xl text-center text-orange-500 font-semibold mb-2">
                        {gpt.title}
                      </h2>
                      <p className="text-sm text-gray-200 text-center mb-3 break-words whitespace-normal">
                        {gpt.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex flex-wrap justify-center gap-1 text-sm text-gray-500">
                        {gpt.hashtags?.split(",").map((tag, index) => (
                          <span key={index}>#{tag.trim()}</span>
                        ))}
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}

            {filteredGpts.length === 0 && (
              <p className="text-center col-span-full text-gray-500">
                No GPTs found.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GptGallery;
