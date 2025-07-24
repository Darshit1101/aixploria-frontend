"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Star,
  Home as HomeIcon,
  Facebook,
  Linkedin,
  Send,
  Mail,
} from "lucide-react";
import Star1 from "../Images/Star.png";
import robot from "../Images/Crown.png";
import HeroSection from "./HeroSection";

const SubmitHero = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <HeroSection
        backgroundText="A I T O O L S"
        subtitle="Artificial intelligence for everyone"
        title="Reach a Premium AI Professionals"
        description="Connect with over 500,000+ AI professionals and users who trust our platform for top-quality AI tools."
        buttonText="GET A PREMIUM"
        buttonLink="/premium"
        buttonIcon={Star1}
        mainImage={robot}
        mainImageAlt="AI Assistant Robot"
      />
    </>
  );
};

export default SubmitHero;
