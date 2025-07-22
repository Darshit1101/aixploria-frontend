

import React from 'react'
import Ninja from '../Images/Ninja.png'
import Phone from '../Images/Phone.png'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="bg-black w-full">
            {/* Get in Touch Section */}
            <div className='flex items-center justify-center px-4 py-12'>
                <div className="relative text-center flex flex-col items-center justify-center">
                    {/* Orange stroke text behind */}
                    <h2
                        className="absolute top-0 xl:left-15   text-[10vw] sm:text-[75px] font-thin font-[Poppins] text-transparent z-0 pointer-events-none"
                        style={{
                            WebkitTextStroke: '1px #f97316',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Get in Touch
                    </h2>

                    {/* White filled text on top */}
                    <h2 className="relative text-white text-[10vw] sm:text-[72px] font-extrabold font-[Poppins] z-10">
                        Get in Touch
                    </h2>

                    <p className="font-[Poppins] text-base sm:text-lg text-[#FFFFFF] max-w-xl mt-4 px-4 text-center">
                        Set a secondary sales fee and add social links, a description, profile and banner images, and a description.
                    </p>
                </div>
            </div>

            {/* Ninja and Input */}
            <div className='flex flex-col md:flex-row items-center justify-center px-6 gap-8 py-10'>
                <div className='w-[180px] sm:w-[220px]'>
                    <img src={Ninja} alt="Ninja" className="w-full h-auto" />
                </div>
                <div className='w-full md:w-2/3'>
                    <input
                        type="text"
                        placeholder='Enter your email address'
                        className='bg-[#191919] w-full h-[50px] text-white outline-none p-5 placeholder:text-gray-500 rounded-[16px]'
                    />
                    {/* <div className='flex justify-center mt-5 relative'>
                        <button className='text-white px-10 bg-gradient-to-r from-[#E67802] to-[#FB9E3C] py-3 rounded-full'>
                            Contact Us
                        </button>
                        <img src={Phone} alt="Phone" className='md:absolute md:right-38 md:top-2 lg:right-60 xl:right-95 -translate-y-1/2 hidden md:block w-8 h-8' />
                    </div> */}
                    <div className="flex justify-center">
                        <div
                            className="inline-flex mt-10 items-center relative font-[Poppins] px-6 py-3 rounded-full bg-gradient-to-r from-[#E67802] to-[#FB9E3C] text-white font-medium hover:scale-105 hover:shadow-lg transition"
                        >
                            Contact Us
                            <img
                                src={Phone}
                                alt=""
                                className="absolute -top-2 -right-2 w-7 h-7"
                            />
                        </div>
                    </div>

                </div>
            </div>

            {/* Footer Main Grid */}
            <div className="px-6 py-12 border-gray-800 font-[Poppins]">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 max-w-7xl mx-auto text-sm">
                    {/* Logo/Intro */}
                    <div className="col-span-2 sm:col-span-1">
                      <div className="flex">
                        <h3 className="text-2xl font-extrabold text-orange-500">AI</h3>
                        <h4 className="font-bold text-white text-2xl">XPLORIA</h4>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">Artificial intelligence for everyone</p>
                        <div className="flex gap-2 mt-3">
                            <img src="https://flagcdn.com/us.svg" alt="US" className="w-5 h-4" />
                            <img src="https://flagcdn.com/fr.svg" alt="FR" className="w-5 h-4" />
                        </div>
                    </div>

                    {/* Columns */}
                    <div>
                        <h5 className="font-medium text-[#FA9021] mb-2 text-[17px]">Know Us</h5>
                        <ul className="text-[#767676] space-y-2">
                            <li>Home</li>
                            <li>About Us</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-medium text-[#FA9021] mb-2 text-[17px]">Useful Tools</h5>
                        <ul className="text-[#767676] space-y-2">
                            <li>Best AI Youtube Channels</li>
                            <li>Top 100 AI</li>
                            <li>GPTs List</li>
                            <li>Hubspot AI Tools</li>
                            <li>Best AI Agents</li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-medium text-[#FA9021] mb-2 text-[17px]">Resources</h5>
                        <ul className="text-[#767676] space-y-2">
                            <li>Tutorials, tips and blog</li>
                            <li>AI Conferences Agenda</li>
                            <li>AI Glossary & Lexicon</li>
                            <li>Explore AI Jobs</li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-medium text-[#FA9021] mb-2 text-[17px]">Company</h5>
                        <ul className="text-[#767676] space-y-2">
                            <li>Submit an AI Tool</li>
                            <li>Advertise</li>
                            <li>Update your tool</li>
                            <li>Feature your tool ⭐</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Divider Line */}
            <div className="w-full border-t border-gray-700 mt-12 mb-6"></div>

            {/* Bottom Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center text-white text-sm max-w-6xl mx-auto px-4 pb-10 gap-4">
                <p className="text-center">Copyright © 2022 prodesigner. All rights reserved.</p>
                <div className="flex space-x-4">
                    {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
                        <div
                            key={idx}
                            className='bg-white p-3 hover:bg-orange-500 rounded-full transition duration-300'
                        >
                            <Icon className="text-black hover:text-white cursor-pointer" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Footer;