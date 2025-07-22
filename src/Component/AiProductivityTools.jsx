import React from "react";
import { CheckCircle } from "lucide-react";

// Simulated API data
const toolCategories = [
    {
        id: 1,
        title: "AI Productivity Tools",
        items: [
            { name: "E-mail", count: 54 },
            { name: "Education / Studies", count: 222 },
            { name: "Extensions ChatGPT", count: 97 },
            { name: "Files & Spreadsheets", count: 70 },
            { name: "Memory", count: 21 },
            { name: "Search engine", count: 62 },
            { name: "Presentation", count: 26 },
            { name: "Productivity", count: 242 },
            { name: "Translation", count: 42 },
        ],
    },
    {
        id: 2,
        title: "AI Assistants",
        items: [
            { name: "Legal Assistants", icon: "IconLegal", count: 23 },
            { name: "Life Assistants", icon: "IconLife", count: 208 },
            { name: "AI Chat & Assistant", icon: "IconChat", count: 39 },
            { name: "ChatBots", icon: "IconBot", count: 110 },
        ],
    },
    {
        id: 3,
        title: "AI Video Tools",
        items: [
            { name: "E-mail", count: 54 },
            { name: "Education / Studies", count: 222 },
            { name: "Extensions ChatGPT", count: 97 },
            { name: "Files & Spreadsheets", count: 70 },
            { name: "Memory", count: 21 },
            { name: "Search engine", count: 62 },
            { name: "Presentation", count: 26 },
            { name: "Productivity", count: 242 },
            { name: "Translation", count: 42 },
        ],
    },
    {
        id: 4,
        title: "AI Video Tools",
        items: [
            { name: "E-mail", count: 54 },
            { name: "Education / Studies", count: 222 },
            { name: "Extensions ChatGPT", count: 97 },
            { name: "Files & Spreadsheets", count: 70 },
            { name: "Memory", count: 21 },
            { name: "Search engine", count: 62 },
            { name: "Presentation", count: 26 },
            { name: "Productivity", count: 242 },
            { name: "Translation", count: 42 },
        ],
    },
];

const AiProductivityTools = () => {
    return (
        <div className="flex flex-wrap gap-6 justify-center items-start p-6 bg-black min-h-screen">
            {toolCategories.map((category) => (
                <div
                    key={category.id}
                    className="relative w-[609px] h-[300px] bg-white/5 text-white rounded-[30px] p-6 overflow-hidden shadow-lg border border-white/20"
                >
                    {/* Optional badge */}
                    <div className="absolute top-[-12px] right-[-12px]">
                        {/* <div className="bg-gradient-to-br from-[#FF7300] to-[#FF4E00] p-2 rounded-[20px] shadow-md">
              <CheckCircle size={24} className="text-white" />
            </div> */}
                    </div>

                    {/* Title */}
                    <h2 className="text-[30px] font-[Poppins] font-bold mb-4">{category.title}</h2>

                    {/* Scrollable list */}
                    <div className="overflow-y-auto pr-1 h-[200px] custom-scroll font-[Poppins]">
                        <ul className="space-y-2 text-sm">
                            {category.items.map((item, index) => (
                                <li key={index}>
                                    <div className="absolute text-[200px] font-black text-gray-500/1 -bottom-15 right-0 select-none pointer-events-none z-0">
                                        AI
                                    </div>
                                    <a
                                        href="#"
                                        className="flex items-center text-[#767676] text-[16px] hover:text-white transition"
                                    >

                                        <span>{item.name}&nbsp; </span>
                                        <span>({item.count})</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AiProductivityTools;