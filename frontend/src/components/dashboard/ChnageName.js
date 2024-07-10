import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateName } from '../../services/operations/profileAPI';
import Button from '../../ReusableComponents/Button';

const ChnageName = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useSelector((state)=> state.auth);

    const [name ,setName] = useState("")
    
    function handleSubmit(e){
        e.preventDefault();
        if(name && token){
            dispatch(updateName(name,token,navigate));
        }

    }
  return (
    <div className='w-11/12 h-screen flex  justify-center items-center'>
        <form onSubmit={handleSubmit} className='bg-gray-300 rounded-sm shadow-sm py-4 px-6'>
         <h2 className='font-bold text-center text-2xl shadow-sm text-gray-900 mb-2'>Change Your Name</h2>
        <div className='flex flex-col gap-2'>
            <label htmlFor='name' className='text-gray-700 text-center'>Enter Name</label>
            <input type='text' required value={name} onChange={(e)=> setName(e.target.value)} className='text-center border-none rounded-sm p-1 mb-1' placeholder='Abhishek Nagar' />
        </div>
           <Button bgcolor="bg-orange-600 ml-8" >Change Name</Button>
        </form>
    </div>
  )
}

export default ChnageName