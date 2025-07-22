import React from "react";
import Fulllist from "../Component/Fulllist";
import TopTools from "../Component/TopTools";
import AllTools from "../Component/AllTools";
import AboutAi from "../Component/AboutAi";
import AiProductivityTools from "../Component/AiProductivityTools";
import FullListAi from "../Pages/FullListAi"
const FulllistPage = () => {
  return (
    <>
      <Fulllist />
      <TopTools />
      {/* <AllTools/> */}
      <FullListAi/>
      <AboutAi/>
      {/* <AiProductivityTools/> */}
    </>
  );
}; 

export default FulllistPage;
