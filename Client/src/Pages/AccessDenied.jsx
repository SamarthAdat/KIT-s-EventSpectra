import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

function AccessDenied() {
    const navigate = useNavigate()

    return (
        <div className='h-screen w-full flex flex-col justify-center items-center'>
        <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl  font-extrabold text-center mb-8'>
            Access Denied !
        </h1>
        <button 
        
            className='border-2 border-black mr-4 hover:shadow-2xl p-2 text-lg transition duration-300 ease-in-out transform hover:-translate-y-1 rounded-lg'>
                <Link  onClick={()=> navigate(-1)}>Go Back</Link>
        </button>
        </div>
    );
}

export default AccessDenied
