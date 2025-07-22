import React from 'react'
import HeroScreen from '../Component/HeroScreen'
import Search1 from '../Component/Search1'
import AiCategoryAll from '../Component/AiCategoryAll'
import AboutAi from '../Component/AboutAi'
import TopTools from '../Component/TopTools'
const Home = () => {
  return (
    <>
      <HeroScreen/>
      <TopTools />
      {/* <Search1/> */}
      <AiCategoryAll/>
      <AboutAi/> 
    </>
  )
}

export default Home
