import React, { useEffect, useState } from 'react'
import {useLocation,Link,useNavigate} from 'react-router-dom'
import BaseLayout from '../../Layouts/BaseLayout';
import {useDispatch} from 'react-redux'
import { addEvent } from '../../Redux/Slices/eventSlice';
import { AiOutlineArrowLeft } from 'react-icons/ai';

function AddEvent() {

    const {state} = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [eventDetails, setEventDetails] = useState({
        eventName: '' ,
        tagline: '' ,
        description: '',
        previewImage: '' ,
        thumbnail: '',
        eventDate:'',
        eventTime:''
    })

    function handleUserInput(e){

        const {name, value} = e.target

        setEventDetails({
            ...eventDetails ,
            [name]: value
        })
    }

    function handleImageUpload(e){
        // e.preventDefault()
        const uploadedImage = e.target.files[0]
        
        if(uploadedImage){
          const fileReader = new FileReader()
          fileReader.readAsDataURL(uploadedImage)
          fileReader.addEventListener('load',()=>{
            setEventDetails({
              ...eventDetails ,
              previewImage: fileReader.result ,
              thumbnail: uploadedImage
            })
          })
        }
    }

    async function handleFormSubmit(e){
        e.preventDefault()

        console.log(eventDetails);
        
        if(!eventDetails.eventName || !eventDetails.description || !eventDetails.tagline || !eventDetails.eventDate || !eventDetails.eventTime){
            toast.error('All fields are required')
            return
          }

        const formData = new FormData()

        formData.append('eventName', eventDetails.eventName)
        formData.append('tagline', eventDetails.tagline)
        formData.append('description', eventDetails.description)
        formData.append('thumbnail', eventDetails.thumbnail)
        formData.append('clubId', state._id)
        formData.append('eventDate', eventDetails.eventDate)
        formData.append('eventTime', eventDetails.eventTime)

        // console.log(`FORMDATA: ${formData.get('tagline')}`);
          const response = await dispatch(addEvent(formData))

          if(response?.payload?.success){
             setEventDetails({
                eventName: '' ,
                tagline: '' ,
                description: '',
                previewImage: '' ,
                thumbnail: '',
                eventDate:'',
                eventTime:''
             })

            navigate('/events')
          }





    }

    useEffect(()=>{
        // console.log(state);
    },[])

  return (
    <BaseLayout>
      <div className='flex justify-center items-center h-[100vh]'>
      <form 
        onSubmit={handleFormSubmit} 
        className='flex flex-col justify-center g-5 rounded-lg p-4 w-[700px] my-10 shadow-[0_0_10px_black]  relative'>

          <Link className='absolute top-8 text-2xl link text-accent cursor-pointer'>
            <AiOutlineArrowLeft />
          </Link>

          <h1 className='text-center text-2xl font-bold mb-8'>
            Add Event
          </h1>

          <main className='grid grid-cols-2 gap-x-10'>
              <div className='gap-y-6'>
                  <div >
                      <label htmlFor="image_uploads" className='cursor-pointer'>
                        {
                          eventDetails.previewImage? (
                            <img 
                            className='w-full h-44 m-auto border'
                              src={eventDetails.previewImage} 
                              alt="club thumbnail" />
                          ) : (
                            <div className='w-full h-44 m-auto flex items-center justify-center border'>
                              <h1 className=' text-lg text-gray-400'>Upload your event thumbnail</h1>
                            </div>
                          )
                        }
                      </label>
                      <input 
                        type="file" 
                        className='hidden'
                        accept='.jpg, .jpeg, .png'
                        id='image_uploads'
                        name='image_uploads'
                        onChange={handleImageUpload}
                      />
                  </div>
                  <div className="flex flex-col gap-2 mt-4">
                    <label htmlFor="eventName" className='text-lg font-semibold'>Event Name </label>
                    <input 
                      type="text" 
                      required
                      name='eventName'
                      id='eventName'
                      placeholder='Enter Event Name'
                      className='bg-transparent px-2 py-1 border'
                      value={eventDetails.eventName}
                      onChange={handleUserInput}
                    />
                  </div>
                  <div className="flex flex-col gap-2 mt-4">
                    <label htmlFor="eventDate" className='text-lg font-semibold'>Event Date </label>
                    <input 
                      type="date" 
                      required
                      name='eventDate'
                      id='eventDate'
                      placeholder='Enter Event Date'
                      className='bg-transparent px-2 py-1 border'
                      value={eventDetails.eventDate}
                      onChange={handleUserInput}
                    />
                  </div>
              </div>

              <div className='flex flex-col gap-1'>
                  
                  <div className="flex flex-col gap-2 mt-4">
                    <label htmlFor="eventTime" className='text-lg font-semibold'>Event Time </label>
                    <input 
                      type="text" 
                      required
                      name='eventTime'
                      id='eventTime'
                      placeholder='Enter Event Time'
                      className='bg-transparent px-2 py-1 border'
                      value={eventDetails.eventTime}
                      onChange={handleUserInput}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="tagline" className='text-lg font-semibold'>Tagline </label>
                    <input 
                      type="text" 
                      required
                      name='tagline'
                      id='tagline'
                      placeholder='Enter tagline'
                      className='bg-transparent px-2 py-1 border'
                      value={eventDetails.tagline}
                      onChange={handleUserInput}
                    />
                  </div> 
                  <div className="flex flex-col gap-2 mt-2">
                    <label htmlFor="description" className='text-lg font-semibold'>Description</label>
                    <textarea 
                      type="" 
                      required
                      name='description'
                      id='description'
                      placeholder='Enter description'
                      className='bg-transparent px-2 py-1 border resize-none '
                      value={eventDetails.description}
                      onChange={handleUserInput}
                      rows='6'
                    />
                  </div> 


              </div>
          </main>

          <button 
            type='submit' 
            className='w-full bg-yellow-600 hover:bg-yellow-300 transition-all ease-in-out duration-300 mt-4 py-2 rounded-sm font-semibold text-lg cursor-pointer'>
              Add Event
          </button>
      </form>
      </div>
    </BaseLayout>
  )
}

export default AddEvent
