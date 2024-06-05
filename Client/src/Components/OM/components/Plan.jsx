import React from 'react';
import { useNavigate } from 'react-router-dom';

const Plan = () => {

  const navigate = useNavigate()

  return (
    <div className='max-w-[1400px] m-auto py-16 px-4 grid lg:grid-cols-2 gap-4'>
      {/* Left Side */}
      <div className='grid grid-cols-2 grid-rows-6 h-[80vh]'>
        <img
          className='row-span-3 object-cover w-full h-full p-2'
          src='https://kitcoek.s3.ap-south-1.amazonaws.com/images/LifeAtKit/cultural/1.jpg'
          alt='/'
        />
        <img
          className='row-span-2 object-cover w-full h-full p-2'
          src='https://kitcoek.s3.ap-south-1.amazonaws.com/images/LifeAtKit/cultural/5.jpg'
          alt='/'
        />
        <img
          className='row-span-2 object-cover w-full h-full p-2'
          src='https://kitcoek.s3.ap-south-1.amazonaws.com/images/LifeAtKit/cultural/student-club-activity-07.jpg'
          alt='/'
        />
        <img
          className='row-span-3 object-cover w-full h-full p-2'
          src='https://kitcoek.s3.ap-south-1.amazonaws.com/images/LifeAtKit/cultural/student-club-activity-15.jpg'
          alt='/'
        />
        <img
          className='row-span-2 object-cover w-full h-full p-2'
          src='https://kitcoek.s3.ap-south-1.amazonaws.com/images/LifeAtKit/cultural/student-club-activity-29.jpg'
          alt='/'
        />
      </div>
      {/* Right Side */}
      <div className='flex flex-col h-full justify-center'>
        <h3 className='text-5xl md:text-6xl font-bold'>Cultural events</h3>
        <p className='text-2xl py-6'>
        Embrace Diversity, Join the Cultural Event!
        </p>
        <p className='pb-6'>
        Dive into a world of cultural wonders! Join us as we celebrate diversity, creativity, and unity in our upcoming cultural event. Let your talents shine and make unforgettable memories with us!
        </p>
        <div>
        {/* <button
          className='border-2 border-black mr-4 hover:shadow-2xl p-2 text-lg transition duration-300 ease-in-out transform hover:-translate-y-1 rounded-lg'>
          Learn More
        </button> */}
        <button
        onClick={() => navigate('/clubs')}
          className='bg-black text-white border-2 border-black hover:bg-gray-800 hover:shadow-2xl p-2 text-lg transition duration-300 ease-in-out transform hover:-translate-y-1 rounded-lg'>
          Participate
        </button>

        </div>
      </div>
    </div>
  );
};

export default Plan;
