import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllClubs } from '../../Redux/Slices/clubSlice'
import  BaseLayout from '../../Layouts/BaseLayout' 
import ClubCard from '../../Components/SARVESH/ClubCard'

function ClubList() {

    const dispatch = useDispatch()
    const {clubData} = useSelector( state => state.clubs)

    // console.log(clubData);

    async function loadCourses () {
        await dispatch(getAllClubs())
    }

    useEffect(()=> {
      loadCourses()
    },[])



  return (
      <BaseLayout>
        <div className='flex flex-wrap gap-10 mb-10 justify-center items-center'>
            {
              clubData?.map((element) =>  <ClubCard  key={element._id} data={element}/> )
            }
        </div>
      </BaseLayout>
  )
}

export default ClubList
