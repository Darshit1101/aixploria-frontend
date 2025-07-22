import React, { useState } from "react";

const priceOptions = ["Free", "Premium", "Free Trial", "Paid"];

const SubmitUpdateAIForm = () => {
    const [selectedPrices, setSelectedPrices] = useState(["Free"]);
    const [imageFile, setImageFile] = useState(null);
    const [videoLink, setVideoLink] = useState("");

    const handlePriceToggle = (option) => {
        setSelectedPrices((prev) =>
            prev.includes(option)
                ? prev.filter((item) => item !== option)
                : [...prev, option]
        );
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    return (
        <div className="bg-black  text-white font-[Poppins] px-4 py-10">
            {/* Header */}
            <div className="bg-[#1C1C1C] rounded-3xl p-6 sm:p-10 w-full">
                <h2 className="md:text-[40px] text-[20px] font-semibold text-[#FA9021] text-center">
                    UPDATE YOUR SITE $36
                </h2>
                <p className="text-[16px] sm:text-sm text-center text-[#FFFFFF] mt-1">
                    Quick and efficient updates to your listing
                </p>

                {/* Form */}
                <form className="mt-6 space-y-4 w-full">
                    <label htmlFor="" className="text-[#595959]">Email</label>
                    <input
                        type="email"
                        className="w-full px-4 py-3 rounded-md bg-black border border-[#2C2C2C] placeholder-gray-400 outline-none"
                    />

                    <label htmlFor="" className="text-[#595959]">WEBSITE NAME</label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 rounded-md bg-black border border-[#2C2C2C] placeholder-gray-400 outline-none"
                    />

                    <label htmlFor="" className="text-[#595959]">DESCRIPTION</label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 rounded-md bg-black border border-[#2C2C2C] placeholder-gray-400 outline-none"
                    />

                    <label htmlFor="" className="text-[#595959]">YOUR TEXT (SEO)</label>
                    <textarea
                        className="w-full px-4 py-3 h-24 rounded-md bg-black border border-[#2C2C2C]  resize-none outline-none"
                    ></textarea>

                    {/* Price Options with Checkboxes */}
                    <div className="flex gap-4 justify-center flex-wrap mt-4">
                        <p className="mt-4 text-gray-500">Price</p>
                        {priceOptions.map((option) => (
                            <label
                                key={option}
                                className="flex items-center bg-black p-5 rounded-xl gap-2 text-sm text-white cursor-pointer"
                            >
                                
                                <input
                                    type="checkbox"
                                    checked={selectedPrices.includes(option)}
                                    onChange={() => handlePriceToggle(option)}
                                    className="accent-orange-500"
                                />
                                <span>{option.toUpperCase()}</span>
                            </label>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <div className="text-center mt-6">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-[#E67802] to-[#FB9E3C] text-white py-3 px-10 rounded-full font-semibold"
                        >
                            CONTINUE
                        </button>
                    </div>
                </form>

                {/* Upload Section */}
                <div className="mt-10 w-full">
                    <h3 className="md:text-[40px] text-[20px] text-center text-[#FA9021] font-semibold mb-1">
                        UPDATE YOUR SITE $36
                    </h3>
                    <p className="text-[16px]  text-center text-white mb-6">
                        Quick and efficient updates to your listing
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        {/* Image Upload */}
                        <label className="border-4 border-dashed bg-black border-[#3A3A3A] rounded-xl h-32 flex items-center justify-center text-sm text-white cursor-pointer hover:border-[#FA9021] transition relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <div className="text-center z-10">
                                <p className="font-semibold">UPLOAD YOUR IMAGE</p>
                                <p className="text-xs text-gray-400">
                                    {imageFile ? imageFile.name : "Click to choose file or drag here"}
                                </p>
                            </div>
                        </label>

                        {/* Video Input */}
                        <div className="border-4 bg-black border-dashed border-[#3A3A3A] rounded-xl h-32 flex items-center justify-center text-sm text-white hover:border-[#FA9021] transition px-4">
                            <div className="text-center w-full">
                                <p className="font-semibold mb-2">ADD A VIDEO</p>
                                <input
                                    type="text"
                                    value={videoLink}
                                    onChange={(e) => setVideoLink(e.target.value)}
                                    placeholder="https://youtu.be/..."
                                    className="w-full bg-transparent border-b border-gray-600 text-sm placeholder-gray-400 focus:outline-none text-center"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Processing Time Section */}
            <div className="bg-[#1C1C1C] mt-10 w-full rounded-2xl px-6 py-6">
                <h4 className="text-white font-[600] text-[40px] mb-2">• PROCESSING TIME</h4>
                <ul className="text-[16px] text-gray-400 list-disc ml-5 space-y-1">
                    <li>Quick Turnaround For Your Updates</li>
                    <li>
                        <span className="text-[#FA9021] font-medium">
                            Published Within 2 Business Days
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SubmitUpdateAIForm;
