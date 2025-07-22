"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookmarkPlus, ChevronDown, Home, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/95 shadow-lg" : "bg-black/50"
        }`}
    >
      <div className="ml-5 px-4 sm:px-6 lg:px-14 xl:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              onClick={scrollToTop}
              className="flex items-center text-xl sm:text-2xl font-bold"
            >
              <span className="text-orange-500">AI</span>
              <span className="text-white ml-1">XPLORIA</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6 lg:space-x-8">
            <Link
              to="/ailist"
              onClick={scrollToTop}
              className="text-white hover:text-gray-300 flex items-center"
            >
              <svg height="20" fill="white" viewBox="0 0 28 28" width="20" xmlns="http://www.w3.org/2000/svg"><g id="Layer_2" data-name="Layer 2"><path d="m20 7a5 5 0 1 0 5 5 5.006 5.006 0 0 0 -5-5zm2 6h-1v1a1 1 0 0 1 -2 0v-1h-1a1 1 0 0 1 0-2h1v-1a1 1 0 0 1 2 0v1h1a1 1 0 0 1 0 2z"/><path d="m13 12a6.948 6.948 0 0 1 8-6.92v-.13a3.955 3.955 0 0 0 -3.95-3.95h-10.1a3.955 3.955 0 0 0 -3.95 3.95v21.05a1 1 0 0 0 1.659.752l7.341-6.423 7.341 6.423a1 1 0 0 0 1.659-.752v-7.08a6.948 6.948 0 0 1 -8-6.92z"/></g></svg>
            </Link>
            <Link
              to="/fulllist"
              onClick={scrollToTop}
              className="text-white hover:text-gray-300 text-sm lg:text-base"
            >
              Full List
            </Link>
            <Link
              to="/aicategory"
              onClick={scrollToTop}
              className="text-white hover:text-gray-300 text-sm lg:text-base"
            >
              AI Categories
            </Link>
            <Link
              to="/aitutorials"
              onClick={scrollToTop}
              className="text-white hover:text-gray-300 text-sm lg:text-base"
            >
              AI Tutorials
            </Link>
            <div className="relative group">
              <button
                className="text-white hover:text-gray-300 text-sm lg:text-base flex items-center"
              >
                AI Tutorials
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="py-1">
                  <Link
                    to="/newai"
                    onClick={scrollToTop}
                    className="block px-4 py-2 text-sm text-white hover:bg-[#FA9021]"
                  >
                    New AI Tools
                  </Link>
                  <Link
                    to="/freeaitool"
                    onClick={scrollToTop}
                    className="block px-4 py-2 text-sm text-white hover:bg-[#FA9021]"
                  >
                    Free AI Tools
                  </Link>
                  <Link
                    to="/ainews"
                    onClick={scrollToTop}
                    className="block px-4 py-2 text-sm text-white hover:bg-[#FA9021]"
                  >
                    AI NEWS 2025
                  </Link>
                   <Link
                    to="/bonus&extras"
                    onClick={scrollToTop}
                    className="block px-4 py-2 text-sm text-white hover:bg-[#FA9021]"
                  >
                    Bonus & Extras
                  </Link>
                   <Link
                    to="/submit"
                    onClick={scrollToTop}
                    className="block px-4 py-2 text-sm text-white hover:bg-[#FA9021]"
                  >
                    Submit an AI
                  </Link>
                </div>
              </div>
            </div>


            {/* Dropdown */}

            <Link
              to="/aitutorials"
              onClick={scrollToTop}
              className="flex items-center text-white hover:text-gray-300 text-sm lg:text-base"
            >
              +More

            </Link>

          </div>


          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 rounded-md hover:text-gray-300 focus:outline-none"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <div
        className={`md:hidden bg-black px-4 sm:px-6 pb-4 transition-all duration-300 ease-in-out ${isOpen ? "block opacity-100" : "hidden opacity-0"
          }`}
      >
        <div className="space-y-1">
          <Link
            to="/"
            onClick={() => {
              scrollToTop();
              setIsOpen(false);
            }}
            className="block py-2 px-3 text-white hover:bg-gray-800 rounded-md text-base font-medium"
          >
            <BookmarkPlus className="h-5 w-5 inline mr-2" />
            Home
          </Link>
          <Link
            to="/fulllist"
            onClick={() => {
              scrollToTop();
              setIsOpen(false);
            }}
            className="block py-2 px-3 text-white hover:bg-gray-800 rounded-md text-base font-medium"
          >
            Full List
          </Link>
          <Link
            to="/ai-categories"
            onClick={() => {
              scrollToTop();
              setIsOpen(false);
            }}
            className="block py-2 px-3 text-white hover:bg-gray-800 rounded-md text-base font-medium"
          >
            AI Categories
          </Link>
          <Link
            to="/ai-tutorials"
            onClick={() => {
              scrollToTop();
              setIsOpen(false);
            }}
            className="block py-2 px-3 text-white hover:bg-gray-800 rounded-md text-base font-medium"
          >
            AI Tutorials
          </Link>
          <div>
            <button
              onClick={() => {
                const submenu = document.getElementById("mobile-submenu");
                if (submenu) submenu.classList.toggle("hidden");
              }}
              className="flex w-full justify-between items-center py-2 px-3 text-white hover:bg-gray-800 rounded-md text-base font-medium"
            >
              More
              <ChevronDown className="h-4 w-4" />
            </button>
            <div
              id="mobile-submenu"
              className="hidden pl-6 space-y-1 mt-1"
            >
              <Link
                to="/about"
                onClick={() => {
                  scrollToTop();
                  setIsOpen(false);
                }}
                className="block py-2 px-3 text-white hover:bg-gray-800 rounded-md text-sm"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                onClick={() => {
                  scrollToTop();
                  setIsOpen(false);
                }}
                className="block py-2 px-3 text-white hover:bg-gray-800 rounded-md text-sm"
              >
                Contact
              </Link>
              <Link
                to="/blog"
                onClick={() => {
                  scrollToTop();
                  setIsOpen(false);
                }}
                className="block py-2 px-3 text-white hover:bg-gray-800 rounded-md text-sm"
              >
                Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;