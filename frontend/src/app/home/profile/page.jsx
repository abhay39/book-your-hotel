"use client"
import { AuthenicationProvider } from '@/authProvider'
import { userBookings } from '@/hotel';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'

const page = () => {
    const {userData,userState,setUserData,setUserState,userStatus,setUserStatus,BACKEND_URL}=useContext(AuthenicationProvider);

    const [token,setToken]=useState('');

    const getStatus=()=>{
        let userState=localStorage.getItem('userStatus');
        let token=localStorage.getItem('token');
        setToken(token);
        setUserStatus(userState)
    }

    const getUserData=async()=>{
        let res = await fetch(`${BACKEND_URL}/api/getDetails`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "token": token
            }),
        });
        let status = res.status;
        res = await res.json();
        setUserData(res)
    }

    useEffect(()=>{
        getStatus()
        getUserData()
    },[token])

    

  return (
    <div className='flex items-center'>
        <div className='w-1/3'>
            <Image src={userData.profilePic} alt='profile' height={80} width={80} />
            <h1 className='font-bold'>Hey, {userData.name}</h1>
            <h1>email: {userData.email}</h1>
        </div>
        <div className='flex flex-col items-center justify-center h-full'>
            <h1 className='text-2xl font-bold mb-2'>My Booking </h1>
                {userData.booking?.length>0?(<table>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>In-Date</th>
                        <th>Out-Date</th>
                        <th>Venue</th>
                        <th>Price</th>
                        <th>Booked UID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.booking?.map((booking,index) => (
                        <tr key={booking.index}>
                            <td>{index+1}</td>
                            <td>{booking.checkInDate}</td>
                            <td>{booking.checkOutDate}</td>
                            <td>{booking.hotelName}</td>
                            <td>{booking.price}</td>
                            <td>{booking.id}</td>
                        </tr>
                        ))}
                    </tbody>
            </table>):(<h1>No Booking Done Yet</h1>)}
        </div>
    </div>
  )
}

export default page