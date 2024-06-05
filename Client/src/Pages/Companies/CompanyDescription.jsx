//import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import BaseLayout from '../../Layouts/BaseLayout';
import { useSelector } from 'react-redux';
function CompanyDescription() {

    const {state} = useLocation()
    console.log('state',state);
    const navigate = useNavigate()
     console.log(state);
     const userData = useSelector(state => state?.auth?.data);

  return (
    <BaseLayout>
      <main className='w-full pt-24 md:ml-20 md:mr-20'>
        <section className='w-full flex flex-col pr-32 md:flex-row mb-32'>
          <div className='w-full md:w-1/3 overflow-hidden rounded-lg mb-4 md:mb-0'>
            <img
              src={state.thumbnail.secure_url}
              alt='club thumbnail'
              className='w-full h-64 object-cover object-center'
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className='pl-0 md:pl-32 '>
            <h1 className='text-4xl md:text-6xl font-bold bg-gradient-to-r from-black to-blue-500 text-transparent bg-clip-text uppercase mb-4'>
              {state.companyName}
            </h1>
            <h3 className='text-lg md:text-2xl ml-2'>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500">
                    {state.tagline}
                </span>
            </h3>



            <div className='flex flex-col gap-5 mt-10'>

            
                <h3 className='text-lg md:text-2xl text-orange-500 ml-2'>Job Role : <span className='text-black'>{state.jobRole}</span></h3>
                <h3 className='text-lg md:text-2xl text-orange-500 ml-2'>Arrival Date: <span className='text-black'>{state.arrivalDate}</span></h3>
                <h3 className='text-base md:text-lg mt-10 text-justify ml-2'>{state.description}</h3>

            </div>
    
            {userData.role== "ADMIN"?  <button
                className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={()=>navigate('/company/update-company',{state:state})}
            >
                
          Update Company
      </button>:""}
          
          </div>

          
        </section>

        <h1 className='text-3xl font-bold mb-4 text-center'>Eligibility Criteria:</h1>


        <section className='mb-10 flex justify-center items-center'>
  
            <div className="overflow-x-auto">
                <table className="w-[30rem] border-collapse border border-gray-200">
                <thead className="bg-blue-500 text-white">
                    <tr>
                    <th className="px-4 py-2">Category</th>
                    <th className="px-4 py-2">Eligibility</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td className="px-4 py-2">10th</td>
                    <td className="px-4 py-2 text-center">{state.sscEligibility}</td>
                    </tr>
                    <tr>
                    <td className="px-4 py-2">12th</td>
                    <td className="px-4 py-2 text-center">{state.hscEligibility}</td>
                    </tr>
                    <tr>
                    <td className="px-4 py-2">Engg</td>
                    <td className="px-4 py-2 text-center">{state.enggEligibility}</td>
                    </tr>
                    <tr>
                    <td className="px-4 py-2">Gap Years allowed</td>
                    <td className="px-4 py-2 text-center">{state.gapYears}</td>
                    </tr>
                    <tr>
                    <td className="px-4 py-2">Active Backlogs allowed</td>
                    <td className="px-4 py-2 text-center">{state.activeBacklogs ? "Yes" : "No"}</td>
                    </tr>
                </tbody>
                </table>
            </div>
        </section>


      <div className='flex justify-center items-center mb-10'>

        <button 
                onClick={()=> navigate('/company/student-list', {state: state}) }
                className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                View Eligible Student List
        </button>   
      </div>

     
      </main>

            
    </BaseLayout>
  )
}

export default CompanyDescription


