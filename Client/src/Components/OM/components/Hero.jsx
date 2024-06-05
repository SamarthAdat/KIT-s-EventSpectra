import React, { useState } from 'react';
import {FaRobot} from 'react-icons/fa6';
import Chatbot from '../../../Pages/ChatBot/Chatbot.jsx';

const Hero = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
    console.log("showChatbot:", showChatbot); 
  };

  return (
    <div className='w-full h-screen'>
      <img
        className='top-0 left-0 w-full h-screen object-cover'
        src='https://png.pngtree.com/background/20210711/original/pngtree-campus-culture-and-art-festival-poster-design-picture-image_1129242.jpg'
        alt='/'
      />
      <div className='bg-black/30 absolute top-0 left-0 w-full h-screen' />
      <div className='absolute top-0 w-full h-full flex flex-col justify-center text-white'>
        <div className='md:left-[10%] max-w-[1100px] m-auto absolute p-4'>
          <h1 className='font-bold text-5xl md:text-7xl drop-shadow-2xl'>
            Campus Vibes, Eventful Lives!
          </h1>
          <p className='max-w-[600px] drop-shadow-2xl py-2 text-xl'>
            Unleashing Talent, Celebrating Diversity: Join Us in Eventful Journeys!
          </p>
         
<button
  onClick={toggleChatbot}
  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-7xl mr-8'
  style={{ position: 'fixed', bottom: '20px', right: '20px' }}
>
  <FaRobot className='w-full'/>
</button>

<p>{showChatbot ? (
        <div
          style={{
            position: 'fixed',
            bottom: '60px',
            right: '20px',
            zIndex: '9998', 
          }}
        ><Chatbot/></div>):""}</p>
        </div>
      </div>
      
    </div>
  );
};

export default Hero;

