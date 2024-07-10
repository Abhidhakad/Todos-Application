import React from 'react'
import { Link,useNavigate } from 'react-router-dom';
import {logout} from '../../services/operations/authAPI';
import { useDispatch } from 'react-redux';
import {setLoggedIn} from '../../slices/AuthSlice'

const ProfileDetail = ({onLogout}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function logoutHandler(){
        onLogout();
        dispatch(logout(navigate));
    }
  return (
    // <div className="hidden md:block">
    //         <IconBtn
    //           text="Edit"
    //           onclick={() => {
    //             navigate("");
    //           }}
    //         ></IconBtn>
    //       </div>





    <div className='flex flex-col justify-start items-start gap-1 font-medium'>
        <Link to="/dashboard/my-profile">  
        <div className='bg-gray-100 rounded-md shadow-sm px-2 py-1 text-center mt-1 hover:bg-gray-200 transition-all duration-200 ease-in cursor-pointer' 
        >Profile Detail</div>
        </Link>
        
        <div className='bg-gray-100 z-[900] rounded-sm shadow-sm px-2 py-1 text-center mt-1 hover:bg-gray-200 transition-all duration-200 ease-in cursor-pointer group'
        >Edit Profile
        <div className=" absolute right-32 -translate-x-8 -translate-y-3 invisible top-14 p-2 bg-gray-200 z-[-10] flex flex-col w-44 items-start bg-opacity-95 rounded-md shadow-md text-black transition-all duration-200 group-hover-[1]:visible group-hover-[1]:opacity-100">
        <Link to='/dashboard/settings'>
            <div className='bg-gray-100 rounded-md shadow-sm px-2 py-1 text-center mt-1 hover:bg-gray-200 transition-all duration-200 ease-in cursor-pointer'
        >Upadate Password</div>
        </Link>
        <Link  to='/updatename' >
        <div className='bg-gray-100 rounded-md shadow-sm px-2 py-1 text-center mt-1 hover:bg-gray-200 transition-all duration-200 ease-in cursor-pointer'
        >Update Name</div>   
        </Link>   
        <div className="absolute right-20 w-5 h-5 bg-gray-200 shadow-xl -rotate-45 translate-y-[30%] translate-x-[430%]"></div>
        </div>  
        </div>  
        <Link to='#'>
        <div className='bg-gray-100 rounded-sm shadow-sm px-2 py-1 text-center mt-1 hover:bg-gray-200 transition-all duration-200 ease-in cursor-pointer'
        >Delete Profile</div>
        </Link>
       <div className='bg-gray-100 rounded-sm shadow-sm px-2 py-1 text-center mt-1 hover:bg-gray-200 transition-all duration-200 ease-in cursor-pointer mb-1'
        onClick={logoutHandler}>
            Logout
        </div>
    </div>
  )
}

export default ProfileDetail;