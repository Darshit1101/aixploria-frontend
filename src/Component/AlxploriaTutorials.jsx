// import React, { useRef, useState } from 'react';
// import { BsPlayFill, BsPauseFill } from 'react-icons/bs';
// import VideoFile from '../Videos/tutorial.mp4'; // Update path to your video file

// const HeroTutorialSection = () => {
//   const videoRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const handlePlayPause = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   return (
//     <section className="bg-black text-white py-16 px-4 lg:px-24 relative font-[Poppins]">
//       {/* Header */}
//       <div className="text-center mb-12">
//         <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-[#FA9021] mb-2">
//           AI VIDEO TUTORIALS: FREE COURSES ON THE BEST AI TOOLS
//         </h1>
//         <p className="text-[#FFFFFF] text-sm lg:text-base">
//           Lorem Ipsum is simply dummy text of the printing and typesetting industry.
//         </p>
//       </div>

//       {/* Video and Text Section */}
//       <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 max-w-7xl mx-auto">
//         {/* Video Display */}
//         <div className="w-full lg:w-1/2 relative rounded-xl overflow-hidden shadow-lg">
//           <video
//             ref={videoRef}
//             src={VideoFile}
//             className="w-full h-auto rounded-xl object-cover"
//             controls={false}
//           />
//           {/* Custom Play/Pause Button */}
//           <div
//             onClick={handlePlayPause}
//             className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
//           >
//             <div className="bg-white/90 p-3 rounded-full">
//               {isPlaying ? (
//                 <BsPauseFill className="text-black text-4xl" />
//               ) : (
//                 <BsPlayFill className="text-black text-4xl" />
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Text Content */}
//         <div className="w-full lg:w-1/2">
//           <h2 className="text-2xl lg:text-3xl font-bold mb-4">
//             Discover a Complete Library of AI Resources
//           </h2>
//           <p className="text-gray-400 mb-6">
//             Welcome to Alxploria, the reference platform for learning about artificial intelligence! Our collection of free online AI video tutorials and training courses has been carefully selected with the aim of providing AI professionals, educators and enthusiasts with a powerful service.
//           </p>
//           <ul className="space-y-4">
//             <li className="flex items-center gap-3">
//               <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">✔</span>
//               <span>Best quality Video</span>
//             </li>
//             <li className="flex items-center gap-3">
//               <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">✔</span>
//               <span>Easy Learning Video</span>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroTutorialSection;



import React from 'react';
import { BsPlayFill } from 'react-icons/bs';
import Game from "../Images/Game.gif"; // Ensure correct path
import FaceImage from "../Images/face.png"
const HeroTutorialSection = () => {
  return (
    <>
      <section className="bg-black text-white py-16 px-4 lg:px-24 relative font-[Poppins]">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-[#FA9021] mb-2">
            AI VIDEO TUTORIALS: FREE COURSES ON THE BEST AI TOOLS
          </h1>
          <p className="text-[#FFFFFF] text-sm lg:text-base">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </div>

        {/* GIF and Text Section */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 max-w-7xl mx-auto">
          {/* GIF Display with Fake Button */}
          <div className="w-full lg:w-1/2 relative rounded-xl overflow-hidden shadow-lg">
            <img
              src={Game}
              alt="AI Tutorial GIF"
              className="w-full h-auto rounded-xl object-cover"
            />
            {/* <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="bg-white/90 p-3 rounded-full">
              <BsPlayFill className="text-black text-4xl" />
            </div>
          </div> */}
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Discover a Complete Library of AI Resources
            </h2>
            <p className="text-gray-400 mb-6">
              Welcome to Alxploria, the reference platform for learning about artificial intelligence! Our collection of free online AI video tutorials and training courses has been carefully selected with the aim of providing AI professionals, educators and enthusiasts with a powerful service.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">✔</span>
                <span>Best quality Video</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">✔</span>
                <span>Easy Learning Video</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2nd */}
      <section className="bg-black text-white py-16 px-6 lg:px-24 font-[Poppins]">
        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* Left: Text Content - 50% */}
          <div className="w-full lg:w-1/2 space-y-12">
            {/* Section 2 */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
                A diverse selection of video lessons
              </h2>
              <p className="text-gray-300 mb-3">
                Our library covers a wide range of AI technologies, including: in today’s AI landscape
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Midjourney for image generation</li>
                <li>ChatGPT for natural language processing</li>
                <li>Stable Diffusion for advanced visual creation</li>
                <li>DALLE-2 for AI-generated art</li>
                <li>Runway for AI-assisted video production</li>
                <li>HubSpot for a complete, professional CRM solution</li>
                <li>And many other essential tools in today’s AI landscape</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
                The benefits of video training on Alxploria
              </h2>
              <p className="text-gray-300 mb-3">
                Here’s why Alxploria.com stands out as the go-to resource for AI learning:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Free access to professional-quality content</li>
                <li>Regular updates reflecting the latest advances in AI</li>
                <li>Pedagogical approach combining theory and practical applications</li>
                <li>Flexible learning adapted to busy schedules</li>
                <li>Relevant content for beginners and experts alike</li>
                <li>Resources tailored to the education sector and the corporate world</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
                Start your learning journey
              </h2>
              <p className="text-gray-300 mb-3">
                Alxploria.com helps you develop new skills, enhance your professional competencies and enrich your academic curriculum. Here you'll find the basics you need to master the most powerful tools in artificial intelligence.
              </p>
              <p className="text-gray-300">
                Explore our list of video tutorials now and transform your approach to AI with Alxploria, your trusted partner for artificial intelligence e-learning.
              </p>
            </div>
          </div>

          {/* Right: Cartoon Image - 50% */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative min-h-[500px]">
  {/* Yellow Circle (Top Left) */}
  <div className=" absolute w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] rounded-full bg-yellow-500 blur-3xl opacity-30 z-0 
                  top-0 -left-20 md:left-20" />

  {/* Blue Circle (Right of Yellow) */}
  <div className="absolute w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] rounded-full bg-blue-500 blur-3xl opacity-30 z-0 
                  top-0 left-[70px] sm:left-[250px] md:left-[400px]" />

  {/* Red Circle (Below Yellow & Blue) */}
  <div className="absolute w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] rounded-full bg-red-500 blur-3xl opacity-30 z-0 
                  top-[180px] sm:top-[200px] md:top-[250px] left-[70px] sm:left-[180px] md:left-[250px]" />

  {/* Main Face Image */}
  <img
    src={FaceImage}
    alt="Cartoon Face"
    className="w-[250px] sm:w-[350px] md:w-[450px] lg:w-[500px] h-auto object-contain relative z-10 md:rotate-3"
  />
</div>


        </div>
      </section>
    </>
  );
};

export default HeroTutorialSection;


