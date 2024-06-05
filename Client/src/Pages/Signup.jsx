import React, { useState } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import BaseLayout from '../Layouts/BaseLayout'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux';
import { createAccount } from '../Redux/Slices/authSlice';

function Signup() {

  const [previewImage, setPreviewImage] = useState('');
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [signupData,setSignupData] = useState({
    fullName: "" ,
    email: "" ,
    password: "" ,
    avatar: "" 
  })

  function handleUserInput (e) {
    const {name, value} = e.target
    setSignupData({
        ...signupData,
        [name] : value
    })
  }

  function getImage(e){
    e.preventDefault()

    const uploadedImage = e.target.files[0]

    if(uploadedImage){    
        setSignupData({
            ...signupData,
            avatar: uploadedImage
        })

        const fileReader = new FileReader()
        fileReader.readAsDataURL(uploadedImage)
        fileReader.addEventListener('load',function (){
            setPreviewImage(this.result)
        })
    }

  }

  async function createNewAccount (e) {
    e.preventDefault() 

    if(!signupData.fullName || !signupData.email || !signupData.password){
      toast.error('Please fill all the details !')
      return
    }

    if(!signupData.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
      toast.error('Enter a valid email !')
      return
    }

    if(signupData.fullName.length < 5){
      toast.error('Name should be atleast of 5 characters !')
      return
    }

    if(!signupData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/)){
      toast.error('Enter a strong password !')
      return
    }

    const formData = new FormData()

    formData.append('fullName',signupData.fullName)
    formData.append('email',signupData.email)
    formData.append('password',signupData.password)
    formData.append('avatar',signupData.avatar)

    const response = await dispatch(createAccount(formData))
    // console.log(response);
    if(response?.payload?.data?.success){
      navigate('/')
    }

    setSignupData({
      fullName: "" ,
      email: "" ,
      password: "" ,
      avatar: "" 
    })

    setPreviewImage('')

  }

  return (
    <BaseLayout>
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <form noValidate onSubmit={createNewAccount} className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'>
        <h1 className='text-center text-2xl font-bold mb-6'>Register</h1>

        <label htmlFor='image_uploads' className='block text-center cursor-pointer mb-4'>
          {previewImage ? (
            <img className='w-24 h-24 rounded-full m-auto' src={previewImage} alt='Profile Preview' />
          ) : (
            <BsPersonCircle className='w-24 h-24 rounded-full m-auto' />
          )}
        </label>

        <input
          className='hidden'
          type='file'
          name='image_uploads'
          id='image_uploads'
          accept='.jpg, .jpeg, .png, .svg'
          onChange={getImage}
        />

        <div className='mb-6'>
          <input
            type='text'
            required
            name='fullName'
            id='fullName'
            placeholder='Enter your full-name...'
            className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
            onChange={handleUserInput}
            value={signupData.fullName}
          />
        </div>

        <div className='mb-4'>
          <input
            type='email'
            required
            name='email'
            id='email'
            placeholder='Enter your Email...'
            className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
            onChange={handleUserInput}
            value={signupData.email}
          />
        </div>

        <div className='mb-6'>
          <input
            type='password'
            required
            name='password'
            id='password'
            placeholder='Enter your password...'
            className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
            onChange={handleUserInput}
            value={signupData.password}
          />
        </div>

        <button
          className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all'
          type='submit'
        >
          Create Account
        </button>

        <p className='mt-4 text-center'>
          Already have an account?{' '}
          <Link to='/login' className='text-blue-500 hover:underline'>
            Login
          </Link>
        </p>
      </form>
    </div>
    </BaseLayout>
  );
}

export default Signup;
