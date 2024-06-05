import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../../Helpers/axiosInstance';
import { useNavigate } from 'react-router-dom';

function ProfileEventCard({ data }) {
  // data = ID of each Event
  const [eventData, setEventData] = useState(null);
  const navigate = useNavigate()
  // console.log('data: ', data)

  async function loadEvents() {
    try {
      const res = await  axiosInstance.get(`/events/${data}`);
      const eventsFromDB =  res.data.eventFromDB;
      console.log('eventsfromDB:',eventsFromDB);
      setEventData(eventsFromDB);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    loadEvents();
    
  }, []);


  if (!eventData) {
    
    // Return a loading state or placeholder until the data is loaded
    return null;
  }

  const { eventName, description, thumbnail } = eventData;

  return (
    <div
      onClick={() => navigate('/club/event/description/', {state: eventData})}
      className="text-white w-[22rem] h-[350px] shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-zinc-700  mt-32 border border-gray-300 transition-transform hover:translate-y-1 hover:shadow-lg"
    >
      <div className="overflow-hidden">
        <img
          alt="club thumbnail"
          src={thumbnail.secure_url}
          className="h-48 w-full rounded-tl-lg rounded-tr-lg transition-transform group-hover:scale-[1.05] ease-in-out duration-300"
        />

        <div className="p-3 space-y-1 text-white">
          <h2 className="text-xl font-bold text-yellow-500 line-clamp-2">
            {eventName}
          </h2>
          <p className="font-semibold">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileEventCard;
