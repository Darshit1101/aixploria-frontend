import React from "react";
import AINewsImg from "../Images/AIWorld.png"; // Make sure the path is correct

export default function AiVideoTutorial() {
    return (
        <div className="bg-black text-white font-[Poppins] py-12 px-4 md:px-12 font-[Poppins]">
            {/* Top Section */}
            <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto items-center mb-16">
                <img
                    src={AINewsImg}
                    alt="AI Visual"
                    className="w-full md:w-[50%] rounded-xl object-cover shadow-lg"
                />
                <div className="w-full md:w-[50%] flex flex-col gap-6 font-[Poppins]">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">AI News for Everyone</h2>
                        <p className="text-[#cfcfcf] text-sm leading-relaxed">
                            Welcome to AIxploria, the reference platform for learning about artificial intelligence!
                            Our collection of free online AI video tutorials and training courses has been carefully
                            selected with the aim of providing AI professionals, educators and enthusiasts with a
                            powerful service.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-2">A Cocktail of AI News for All Tastes</h2>
                        <ul className="list-disc list-inside text-[#cfcfcf] text-sm space-y-1">
                            <li>AIxploria’s interface is optimized for a fluid learning experience:</li>
                            <li>Interactive video grid for a quick overview of content</li>
                            <li>Instant playback of tutorials directly on the page</li>
                            <li>Drop-down menu for precise selection by AI tool</li>
                            <li>Powerful search bar to quickly find specific topics</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="bg-[#1f1f1f] relative rounded-xl shadow-lg px-8 py-10 text-center max-w-7xl mx-auto mb-16">
                <div className="absolute md:block hidden -top-35 -right-5 md:text-[350px] font-black text-white/5 z-0 select-none">
                    AI
                </div>
                <h2 className="text-[#FA9021] text-2xl md:text-4xl font-bold mb-6 uppercase">
                    Dive into the Heart of AI with Our AI News Page
                </h2>

                <ul className="text-[#767676] uppercase text-[16px] text-left list-decimal list-inside space-y-4  mb-6">
                    <li><strong>Continuous News:</strong> Stay in touch with the latest developments, spectacular advances and juicy anecdotes from the world of artificial intelligence.</li>
                    <li><strong>A Variety of Sources:</strong> We draw on a wide range of sources to provide you with a comprehensive overview. From academics to manufacturers, from start-ups to technology giants, you have access to a mosaic of information.</li>
                    <li><strong>A Polished User Experience:</strong>Our page is designed to make navigation smooth, intuitive and enjoyable. Ergonomics is at the heart of our approach, so that you can find the information you’re looking for quickly and easily.</li>
                    <li><strong>Visual Comfort:</strong> We know that reading comfort is crucial, especially when plunging into the depths of AI. That’s why our page features a dark mode for resting your eyes during your nocturnal explorations.</li>
                </ul>

                <p className="text-[#767676] uppercase text-left text-[16px] leading-relaxed ">
                    Our AI News page is more than just a source of information; it’s an open window on artificial intelligence accessible to everyone, at any time. You don’t need to be a technophile expert or hold a PhD in computer science to enjoy our content – anyone with a hint of curiosity about artificial intelligence will find our page a treasure trove of information to accompany their discovery. It’s your personal invitation to an exciting journey into the heart of tomorrow’s technology.
                </p>
            </div>

            {/* Footer Grid Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
                {/* Box 1 */}
                <div className="bg-[#1f1f1f] relative rounded-xl shadow-md p-6">
                    <div className="absolute -top-18 -right-2 text-[180px] font-black text-white/5 z-0 select-none">
                        AI
                    </div>

                    <h3 className="text-[#FA9021] text-xl md:text-3xl font-semibold mb-3 uppercase">Little Extra</h3>
                    <p className="text-[#767676] text-[16px] leading-relaxed">
                        For those who prefer the video format, AIxploria also offers a section called AI YouTube, which brings
                        together captivating visual content to follow AI news in a dynamic and interactive way.
                    </p>
                </div>

                {/* Box 2 */}
                <div className="bg-[#1f1f1f] relative rounded-2xl shadow-md p-6">
                    <div className="absolute -top-18 -right-2 text-[180px] font-black text-white/5 z-0 select-none">
                        AI
                    </div>
                    <h3 className="text-[#FA9021] text-xl md:text-3xl font-semibold mb-3 uppercase">In Conclusion</h3>
                    <p className="text-[#767676] text-[16px] leading-relaxed">
                        In our news section, every day is a discovery, every article an adventure. We promise you AI news
                        served up on a silver platter, with a pinch of conviviality and a healthy dose of surprises. Embark with
                        us on a captivating journey into the world of artificial intelligence—your perfect starting point to
                        explore, understand, and marvel at the prowess of AI.
                    </p>
                </div>
            </div>
        </div>
    );
}
