import React from 'react';
import Country from "../Images/World.png";
import Desktop from "../Images/PC.png";
import Growth from "../Images/Growth.png";
import User from "../Images/User.png";

const SubmitFour = () => {
    const data = [
        {
            id: 1,
            digit: "500,000+",
            text: "Visitors Per Month",
            image: User,
        },
        {
            id: 2,
            digit: "5X",
            text: "Axploria Traffic Growth In 6 Months",
            image: Growth,
        },
        {
            id: 3,
            digit: "58%",
            text: "Of Visitors Use Desktop",
            image: Desktop,
        },
        {
            id: 4,
            digit: "200+",
            text: "Countries Reached By Our Visitors",
            image: Country,
        },
    ];

    return (
        <div className="bg-[#191919] py-10">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
                    {data.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col items-center text-center w-full "
                        >
                            <img src={item.image} alt={item.text} className="mb-4 w-[86px] h-[101px]" />
                            <h2 className="text-[#FA9021] text-2xl font-bold mb-1">{item.digit}</h2>
                            <p className="text-[#767676] text-sm">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubmitFour;
