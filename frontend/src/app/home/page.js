"use client"
import React from 'react'
import {FaUmbrellaBeach,FaArrowUpFromGroundWater, FaHotel, FaSwimmingPool} from 'react-icons/fa';
import {LiaUmbrellaBeachSolid} from 'react-icons/lia';
import {BiSolidHotel} from 'react-icons/bi';
import {GiFarmTractor} from 'react-icons/gi';
import Image from 'next/image';
import sample from '../../../public/sample.webp';
import { hotels } from '@/hotel';
import { useSession } from 'next-auth/react';
import greetingTime from 'greeting-time';
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
    const {status,data}=useSession();


  return (
    <div>
        <h1 className='font-bold text-red-600 mb-2 select-none'>{status==='authenticated'?(`Hey, ${greetingTime(new Date())}, ${data?.user.name}`):("")}</h1>
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
                    <div key={item.id} className='bg-white cursor-pointer mb-4'>
                        <Image loading="lazy" src={item.image} alt='hotels' height={350} width={400} className='rounded' />
                        <h1 className='font-bold'>{item.address}</h1>
                        <p>{item.desc}</p>
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