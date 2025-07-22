import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import Star3 from "../Images/3Star.png"; // Keep same path
import Star from "../Images/Star.png";   // Keep same path

const pricingPlans = [
    {
        id: 1,
        title: "Quick Boost",
        price: "$399",
        label: "(3 Days)",
        highlight: "Perfect for short advertising campaigns",
        features: [
            "Featured For 3 Days",
            "Gold Checkmark Status",
            "Premium Support Included",
            "Display On Competitor Pages",
            "Indexed On Google",
        ],
        buttonText: "GET STARTED",
        popular: true,
    },
    {
        id: 2,
        title: "Standard Promotion",
        price: "$899",
        label: "(7 Days)",
        highlight: "Ideal for medium-term visibility",
        features: [
            "Featured For 7 Days",
            "Gold Checkmark Status",
            "Premium Support Included",
            "Display On Competitor Pages",
            "Indexed On Google",
        ],
        buttonText: "CONTACT US",
        popular: true,
    },
    {
        id: 3,
        title: "Extended Visibility",
        price: "$399",
        label: "(3 Days)",
        highlight: "Maximum exposure for your AI service",
        features: [
            "Featured For 15 Days",
            "Gold Checkmark Status",
            "Premium Support Included",
            "Display On Competitor Pages",
            "Indexed On Google",
        ],
        buttonText: "CONTACT US",
        popular: true,
    },
];

const SubmitAdvertiseAICard = () => {
    return (
        <div className="bg-black py-12 flex flex-col items-center px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
                {pricingPlans.map((plan) => (
                    <div
                        key={plan.id}
                        className="relative bg-[#1C1C1C] rounded-2xl shadow-lg text-white flex flex-col justify-between md:-h-[526px] p-6"
                    >
                        <div className="absolute right-5  w-[80px] h-[80px] rounded-full bg-orange-400 opacity-40 blur-2xl z-0" />
                        <div className="absolute text-[150px] font-black text-gray-500/5 -top-16 left-0 select-none pointer-events-none z-0">
                            AI
                        </div>

                        <div className="z-10 flex flex-col flex-grow">
                            <div className="text-center">
                                <h3 className="text-[#FA9021] text-[16px] md:text-[26px] font-[600]">{plan.title}</h3>
                                {plan.popular && (
                                    <div className="relative">
                                        <img src={Star3} alt="" className="md:w-20 md:h-20 w-12 h-12 absolute right-0" />
                                    </div>
                                )}
                                <p className="text-[30px] md:text-[46px] font-[700] mt-2">{plan.price}</p>
                                <p className="text-[10px] md:text-[14px] text-[#767676]">{plan.label}</p>
                                <div className="flex items-center gap-2 mt-5">
                                    <FaCheckCircle className="text-green-400" />
                                    <p className="text-[12px] text-[#767676]">{plan.highlight}</p>
                                </div>

                            </div>
                            <div>
                                <p className="-mb-5 mt-5 text-[18px] font-[600]"> {plan.title}</p>
                            </div>

                            <ul className="mt-6 space-y-2 list-disc pl-4 text-[14px] text-[#767676]">
                                {plan.features.map((feature, index) => (
                                    <li key={index}>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                        </div>

                        <div className="mt-6 z-10">
                            <button
                                className="bg-gradient-to-r from-[#E67802] to-[#FB9E3C] text-white md:py-4 py-2 md:px-8 px-6 rounded-full text-[10px] md:text-sm font-semibold w-full"
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

export default SubmitAdvertiseAICard;
