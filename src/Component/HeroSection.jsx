import { Link } from "react-router-dom";
import { Home as HomeIcon, Facebook, Linkedin, Send, Mail } from "lucide-react";

const HeroSection = ({
  backgroundText,
  subtitle,
  title,
  description,
  buttonText,
  buttonLink,
  buttonIcon,
  mainImage,
  mainImageAlt,
}) => {
  return (
    <div className="relative w-full overflow-hidden bg-black flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:w-16 py-6 bg-transparent z-50">
        <div className="flex flex-col items-center space-y-10 text-white">
          <Link to="/" className="hover:text-orange-500">
            <HomeIcon size={20} />
          </Link>
          <Link to="/facebook" className="hover:text-orange-500">
            <Facebook size={20} />
          </Link>
          <Link to="/linkedin" className="hover:text-orange-500">
            <Linkedin size={20} />
          </Link>
          <Link to="/telegram" className="hover:text-orange-500">
            <Send size={20} />
          </Link>
          <Link to="/contact" className="hover:text-orange-500">
            <Mail size={20} />
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pt-16 px-4 md:px-8 lg:ml-16 md:mt-25 mt-15 relative">
        {/* Background Text */}
        <div className="hidden md:block absolute -bottom-10 left-0 z-0 opacity-10 text-[160px] font-bold leading-none bg-gradient-to-b from-white to-black bg-clip-text text-transparent pointer-events-none select-none">
          {backgroundText}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col-reverse md:flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left px-4 md:px-0">
            <p className="text-[#E87D0E] font-bold mb-4 text-lg md:text-xl tracking-wide">
              {subtitle}
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-gray-200 text-base md:text-lg mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0">
              {description}
            </p>
            <div className="flex justify-center lg:justify-start">
              <Link
                to={buttonLink}
                className="inline-flex items-center relative px-6 py-3 rounded-full bg-gradient-to-r from-[#E67802] to-[#FB9E3C] text-white font-medium hover:scale-105 hover:shadow-lg transition"
              >
                {buttonText}
                {buttonIcon && (
                  <img
                    src={buttonIcon}
                    alt=""
                    className="absolute -top-2 -right-2 w-7 h-7"
                  />
                )}
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={mainImage}
              alt={mainImageAlt}
              className="object-contain"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HeroSection;
