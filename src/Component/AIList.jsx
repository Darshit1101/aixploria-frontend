"use client";

import { useState, useEffect } from "react";
import Star1 from "../Images/Star.png";
import robot from "../Images/GAI.png";
import HeroSection from "./HeroSection";
import FavoritesPanel from "./FavoritesPanel";

const HomeScreen = () => {
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
        title="MY AI List"
        description="Add Save Your List"
        buttonText="GET A PREMIUM"
        buttonLink="/premium"
        buttonIcon={Star1}
        mainImage={robot}
        mainImageAlt="AI Assistant Robot"
      />
      <FavoritesPanel />
    </>
  );
};

export default HomeScreen;
