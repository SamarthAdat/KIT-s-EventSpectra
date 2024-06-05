import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../Helpers/axiosInstance';
import BaseLayout from '../Layouts/BaseLayout';

function StudentList() {

    const {state} = useLocation()
    
   const [filteredStudentData, setFilteredStudentData] = useState([])
    // let flag = false
    async function loadStudentData(){
        try {
            const response = axiosInstance.get('/user/get-student-data',{
                params: {companyId: state._id}
            })
          
            const  filteredStudents = (await response).data.filteredStudents
            
            setFilteredStudentData(filteredStudents)
            console.log('filteredStudentsdata', filteredStudents);

            toast.success('data loaded')
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(()=>{
        loadStudentData()
    },[])


  return (
   <BaseLayout>
         <div className='pt-24 flex flex-col gap-10 justify-center items-center mb-48'>

            <h1 className='text-2xl md:text-4xl font-bold bg-gradient-to-r from-black to-blue-500 text-transparent bg-clip-text uppercase mb-4'>SHORTLISTED STUDENTS FOR {state.companyName}</h1>
            <section className='mb-10 flex justify-center items-center'>
            
                <div className="overflow-x-auto">
                    <table className="w-[60rem] border-collapse border border-gray-200">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                        <th className="px-4 py-2">PRN</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        
                        </tr>
                    </thead>
                    <tbody>

                    
                        {
                            // render filteredStudentData here
                            filteredStudentData.map(e => {

                                if(e !== null){
                                    return( <tr key={e._id}>
                                        <td className="px-4 py-2 text-center">{e.prn || ''}</td>
                                        <td className="px-4 py-2">{e.name || ''}</td>
                                        <td className="px-4 py-2 text-center">{e.email || ''}</td>
                                    </tr>)
                                }
                                
                                // else{
                                //     flag = true
                                // }
                                
                            }) 
                        }
                       
                
                    </tbody>
                    </table>
                </div>
            </section>
        </div>
   </BaseLayout>
  )
}

export default StudentList


