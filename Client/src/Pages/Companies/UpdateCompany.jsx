
import {  useState } from 'react';
import toast from 'react-hot-toast';

import { useDispatch } from 'react-redux'

import { useLocation } from 'react-router-dom';

import BaseLayout from '../../Layouts/BaseLayout';
import { useNavigate } from 'react-router-dom';
import { UpdateCompanies } from '../../Redux/Slices/companySlice';
function UpdateCompany() {
    const { state } = useLocation();
 


    const dispatch = useDispatch()
  const navigate = useNavigate()
 
  
    const [userDetails, setUserDetails] = useState({
        companyName: state.companyName || "",
        description: state.description || "",
        thumbnail:  "",
        tagline: state.tagline || "",
        previewImage: state.thumbnail.secure_url||"",
        jobRole: state.jobRole ||"",
        activeBacklogs: state.activeBacklogs || "false",
        sscEligibility: state.sscEligibility ||"",
        enggEligibility: state.enggEligibility || "",
        hscEligibility: state.hscEligibility || "",
        gapYears: state.gapYears ||"0",
        arrivalDate: state?.arrivalDate 

  
    })
    function handleImageUpload (e) {
        e.preventDefault()
        const uploadedImage = e.target.files[0]
        
        if(uploadedImage){
          const fileReader = new FileReader()
          fileReader.readAsDataURL(uploadedImage)
          fileReader.addEventListener('load',()=>{
            setUserDetails({  
              ...userDetails ,
              previewImage: fileReader.result ,
              thumbnail: uploadedImage
            })
          })
        }
    
      }
      function handleUserInput (e) {
        const {name,value} = e.target
        setUserDetails({
          ...userDetails ,
          [name] : value
        })
      }
      async function handleFormSubmit (e) {
        e.preventDefault()
    
        if(!userDetails.companyName || !userDetails.description || !userDetails.tagline){
          toast.error('All fields are required')
          return
        }
    
        // form-data is necessary whenever we need to send image at backend else data can be passed normally !
        const formData = new FormData()
    
        formData.append('companyName', userDetails.companyName)
        formData.append('tagline', userDetails.tagline)
        formData.append('description', userDetails.description)
        if (userDetails.thumbnail) {
          formData.append('thumbnail', userDetails.thumbnail);
        }

        formData.append('jobRole',userDetails.jobRole)
        formData.append('activeBacklogs',userDetails.activeBacklogs)
        formData.append('sscEligibility',userDetails.sscEligibility)
        formData.append('enggEligibility',userDetails.enggEligibility)
        formData.append('hscEligibility',userDetails.hscEligibility)
        formData.append('gapYears',userDetails.gapYears)
        formData.append('arrivalDate',userDetails.arrivalDate);
        formData.append('Id', state._id)
    
        const response =  await dispatch(UpdateCompanies(formData))
        console.log("userDetails",userDetails);
    
        if(response?.payload?.success){
          setUserDetails({
            companyName: "" ,
            description: "" ,
            thumbnail : "" ,
            tagline: "" ,
            previewImage: "",
            jobRole:"",
            activeBacklogs:"",
            sscEligibility:"",
            enggEligibility:"",
            hscEligibility:"",
            gapYears:"",
            arrivalDate:""
          })
          navigate('/companies')
        }
    
      }
    
  
    return(
        <BaseLayout>
        <div className='flex justify-center items-center h-[120vh]'>
        <form 
          onSubmit={handleFormSubmit} 
          className='flex flex-col justify-center g-5 rounded-lg p-4 w-[800px] my-10 shadow-[0_0_10px_black]  relative'>
  
            {/* <Link className='absolute top-8 text-2xl link text-accent cursor-pointer'>
              <AiOutlineArrowLeft />
            </Link> */}
  
            <h1 className='text-center text-2xl font-bold mb-8'>
              Update Company
            </h1>
  
            <main className='grid grid-cols-2 gap-x-12'>
                <div className='gap-y-6'>
                    <div >
                        <label htmlFor="image_uploads" className='cursor-pointer'>
                          {
                             userDetails.previewImage ? (
                              <img 
                              className='w-full h-44 m-auto border'
                                src={userDetails.previewImage} 
                                alt="company thumbnail" />
                            ) : (
                              <div className='w-full h-44 m-auto flex items-center justify-center border'>
                                <h1 className=' text-lg text-gray-400'>Upload your course thumbnail</h1>
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
                    <div className="flex flex-col gap-2 mt-16 py-10">
                      <label htmlFor="companyName" className='text-lg font-semibold'>Company Name </label>
                      <input 
                        type="text" 
                        required
                        name='companyName'
                        id='companyName'
                        placeholder='Enter company Name'
                        className='bg-transparent px-2 py-1 border'
                        value={userDetails.companyName}
                        onChange={handleUserInput}
                      />
                       <div className="flex flex-col gap-4">
                      <label htmlFor="jobRole" className='text-lg font-semibold'>Job Role </label>
                      <input 
                        type="text" 
                        required
                        name='jobRole'
                        id='jobRole'
                        placeholder='Enter  jobRole'
                        className='bg-transparent px-2 py-1 border'
                        value={userDetails.jobRole}
                        onChange={handleUserInput}
                      />
                    </div> 
                    <div className="flex flex-col gap-2 mt-1">
                      <label htmlFor="activeBacklogs" className='text-lg font-semibold'>activeBacklogs </label>
                      <input 
                        type="text" 
                        required
                        name='activeBacklogs'
                        id='activeBacklogs'
                        placeholder='Enter  activeBacklogs '
                        className='bg-transparent px-2 py-1 border'
                        value={userDetails.activeBacklogs}
                        onChange={handleUserInput}
                      />
                    </div> 
                    <div className="flex flex-col gap-2 mt-4">
                      <label htmlFor="gapYears" className='text-lg font-semibold'>Allowed Gap Years </label>
                      <input 
                        type="number" 
                        required
                        name='gapYears'
                        id='gapYears'
                        placeholder='Enter  gapYears '
                        className='bg-transparent px-2 py-1 border'
                        value={userDetails.gapYears}
                        onChange={handleUserInput}
                      />
                    </div> 
                    </div>
                   
                   
                </div>
  
                <div className='flex flex-col gap-1'>
                    
                    <div className="flex flex-col gap-1">
                      <label htmlFor="tagline" className='text-lg font-semibold'>Tagline </label>
                      <input 
                        type="text" 
                        required
                        name='tagline'
                        id='tagline'
                        placeholder='Enter tagline'
                        className='bg-transparent px-2 py-1 border'
                        value={userDetails.tagline}
                        onChange={handleUserInput}
                      />
                    </div>
                     
  
                    <div className="flex flex-col gap-2">
                      <label htmlFor="description" className='text-lg font-semibold'>Description</label>
                      <textarea 
                        type="" 
                        required
                        name='description'
                        id='description'
                        placeholder='Enter description'
                        className='bg-transparent px-2 py-1 border resize-none '
                        value={ userDetails.description}
                        onChange={handleUserInput}
                        rows='6'
                      />
  
                  <div className="flex flex-col gap-2 mt-3">
                      <label htmlFor="arrivalDate" className='text-lg font-semibold'>Comapny Arrival Date </label>
                      <input 
                        type="date" 
                        required
                        name='arrivalDate'
                        id='arrivalDate'
                        placeholder='Enter  Arrival Date'
                        className='bg-transparent px-2 py-1 border'
                        value={userDetails.arrivalDate}
                        onChange={handleUserInput}
                      />
                    </div> 
                    <div className="flex flex-col gap-2 mt-2">
                      <label htmlFor="sscEligibility" className='text-lg font-semibold'>ssc Eligibility </label>
                      <input 
                        type="number" 
                        required
                        name='sscEligibility'
                        id='sscEligibility'
                        placeholder='Enter  sscEligibility '
                        className='bg-transparent px-2 py-1 border'
                        value={userDetails.sscEligibility}
                        onChange={handleUserInput}
                      />
                    </div> 
                    <div className="flex flex-col gap-2 mt-1">
                      <label htmlFor="hscEligibility" className='text-lg font-semibold'>HSC Eligibility </label>
                      <input 
                        type="number" 
                        required
                        name='hscEligibility'
                        id='hscEligibility'
                        placeholder='Enter  hscEligibility '
                        className='bg-transparent px-2 py-1 border'
                        value={ userDetails.hscEligibility}
                        onChange={handleUserInput}
                      />
                    </div> 
                      
                    <div className="flex flex-col gap-2 mt-4">
                      <label htmlFor="enggEligibility" className='text-lg font-semibold'>Engineering Eligibility </label>
                      <input 
                        type="number" 
                        required
                        name='enggEligibility'
                        id='enggEligibility'
                        placeholder='Enter  enggEligibility '
                        className='bg-transparent px-2 py-1 border'
                        value={userDetails.enggEligibility}
                        onChange={handleUserInput}
                      />
                    </div> 
  
                   
                    </div>
                   
  
  
                </div>
            </main>
  
            <button 
              type='submit' 
              className='w-full bg-yellow-600 hover:bg-yellow-300 transition-all ease-in-out duration-300 mt-4 py-2 rounded-sm font-semibold text-lg cursor-pointer'>
                Update Company
            </button>
        </form>
        </div>
      </BaseLayout>
    )
}

export default UpdateCompany