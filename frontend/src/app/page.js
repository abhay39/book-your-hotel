"use client"
import Image from 'next/image';
import {useRouter} from 'next/navigation'

export default function Home() {
  const route=useRouter();
  return (
    route.push("/home") 
  )
}
