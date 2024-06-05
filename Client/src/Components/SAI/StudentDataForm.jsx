  import React, { useState } from 'react';
  import BaseLayout from '../../Layouts/BaseLayout';
import toast from 'react-hot-toast';
import axiosInstance from '../../Helpers/axiosInstance';

  const StudentDataForm = () => {

    const [showForm, setShowForm] = useState(false)
    const [showLastYearStudentField, setShowLastYearStudentField] = useState(true);

    const [formData, setFormData] = useState({
      name: '',
      email: '',
      dob: '',
      primaryPhoneNumber: '' ,
      secondaryPhoneNumber: '' ,
      gender: '' ,
      category: '' ,
      city: '' ,
      permanentAddress: '' ,
      state: '' ,
      pincode: '' ,
      aadhar: '' ,
      pan: '' ,
      licence : '',



      yearOfPassing10th: '',
      percentage10th: '',
      boardName10th: '' ,

      yearOfPassing12th: '',
      percentage12th: '',
      boardName12th: '' ,

      isDSY: '' ,
      yearOfPassingDiploma: '' ,
      diplomaSpecialzation: '' ,
      percentageDiploma: '',

      prn:'',
      sem1SGPA: '' ,
      sem2SGPA: '' ,
      sem3SGPA: '' ,
      enggAggregatePercentage: '',
      numberOfActiveBacklogs: '' ,
      numberOfYD: '',
      numberOfGap: '',
      reasonForGap: '' 
      


    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleSubmit = async  (e) => {
      e.preventDefault();

      //  console.log((formData.sem1SGPA - 0.5)*10);
      //  console.log((formData.sem2SGPA - 0.5)*10);
      //  console.log((formData.sem3SGPA - 0.5)*10);

      formData.enggAggregatePercentage = 

      ((formData.sem1SGPA - 0.5)*10 + (formData.sem2SGPA - 0.5)*10 + (formData.sem3SGPA - 0.5)*10)/3


      console.log('Agg', formData.enggAggregatePercentage);
     
      try {
        const response = axiosInstance.post('/user/student-data',formData )
        const temp = await response
        // console.log('temp',temp);

        if(temp?.data?.success){
          toast.success('Registered successfully')
        }
      } catch (error) {
        toast.error(error?.response?.data?.message)
      }


      setFormData({
        name: '',
        email: '',
        dob: '',
        primaryPhoneNumber: '' ,
        secondaryPhoneNumber: '' ,
        gender: '' ,
        category: '' ,
        city: '' ,
        permanentAddress: '' ,
        state: '' ,
        pincode: '' ,
        aadhar: '' ,
        pan: '' ,
        licence : '',
  
  
  
        yearOfPassing10th: '',
        percentage10th: '',
        boardName10th: '' ,
  
        yearOfPassing12th: '',
        percentage12th: '',
        boardName12th: '' ,
  
        isDSY: '' ,
        yearOfPassingDiploma: '' ,
        diplomaSpecialzation: '' ,
        percentageDiploma: '',
  
        prn:'',
        sem1SGPA: '' ,
        sem2SGPA: '' ,
        sem3SGPA: '' ,
        enggAggregatePercentage: '',
        numberOfActiveBacklogs: '' ,
        numberOfYD: '',
        numberOfGap: '',
        reasonForGap: '' 
      });
    };

    function handleSelectionChange(e){
        const { value } = e.target;
        setShowForm(value === 'Yes');
        setShowLastYearStudentField(value === 'No');
    }

    return (
      <BaseLayout>
        <h1 className='pt-[8rem] text-4xl text-center text-cyan-700'>Master Data-Sheet</h1>
        <div className="form-container  flex items-center justify-center p-6  rounded-lg shadow-md pt-24">
        

              {
                showLastYearStudentField && (
                  <div className="mb-4">
                    <label className="block font-bold mb-1">Are you a last year student?</label>
                    <select
                        name="lastYearStudent"
                        onChange={handleSelectionChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                 </div>
                )
              }
            

            {
              showForm && (
                <form onSubmit={handleSubmit} className="flex flex-col w-96" noValidate>
                <div className="mb-4">
                <label className="block font-bold mb-1">Name : <span className='text-red-700'>*</span></label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                </div>
                <div className="mb-4">
                <label className="block font-bold mb-1">Email: <span className='text-red-700'>*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                </div>
                <div className="mb-4">
                <label className="block font-bold mb-1">Date of Birth (DOB): <span className='text-red-700'>*</span></label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                </div>
                <div className="mb-4">
                <label className="block font-bold mb-1">Primary Phone no: <span className='text-red-700'>*</span></label>
                <input
                  type="number"
                  name="primaryPhoneNumber"
                  value={formData.primaryPhoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                </div>
                <div className="mb-4">
                <label className="block font-bold mb-1">Secondary Phone no: </label>
                <input
                  type="number"
                  name="secondaryPhoneNumber"
                  value={formData.secondaryPhoneNumber}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                </div>
                <div className="mb-4">
                <label className="block font-bold mb-1">Gender: <span className='text-red-700'>*</span></label>
            

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                </div>
                <div className="mb-4">
                <label className="block font-bold mb-1">Category: <span className='text-red-700'>*</span></label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                </div>
                <div className="mb-4">
                <label className="block font-bold mb-1">City: <span className='text-red-700'>*</span></label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                </div>
                <div className="mb-4">
                <label className="block font-bold mb-1">Permanent Address: <span className='text-red-700'>*</span></label>
                <input
                  type="text"
                  name="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                </div>
                <div className="mb-4">
                <label className="block font-bold mb-1">State: <span className='text-red-700'>*</span></label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                </div>
                <div className="mb-4">
                <label className="block font-bold mb-1">Pincode: <span className='text-red-700'>*</span></label>
                <input
                  type="number"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                </div>
                <div className="mb-4">
                <label className="block font-bold mb-1">Aadhar: <span className='text-red-700'>*</span></label>
                <input
                  type="number"
                  name="aadhar"
                  value={formData.aadhar}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                </div>
                <div className="mb-4">
                <label className="block font-bold mb-1">PAN: <span className='text-red-700'>*</span></label>
                <input
                  type="text"
                  name="pan"
                  value={formData.pan}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                </div>
                <div className="mb-4">
                <label className="block font-bold mb-1">Driving Licence:</label>
                <input
                  type="text"
                  name="licence"
                  value={formData.licence}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                </div>
                {/* Education Information */}
                <div className="mb-4">
                <label className="block font-bold mb-1">Year of Passing 10th: <span className='text-red-700'>*</span></label>
                <input
                  type="number"
                  name="yearOfPassing10th"
                  value={formData.yearOfPassing10th}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                </div>
                <div className="mb-4">
                <label className="block font-bold mb-1">10th Percentage: <span className='text-red-700'>*</span></label>
                <input
                  type="number"
                  name="percentage10th"
                  value={formData.percentage10th}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                </div>
                <div className="mb-4">
                <label className="block font-bold mb-1">Board Name (10th): <span className='text-red-700'>*</span></label>
                <input
                  type="text"
                  name="boardName10th"
                  value={formData.boardName10th}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                </div>
                <div className="mb-4">
                <label className="block font-bold mb-1">Year of Passing 12th: </label>
                <input
                  type="number"
                  name="yearOfPassing12th"
                  value={formData.yearOfPassing12th}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                </div>
                <div className="mb-4">
                <label className="block font-bold mb-1">12th Percentage: </label>
                <input
                  type="number"
                  name="percentage12th"
                  value={formData.percentage12th}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                </div>
                <div className="mb-4">
                <label className="block font-bold mb-1">Board Name (12th): </label>
                <input
                  type="text"
                  name="boardName12th"
                  value={formData.boardName12th}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                </div>
                <div className="mb-4">
                <label className="block font-bold mb-1">Is Direct Second Year (DSY)? <span className='text-red-700'>*</span></label>
                <select
                  name="isDSY"
                  value={formData.isDSY}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                </div>
                <div className="mb-4">
                <label className="block font-bold mb-1">Year of Passing Diploma: </label>
                <input
                type="number"
                name="yearOfPassingDiploma"
                value={formData.yearOfPassingDiploma}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                />
                </div>
                <div className="mb-4">
                <label className="block font-bold mb-1">Diploma Specialization: </label>
                <input
                type="text"
                name="diplomaSpecialzation"
                value={formData.diplomaSpecialzation}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                />
                </div>

                <div className="mb-4">
                <label className="block font-bold mb-1">Percentage in Diploma: </label>
                <input
                type="number"
                name="percentageDiploma"
                value={formData.percentageDiploma}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                />
                </div>


                <div className="mb-4">
                <label className="block font-bold mb-1">PRN: <span className='text-red-700'>*</span></label>
                <input
                type="number"
                name="prn"
                value={formData.prn}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                />
                </div>




                <div className="mb-4">
                <label className="block font-bold mb-1">First year CGPA: <span className='text-red-700'>*</span></label>
                <input
                type="number"
                name="sem1SGPA"
                value={formData.sem1SGPA}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                />
                </div>

                <div className="mb-4">
                <label className="block font-bold mb-1">Second year 2 CGPA: <span className='text-red-700'>*</span></label>
                <input
                type="number"
                name="sem2SGPA"
                value={formData.sem2SGPA}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
                />
                </div>


                <div className="mb-4">
                <label className="block font-bold mb-1">Third year 3 CGPA: <span className='text-red-700'>*</span></label>
                <input
                type="number"
                name="sem3SGPA"
                value={formData.sem3SGPA}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
                />
                </div>


                {/* <div className="mb-4">
                <label className="block font-bold mb-1">Engineering Aggregate Percentage: <span className='text-red-700'>*</span></label>
                <input
                type="number"
                name="enggAggregatePercentage"
                value={formData.enggAggregatePercentage}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
                />
                </div> */}

                <div className="mb-4">
                <label className="block font-bold mb-1">Number of Active Backlogs: <span className='text-red-700'>*</span></label>
                <input
                type="number"
                name="numberOfActiveBacklogs"
                value={formData.numberOfActiveBacklogs}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
                />
                </div>


                <div className="mb-4">
                <label className="block font-bold mb-1">Number of YD (Year Down): <span className='text-red-700'>*</span></label>
                <input
                type="number"
                name="numberOfYD"
                value={formData.numberOfYD}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
                />
                </div>


                <div className="mb-4">
                <label className="block font-bold mb-1">Number of Gap Years: <span className='text-red-700'>*</span></label>
                <input
                type="number"
                name="numberOfGap"
                value={formData.numberOfGap}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
                />
                </div>


                <div className="mb-4">
                <label className="block font-bold mb-1">Reason for Gap: </label>
                <textarea
                name="reasonForGap"
                value={formData.reasonForGap}
                onChange={handleChange}
                required
                rows="5"
                className="w-full p-2 border border-gray-300 rounded-md resize-none"
                
                ></textarea>
                </div>


                {/* More fields can be added here */}

                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Submit
                </button>
            </form>
              )
            }


        </div>
      </BaseLayout>
    );

  };

  export default StudentDataForm;
