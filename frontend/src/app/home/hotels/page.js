/* eslint-disable react/jsx-no-duplicate-props */
"use client"
import { hotels } from '@/hotel'
import Image from 'next/image'
import React, { useState } from 'react'

const Hotels = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isTabActive,setIsTabActive]=useState(false)

  const [filteredHotels, setFilteredHotels] = useState(hotels);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    const filtered = hotels.filter((hotel) => {
      const { desc, address } = hotel;
      return desc.toLowerCase().includes(query) || address.toLowerCase().includes(query);
    });
    setFilteredHotels(filtered);
  };

  const [sortedHotels, setSortedHotels] = useState(hotels);

  // Function to sort hotels by price (low to high)
  const sortLowToHigh = () => {
    const sorted = [...sortedHotels];
    sorted.sort((a, b) => a.price - b.price);
    setSortedHotels(sorted);
  };

  // Function to sort hotels by price (high to low)
  const sortHighToLow = () => {
    const sorted = [...sortedHotels];
    sorted.sort((a, b) => b.price - a.price);
    setSortedHotels(sorted);
  };

  return (
    <div>
        <div>
          <h1 className='font-bold text-2xl text-red-400 mb-3'>Search for the hotels near your</h1>
          <input value={searchQuery} placeholder='Enter the name of hotel' className='p-2 border-black border-2 outline-lime-300 rounded' onChange={handleSearch}/>
          <button className='text-white bg-blue-600 p-2 ml-5 rounded' onClick={handleSearch}>Search</button>
        </div>

        <div className='mt-3 md:flex items-center'>
          <h2 className='font-bold text-lg'>Sort By : </h2>
          <div>
            <ul className='flex justify-between ml-5'>
              <li onClick={()=>setIsTabActive(true)}>
                <p className='ml-5 cursor-pointer' style={{
                  color:isTabActive?'red':'gray',
                }} onClick={sortLowToHigh} >Price -- Low to High</p>
              </li>
              <li onClick={()=>setIsTabActive(true)}>
                  <p style={{
                  color:isTabActive?'red':'gray'
                }} onClick={sortHighToLow} className='ml-5 cursor-pointer'>Price -- High to Low</p>
              </li>
            </ul>
          </div>
        </div>
        


      {isTabActive?(<div className='mt-5 flex flex-wrap justify-between'>
        {sortedHotels.map((item) => (
          <div key={item.id} className='bg-white cursor-pointer mb-4'>
            <Image loading="lazy" src={item.image} alt='hotels' height={350} width={400} className='rounded' />
            <h1 className='font-bold'>{item.address}</h1>
            <p>{item.desc}</p>
            <p>{item.time}</p>
            <h1><strong>&#8377; {item.price}</strong> night</h1>
        </div>
        ))}
      </div>):(
      <div className='mt-5 flex flex-wrap justify-between'>
    {filteredHotels.length>0?(
      filteredHotels.map((item) => (
      <div key={item.id} className='bg-white cursor-pointer mb-4'>
        <Image loading="lazy" src={item.image} alt='hotels' height={350} width={400} className='rounded' />
        <h1 className='font-bold'>{item.address}</h1>
        <p>{item.desc}</p>
        <p>{item.time}</p>
        <h1><strong>&#8377; {item.price}</strong> night</h1>
    </div>
))
):(<h1 className='text-3xl text-red-800 text-center items-center justify-center'>No hotels </h1>)}
</div>)}
      
    </div>
  )
}

export default Hotels