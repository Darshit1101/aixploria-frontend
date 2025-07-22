import React from "react";
import Home from "../Component/Home";
import TopTools from "../Component/TopTools";
import SomeNewAiCategories from "../Component/SomeNewAiCategories";
import ExploreMoreAi from "../Component/ExploreMoreAi";
import GuideAi from "../Component/GuideAi";
import Top10 from "../Component/Top10";
import Top10AI from "../Component/Top10AI";
import EnthusiastsAI from "../Component/EnthusiastsAI";
import WhyCome from "../Component/WhyCome";
import Contribute from "../Component/Contribute";
const HomePage = () => {
  return (
    <>
      <Home />
      <TopTools />
      <SomeNewAiCategories />
      <ExploreMoreAi />
      
      <Top10 /> 
      <GuideAi />
      <Top10AI />
      <EnthusiastsAI/>
      <WhyCome />
      <Contribute />


    </>
  );
};

export default HomePage;
