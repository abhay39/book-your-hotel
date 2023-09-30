"use client"
import React, { useContext, useEffect, useState } from 'react'
import {FaUmbrellaBeach,FaArrowUpFromGroundWater, FaHotel, FaSwimmingPool} from 'react-icons/fa';
import {LiaUmbrellaBeachSolid} from 'react-icons/lia';
import {BiSolidHotel} from 'react-icons/bi';
import {GiFarmTractor} from 'react-icons/gi';
import Image from 'next/image';
import sample from '../../../public/sample.webp';
import { hotels } from '@/hotel';
import { useSession } from 'next-auth/react';
import greetingTime from 'greeting-time';
import { AuthenicationProvider } from '@/authProvider';
import { useRouter } from 'next/navigation';
const icons=[
    {
        id:1,
        icon:<FaUmbrellaBeach  size={30}/>,
        name:'Beachfront'
    },
    {
        id:2,
        icon:<FaUmbrellaBeach size={30}/>,
        name:'OMG'
    },
    {
        id:3,
        icon:<LiaUmbrellaBeachSolid  size={30}/>,
        name:'Beach'
    },
    {
        id:4,
        icon:<FaHotel  size={30}/>,
        name:'Historicalroom'
    },
    {
        id:5,
        icon:<BiSolidHotel  size={30}/>,
        name:'Rooms'
    },
    {
        id:6,
        icon:<FaSwimmingPool  size={30}/>,
        name:'Amazing pools'
    },
    {
        id:7,
        icon:<GiFarmTractor  size={30}/>,
        name:'Farm'
    },   
]

const Homepage = () => {
    const router=useRouter();
    const {userData,userState,setUserData,setUserState,userStatus,setUserStatus,BACKEND_URL}=useContext(AuthenicationProvider);

    const [token,setToken]=useState('');
    const [hotels,setHotels]=useState([]);

    const getStatus=()=>{
        let userState=localStorage.getItem('userStatus');
        let token=localStorage.getItem('token');
        setToken(token);
        setUserStatus(userState)
    }

    const getUserData=async()=>{
        try {
            const res = await fetch(`${BACKEND_URL}/api/getDetails`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: token,
              }),
            });
          
            if (!res.ok) {
              throw new Error(`Request failed with status ${res.status}`);
            }
          
            const data = await res.json();
            setUserData(data);
          } catch (error) {
            console.error("Error fetching user data:", error);
            // Handle the error, e.g., show an error message to the user
          }          
    }
    
    const getHotels=async()=>{
        try {
            let res = await fetch(`${BACKEND_URL}/api/getHotels`);
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
            let data = await res.json();
            setHotels(data.data);
          } catch (error) {
            console.error('Fetch error:', error);
          }          
    }

    useEffect(()=>{
        getStatus()
        getUserData()
        getHotels()
    },[token,userData])

    

  return (
    <div>
        <h1 className='font-bold text-red-600 mb-2 select-none'>{userStatus==='authenticated'?(`Hey, ${greetingTime(new Date())}, ${userData.name}`):("")}</h1>
        <div className=' flex-wrap justify-between shadow-lg rounded-sm p-2 hidden md:flex'>
            {icons.map((item)=>{
                return(
                    <div key={item.id} className='items-center justify-center cursor-pointer opacity-50 h-14 hover:opacity-100 flex flex-col'>
                        {item.icon}
                        <h4>{item.name}</h4>
                    </div>
                )
            })}
        </div>

        {/* adding hotels now */}
        <div className='mt-5 flex flex-wrap justify-between'>
            {hotels.map((item)=>{
                return(
                    <div key={item._id} className='bg-white cursor-pointer mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2'>
                    <div className='h-64' onClick={()=>{
                        router.push(`/home/${item._id}`)
                    }}> {/* Set a fixed height for the container */}
                        <Image
                        loading="lazy"
                        src={item.thumbnail}
                        alt='hotels'
                        width={320}
                        height={320}
                        className='rounded object-fit w-full h-full' /* Apply object-fit: cover */
                        />
                    </div>
                    <h1 className='font-bold'>{item.hotelName}</h1>
                    <h1 className=''>{item.address}</h1>
                    <p>{item.time}</p>
                    <h1><strong>&#8377; {item.price}</strong> night</h1>
                    </div>

                )
            })}
        </div>
    </div>
  )
}

export default Homepage