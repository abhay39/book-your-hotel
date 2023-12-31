"use client"
import Image from "next/image"
import logo from '../../../public/logo.jpeg';
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SignInModal from "./signInModel";
import { signOut, useSession } from "next-auth/react";
import AuthProvider from "@/components/AuthProvider";
import { AuthenicationProvider } from "@/authProvider";
import {GrBladesVertical} from 'react-icons/gr';

export const metadata = {
title: 'Book Your Room',
description: 'Book your room from your home',
}
  
export default function Layout({ children }) {
    const {userData,userState,setUserData,setUserState,userStatus,setUserStatus,BACKEND_URL}=useContext(AuthenicationProvider);
    

    const [user,setUser]=useState(true);
    const route=useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [token,setToken]=useState('');

    const getStatus=()=>{
        let userState=localStorage.getItem('userStatus');
        let token=localStorage.getItem('token');
        setToken(token);
        setUserStatus(userState)
    }
    useEffect(()=>{
        getStatus()
    },[])

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const logout=()=>{
    localStorage.clear()
    setUserStatus('unauthenticated')
  }


  const [openNav,setOpenNav]=useState(false);



return (
    <div className="">
        <div className="p-4 shadow-md">
        <header>
            <nav>
                <ul className="flex justify-between  items-center">
                    <ul className="cursor-pointer" onClick={()=>route.push("/home")}>
                        <Image src={logo} alt='logo' height={60} width={100} className="object-fit" />
                    </ul>

                    {openNav?(<div onClick={()=>setOpenNav(!openNav)} className="cursor-pointer p-1 bg-cyan-300 rounded">
                        <GrBladesVertical size={20} color={'black'} />
                    </div>):(<ul className="hidden md:flex sm:flex">
                        <li onClick={()=>route.push("/home")}>Home</li>
                        <li className="ml-6" onClick={()=>route.push("/home/hotels")}>Check Rooms</li>
                        <li className="ml-6" onClick={()=>route.push("/home/about")}>About</li>
                        <li className="ml-6" onClick={()=>route.push("/home/contact")}>Contact Us</li>
                        
                        <li className="ml-6"  onClick={()=>route.push("/home/profile")}>{userStatus=='authenticated'?('My Profile'):('')}</li>
                    </ul>)}

                    <ul>
                        {userStatus==='authenticated'?
                        (<button onClick={logout} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                            Sign Out
                        </button>)
                        :
                        (<button onClick={openModal} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Sign In
                    </button>)
                    }
                    </ul>
                </ul>
                <SignInModal isOpen={isModalOpen} onClose={closeModal} />
            </nav>
        </header>
    </div>
    <div className="p-4">
        {children}
    </div>
    <footer className="bg-slate-100 p-3">
        <div className="md:flex md:flex-row justify-between">
            <div>
                <h1 className="font-bold">Support</h1>
                <ul>
                    <li>Help Center</li>
                    <li>AirCover</li>
                    <li>Anti-Discrimination</li>
                    <li>Disability Support</li>
                    <li>Cancellation Options</li>
                    <li>Report neighbourhood concern</li>
                </ul>
            </div>
            <div className="">
                <h1 className="font-bold">Hosting</h1>
                <ul>
                    <li>Airbnb your home</li>
                    <li>AirCover for Hosts</li>
                    <li>Hosting resources</li>
                    <li>Community forum</li>
                    <li>Hosting responsibility</li>
                </ul>
            </div>
            <div>
                <h1 className="font-bold">Airbnb</h1>
                <ul>
                    <li>Newsromm</li>
                    <li>New features</li>
                    <li>Carrers</li>
                    <li>Disability Support</li>
                    <li>Cancellation Options</li>
                    <li>Report neighbourhood concern</li>
                </ul>
            </div>
        </div>
        <hr/>
        <div className="text-center justify-center mt-2">
            <p>&copy; 2023 Airbnb, Inc.</p>
            <ul className="flex items-center justify-between">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Sitemap</li>
                <li>Company details</li>
            </ul>
        </div>
    </footer>
    </div>
)
}