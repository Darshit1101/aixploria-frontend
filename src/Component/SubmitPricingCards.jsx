import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import Star3 from "../Images/3Star.png";
import Star from "../Images/Star.png";

const pricingPlans = [
  {
    id: 1,
    title: "Fast Listing",
    price: "$79",
    label: "(one time fee)",
    popular: false,
    buttonText: "SUBMIT WEBSITE",
    buttonColor: "bg-gradient-to-r from-[#E67802] to-[#FB9E3C]",
    tag: null,
    features: [
      "Listed in 'Latest AI' On Home Page + Full AI List",
      "7 Days In 'AIxploria Selection'",
      "Up to 90 characters description",
      "1 extra link to product",
      "Indexed on Google",
    ],
  },
  {
    id: 2,
    title: "Verified Listing",
    price: "$279",
    label: "(one time fee)",
    popular: true,
    buttonText: "SUBMIT WEBSITE",
    buttonColor: "bg-gradient-to-r from-[#E67802] to-[#FB9E3C]",
    tag: "POPULAR",
    features: [
      "Verified badge next to your tool",
      "30 Days In 'AIxploria Selection'",
      "Description of up to 165 characters",
      "Extra link to your website",
      "Priority approval",
    ],
  },
  {
    id: 3,
    title: "Featured Ads",
    price: "$399",
    label: "(one time fee)",
    popular: false,
    buttonText: "BOOK A PLACE",
    buttonColor: "bg-gradient-to-r from-[#E67802] to-[#FB9E3C]",
    tag: null,
    features: [
      "Pinned on homepage featured section",
      "45 Days In 'AIxploria Selection'",
      "Extra-large banner",
      "2 extra links",
      "Top visibility + Google indexing",
    ],
  },
];

const ListingIncludes = ({ features }) => (
  <div>
    <div className="flex items-center gap-2 mb-2">
      <FaCheckCircle className="text-green-400" />
      <p className="text-[12px] text-[#2FAB73]">Published with priority</p>
    </div>
    <p className="mt-3 font-semibold text-[14px] md:text-[18px] text-white">Listing includes</p>
    <ul className="mt-2 space-y-2 list-disc pl-4 text-[13px] text-[#767676]">
      {features.map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>
  </div>
);

const SubmitPricingCards = () => {
  return (
    <div className="bg-black py-12 flex flex-col items-center px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-7xl">
        {pricingPlans.map((plan) => (
          <div
            key={plan.id}
            className="relative bg-[#1C1C1C] rounded-2xl shadow-lg text-white flex flex-col justify-between w-full p-6"
          >
            {/* Glow Circle */}
            <div className="absolute right-5 w-[80px] h-[80px] rounded-full bg-orange-400 opacity-40 blur-2xl z-0" />

            {/* Background watermark */}
            <div className="absolute text-[100px] sm:text-[150px] font-black text-gray-500/5 -top-10 left-0 select-none pointer-events-none z-0">
              AI
            </div>

            {/* POPULAR Tag */}
            {plan.popular && (
              <div className="absolute top-0 left-0 z-10">
                <div className="bg-gradient-to-br from-[#FA9021] to-[#FFA726] text-white text-xs font-bold px-6 py-2 rounded-br-[80px] relative shadow-md">
                  {plan.tag}
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center shadow-sm">
                    <img src={Star} alt="" />
                  </div>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="z-10 flex flex-col flex-grow">
              <div className="text-center relative">
                <h3 className="text-[#FA9021] text-[16px] md:text-[26px] font-[600]">
                  {plan.title}
                </h3>
                {plan.popular && (
                  <img
                    src={Star3}
                    alt=""
                    className="md:w-20 md:h-20 w-12 h-12 absolute right-0"
                  />
                )}
                <p className="text-[30px] md:text-[46px] font-[700] mt-2">
                  {plan.price}
                </p>
                <p className="text-[10px] md:text-[14px] text-[#767676]">
                  {plan.label}
                </p>
              </div>

              <div className="mt-6 flex-grow">
                <ListingIncludes features={plan.features} />
              </div>
            </div>

            {/* Bottom action */}
            <div className="mt-6 z-10">
              <p className="text-[#2FAB73] text-[10px] md:text-sm underline cursor-pointer text-center mb-2">
                Why we charge
              </p>
              <button
                className={`${plan.buttonColor} text-white md:py-4 py-2 md:px-8 px-6 rounded-full text-[10px] md:text-sm font-semibold w-full`}
              >
                {plan.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubmitPricingCards;
