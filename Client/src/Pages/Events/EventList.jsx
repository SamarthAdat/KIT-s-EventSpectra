import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getAllEvents } from '../../Redux/Slices/eventSlice'
import BaseLayout from '../../Layouts/BaseLayout'
import EventCard from '../../Components/SARVESH/EventCard'

function EventList() {

    const dispatch = useDispatch()
    const {eventData} = useSelector( state => state?.events)

    async function loadEvents () {
        await dispatch(getAllEvents())
    }

    useEffect(() => {
        loadEvents()
    },[])

  return (
    <BaseLayout>
        <div className='flex flex-wrap gap-10 mb-10 justify-center items-center'>
            {
              eventData?.map((element) =>  <EventCard  key={element._id} data={element}/> )
            }
        </div>
      </BaseLayout>
  )
}

export default EventList
