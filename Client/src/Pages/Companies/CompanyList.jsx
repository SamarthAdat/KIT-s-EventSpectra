import React, { useEffect } from 'react';
import BaseLayout from '../../Layouts/BaseLayout';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompanies } from '../../Redux/Slices/companySlice';
import CompanyCard from '../../Components/SARVESH/CompanyCard';


function CompanyList() {

    const navigate = useNavigate()

    const dispatch = useDispatch()
    const {companyData} = useSelector((state) => state.companies)

    // console.log()
    const isLoggedIn = useSelector(state => state?.auth?.isLoggedIn)
    // console.log('loged in',isLoggedIn);

    async function loadCompanies(){
      await dispatch(getAllCompanies())
    }

    useEffect(()=>{
      loadCompanies()
      console.log('company-data', companyData);
    },[])

  return (
    <BaseLayout >
   {
      isLoggedIn && (
        <>
           
        <div className="flex flex-col items-center justify-center">
            <h1 className='text-5xl text-center text-blue-700 pt-[5rem]'>Currently Hiring Companies ... </h1>
            <button 
                onClick={()=> navigate('/master-data-sheet') }
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                Fill Master data sheet
            </button>
        </div>

        <div className='flex flex-wrap gap-10 mb-10 justify-center items-center'>
                {
                  companyData.map( element => <CompanyCard key={element._id} data={element} />)
                }
        </div>
        
        </>
      )

   }
      
    </BaseLayout>
  );
}

export default CompanyList;
