"use client"
import { useContext } from "react";
import { PostContext } from "@/context/PostContext";
import Link from "next/link";

import Image from "next/image";

export default function AboutPage() {
    const {
        isAuth, setIsAuth,
     
         } = useContext<any>(PostContext);
    return (
        <div className="h-screen ">
        <div className="bg-[#fff5f1] px-6 lg:px-16 py-2 rounded-3xl">
        <div className=''>
        <div className="flex flex-col lg:flex-row justify-center  lg:justify-between items-center gap-5">
            <Image src="/images/logo.svg" alt="logo" width={150} height={150} />
          
           
        </div>
    </div>
          <div className="flex flex-col lg:flex-row justify-center  lg:justify-between items-center gap-5">
            <div className="flex flex-col gap-5 lg:gap-10">
              <p className=" text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium">
                A Unique approach <br className="lg:flex hidden"/> to learning foreign <br className="lg:flex hidden" /> languages
                online
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-gray-500">
                Learn at your own pace, with lifetime <br  className="lg:flex hidden"/> access on mobile and desktop
              </p>
              <Link href= "/login">
             
              <button className=" p-5 btn btn-sm lg:btn-lg bg-[#524fd5] text-white text-lg ml-7 rounded-full border-none w-36 lg:w-44 capitalize">Get Started</button>
              </Link>
            </div>
            <Image src="/images/hero.png" alt="" width={670} height={670} className="rounded-3xl "  />
          </div>
        </div>
      </div>
    )

}