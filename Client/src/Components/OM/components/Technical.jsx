import React from 'react';

const Rooms = () => {
  return (
    <div className='max-w-[1400px] h-[500px] bg-blue-100 mx-auto my-20 pt-16 lg:mb-[20%] md:mb-[35%] px-4 grid lg:grid-cols-3 gap-4'>
      <div className='lg:top-20 relative lg:col-span-1 col-span-2'>
        <h3 className='text-2xl font-bold'>Tech Up Your Game: Where Innovation Meets Action!</h3>
        <p className='pt-4'>
        Unleash Your Innovation: Dive into the Tech Event Revolution and Shape Tomorrow's World!
        </p>
      </div>

      <div className='grid grid-cols-2 col-span-2 gap-2'>
        <img
        className='object-cover w-full h-full'
          src='https://kitcoek.s3.ap-south-1.amazonaws.com/gallery/departments/cse/t-dept-of-cse-kit-kolhapur-04.jpg'
          alt='/'
        />
        <img
        className='row-span-2 object-cover w-full h-full'
          src='https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt='/'
        />
        <img
        className='object-cover w-full h-full'
          src='https://kitcoek.s3.ap-south-1.amazonaws.com/gallery/2024-01-18T04%3A56%3A21.166Z-cse3.jpg'
          alt='/'
        />
      </div>
    </div>
  );
};

export default Rooms;
