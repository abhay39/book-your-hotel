/* eslint-disable react-hooks/rules-of-hooks */
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import {FcGoogle} from 'react-icons/fc';


function SignInModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [selectedTab, setSelectedTab] = useState(1);

    const [formData, setFormData] = useState({
      email: '',
      password:'',
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // console.log(formData);
      onFormDataReceived(formData);
      onClose()
    };

    const BACKEND_URL=process.env.BACKEND_URL;
    const loginNow=async()=>{
      let res=await fetch(`${BACKEND_URL}/auth/signIn`,{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          'email':formData.email,
          'password':formData.password
        })
      })
      let status=res.status;
      res=await res.json();
      console.log(res.token,status)
      document.cookie = `token=${res.token}; user=${true} path=/;`;
    }

  const handleTabChange = (tabNumber) => {
    setSelectedTab(tabNumber);
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex justify-center items-center sm:w-full'>
        <div className='w-full sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[40%]'>
          <div className='bg-white p-4 sm:p-2 md:p-2 lg:p-4 xl:p-4 rounded-xl items-center'>
            <h1 className='text-2xl text-center font-bold'>Login / Sign Up</h1>
            <br />
            <div className='p-4'>
              <ul className='flex justify-between items-center'>
                <li
                  className={`cursor-pointer  p-2 ${
                    selectedTab === 1 ? 'text-white rounded text-xl  bg-slate-600 w-[260px] text-center' : 'text-white rounded text-xl  bg-gray-300 w-[260px] text-center'
                  }`}
                  onClick={() => handleTabChange(1)}
                >
                  Login
                </li>
                <li
                  className={`cursor-pointer p-2 ${
                    selectedTab === 2 ? 'text-white rounded text-xl  bg-slate-600 w-[260px] text-center' : 'text-white rounded text-xl  bg-gray-300 w-[260px] text-center'
                  }`}
                  onClick={() => handleTabChange(2)}
                >
                  {selectedTab===2?"Sign Up":"Register"}
                </li>
              </ul>
              {selectedTab === 1 && (
                <div>
                  
                    <div className='p-4'>
                        <label>Email/Username</label><br/>
                        <input name='email' value={formData.email} onChange={handleInputChange}  type='email' placeholder='Eg. John@xyz.com' className='p-3 border-none outline-none bg-slate-300 w-full sm:w-[90%] md:w-[80%] lg:w-[100%] xl:w-[100%] rounded '/>
                    </div>
                    <div className='p-4'>
                        <label>Enter Password</label><br/>
                        <input name='password' value={formData.password} onChange={handleInputChange}  type='password' placeholder='Eg. *********' className='p-3 border-none outline-none bg-slate-300 w-full sm:w-[90%] md:w-[80%] lg:w-[100%] xl:w-[100%] rounded '/>
                    </div>
                    <div className='flex items-start justify-center'>
                      <button onClick={()=>loginNow()} className='bg-[#3E84F8] p-3 mx-40 text-2xl text-white rounded-lg w-[120px] flex flex-row items-center justify-center'>Login</button>
                    </div>
                    
                    <hr className='mt-2'/>
                    <p className=' flex items-center text-center justify-center'>or</p>
                    <hr className='mb-2'/>

                    <div className='flex justify-between'>
                      <div onClick={()=>{
                        signIn('google')
                      }} className='bg-gray-200 flex items-center p-3 rounded w-52 cursor-pointer'>
                        <FcGoogle size={20}/>
                        <h1 className='ml-2'>SignUp with Google</h1>
                      </div>
                      <div onClick={()=>{
                        signIn('github')
                      }} className='bg-gray-200 flex items-center p-3 rounded w-52 cursor-pointer'>
                        <FaGithub size={20}/>
                        <h1 className='ml-2'>SignUp with Github</h1>
                      </div>
                    </div>
                    
                    <div className='flex justify-center items-center'>
                      <button onClick={onClose} className='bg-red-500 my-2 ml-3 px-3 p-4 text-xl text-white rounded-lg w-[100px] '>Close</button>
                    </div>

                   {/* <div className='flex mt-2 items-center text-center justify-center'>
                    <p>Don't have an account? </p>
                    <p className="text-purple-500 cursor-pointer" onClick={()=>setSelectedTab(2)}> Signup?</p>
                    </div> */}
                </div>
              )}
              {selectedTab === 2 && (
                <div>
                  <div className='p-4'>
                        <label>Instagram Link (Optional)</label><br/>
                        <input name='instagramUsername' value={formData.instagramUsername} onChange={handleInputChange}  type='url' placeholder='Eg. instagram.com/username' className='p-3 border-none outline-none bg-slate-300 w-full sm:w-[90%] md:w-[80%] lg:w-[100%] xl:w-[100%] rounded'/>
                    </div>
                    <div className='p-4'>
                    <label>Youtube Link (Optional)</label><br/>
                        <input  name='youtubeUsername' value={formData.youtubeUsername} onChange={handleInputChange} type='url' placeholder='Eg. youtube/username' className='p-3 border-none outline-none bg-slate-300 w-full sm:w-[90%] md:w-[80%] lg:w-[100%] xl:w-[100%] rounded'/>
                    </div>
                    
                    <div className='flex '>
                        <button onClick={()=>setSelectedTab(1)} className=' my-2 ml-3 px-3 p-4 text-2xl text-black rounded-lg w-[300px] border-black border-2 '>Back</button>
                        <button onClick={handleSubmit} className='bg-[#3E84F8] my-2 ml-3 px-3 p-4 text-2xl text-white rounded-lg w-[300px] '>Done</button>
                    </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}

export default SignInModal;
