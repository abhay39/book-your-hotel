"use client"
import { AuthenicationProvider } from '@/authProvider';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import CheckOut from './checkout';

const page = ( {params} ) => {

    const [details,setDetails]=useState('');
    const {BACKEND_URL,userData,setUserData}=useContext(AuthenicationProvider);
    const [isLoading,setIsLoadig]=useState(true);

    const [isBooked,setIsBooked]=useState(true);
    const [checkInDate,setCheckInDate]=useState("");
    const [checkOutDate,setCheckOutDate]=useState("");
    const [roomNumber,setRoomNumber]=useState(0);

    useEffect(()=>{
        getHotelsDetails()
    },[])

    const getHotelsDetails =async()=>{
        const res= await fetch(`${BACKEND_URL}/api/getHotels/${params.id}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            }
        })
        const data=await res.json()
        setIsLoadig(false)
        setDetails(data.data)
    }

    const [token,setToken]=useState('');

    const getStatus=()=>{
        let userState=localStorage.getItem('userStatus');
        let token=localStorage.getItem('token');
        setToken(token);
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

    useEffect(()=>{
        getStatus();
        getUserData();
    },[token,userData])

    const bookHotel=async()=>{
        const res=await fetch(`${BACKEND_URL}/api/bookHotelRoom`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                hotelId:details._id,
                userId:userData._id,
                price:details.price,
                checkInDate:checkInDate,
                checkOutDate:checkOutDate,
            })
        })
        const data=await res.json()
    }
    const totalNumberofRooms=details?.totalRooms;
    const roomNumbers = Array.from({ length: totalNumberofRooms }, (_, index) => index + 1);

  return (
    <div>
        {
        isLoading?(<div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>):(<div className='sm:h-full'>
        <div className='md:flex items-center h-fit justify-around'>
            <div className='sm:w-full md:w-1/3'>
                <Image loading='lazy' src={details.thumbnail} height={600} width={600} alt='hotel image' className="rounded-xl"/>
            </div>
            <div className='sm:w-full md:w-1/3 md:ml-6'>
                <h1 className='font-bold text-3xl'>{details.hotelName}</h1>
                <p className='text-gray-500 text-justify'>{details.description}</p>
                <h3 className='font-bold text-gray-500'>&#8377;. {details.price}/-</h3>
            </div>
            <div>
                <button className='bg-blue-400 text-white p-3 cursor-pointer rounded text-xl' onClick={()=>setIsBooked(!isBooked)}>Book Now</button>
            </div>
        </div>
        </div>)
        }
        {isBooked?(
          <div className="mt-7 bg-slate-400 p-3 md:w-1/2 sm:w-full rounded-lg">
            <h1 className='text-xl font-bold'>Details to be filled while booking room</h1>  
            <div>
              <div>
                <label>Choose In Date: </label>
                <input className='p-2 bg-slate-600 rounded text-white' type="date" name="checkInDate" onChange={(e)=>setCheckInDate(e.target.value)}/>
              </div>
              <br/>
              <div>
                <label>Choose Out Date: </label>
                <input className='p-2 bg-slate-600 rounded text-white' type="date" name="checkOutDate" onChange={(e)=>setCheckOutDate(e.target.value)}/>
              </div>
            </div>
            <div className='flex flex-wrap mt-2'>
                {roomNumbers.map((item)=>{
                  return(
                    <button onClick={()=>setRoomNumber(item)} className='bg-green-600 ml-2 mb-2 text-white w-10 p-2 rounded'>{item}</button>
                  )
                })}
            </div>
            <h1 className='font-bold text-orange-800'>Price: &#8377;. {details.price}</h1>
            <button className='bg-blue-400 mt-4 text-white p-3 cursor-pointer rounded text-xl' onClick={()=>{
              CheckOut({
                lineItems:[{
                  "price":'price_1NwAkSSCvvDElO2e6fkQb4Zg',
                  quantity:1
                }]
              })
            }}>Proceed to payment</button>
          </div>
        ):("")}
    </div>
  )
}

export default page