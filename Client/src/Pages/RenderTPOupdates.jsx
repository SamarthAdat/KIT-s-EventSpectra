import React, { useEffect, useState } from 'react';
import BaseLayout from '../Layouts/BaseLayout';
import axiosInstance from '../Helpers/axiosInstance';
import 'tailwindcss/tailwind.css';  // Ensure Tailwind CSS is imported

function RenderTPOupdates() {
  const [dataArray, setDataArray] = useState([]);

  async function getUpdateData() {
    try {
      const res = await axiosInstance.get('/get-tpo-data');
      const dataArray = res?.data?.updateData;
      const reversedArray = dataArray.reverse();

      setDataArray(reversedArray);
    } catch (error) {
      console.log(error?.message);
    }
  }

  useEffect(() => {
    getUpdateData();
  }, []);

  return (
    <BaseLayout>
      <div className="flex flex-col items-center pt-16 mb-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6 border-b-4 border-blue-500 pb-2">
          TPO Updates
        </h1>
        <ol className="w-full max-w-2xl p-0 list-none">
          {dataArray.map((item) => (
            <li
              key={item._id}
              className="bg-white border border-gray-300 rounded-lg p-4 my-4 text-center shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              {item?.data}
            </li>
          ))}
        </ol>
      </div>
    </BaseLayout>
  );
}

export default RenderTPOupdates;
