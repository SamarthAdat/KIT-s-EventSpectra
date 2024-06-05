import React, { useState } from 'react';
import BaseLayout from '../Layouts/BaseLayout';
import axios from 'axios';
import axiosInstance from '../Helpers/axiosInstance';
import toast from 'react-hot-toast';

function TPOupdate() {

    const [data,setData] = useState('')

    // function onDataChange(){
        
    // }

    async function submitData(e){
        e.preventDefault()

        try {
            const res = await axiosInstance.post('tpo-update',{data})
            // console.log(res);
            setData('')

            toast.success('Pushed Data !')
        } catch (error) {
            console.log(error.message);
        }
    }

  return (
    <BaseLayout >
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">TPO Updates  </h2>
          <form className="space-y-4" onSubmit={submitData}>
            
            <div>
              <label className="block text-sm font-medium text-gray-700"> Enter Message</label>
              <textarea
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows="4"
                placeholder="Enter your message"
                value={data}
                onChange={(e)=> setData(e.target.value)}
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </BaseLayout>
  );
}

export default TPOupdate;
