import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import SubmitPricingCard from "../Component/SubmitPricingCards"; // Adjust path if needed
import SubmitAdvertiseAICard from "../Component/SubmitAdvertiseAICard"; // Adjust path if needed
import SubmitUpdateAIForm from "./SubmitUpdateAIForm";

const tabs = ["Submit AI", "Advertise AI", "Update AI", "Submit GPT"];

const tabContent = {
  "Submit AI": <SubmitPricingCard />,
  "Advertise AI": <SubmitAdvertiseAICard />,
  "Update AI": <SubmitUpdateAIForm/>,
  "Submit GPT": <div className="text-white">This is Submit GPT content</div>,
};

const PricingTabs = () => {
  const [activeTab, setActiveTab] = useState("Submit AI");

  return (
    <>
    
      <div className="w-full bg-black font-[Poppins] px-4 py-8">
        {/* Responsive Tab Buttons */}
        <div className="flex overflow-x-auto mt-5 gap-3 sm:justify-center whitespace-nowrap scrollbar-hide mb-8">
          {tabs.map((tab) => (
            <div key={tab} className="relative">
              <button
                onClick={() => setActiveTab(tab)}
                className={`px-6 sm:px-10 py-3 rounded-full font-medium text-sm transition-all border min-w-fit
                ${activeTab === tab
                    ? "bg-gradient-to-r from-[#E67802] to-[#FB9E3C] text-white border-none"
                    : "bg-[#191919] text-white border border-[#FF8A00]"
                  }`}
              >
                {tab}
              </button>

              {/* Show white star on active 'Advertise AI' tab */}
              {tab === "Advertise AI" && activeTab === tab && (
                <FaStar className="absolute top-0 -right-1 text-white text-[18px] z-99" />
              )}
              {/* Gray star on inactive 'Advertise AI' tab */}
              {tab === "Advertise AI" && activeTab !== tab && (
                <FaStar className="absolute top-0 -right-1 text-gray-500 text-[18px] z-99" />
              )}
            </div>
          ))}
        </div>

        {/* Tab Content Area */}
        <div className="bg-black rounded-2xl p-4 sm:p-6 shadow-lg">
          {tabContent[activeTab]}
        </div>
      </div></>
  );
};

export default PricingTabs;
