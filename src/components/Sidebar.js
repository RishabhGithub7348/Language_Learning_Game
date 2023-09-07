"use client"
import Link from "next/link";
import Image from "next/image";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import axios from "axios";
import { PostContext } from "@/context/PostContext";
import { useContext } from "react";
import { usePathname } from "next/navigation";

import { LuLayoutDashboard } from "react-icons/lu";
import {MdOutlineLeaderboard} from "react-icons/md";

import { AiOutlineProfile ,AiOutlineSetting} from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";

const Sidebar = () => {
  const {isAuth,isAdmin, setIsAuth} = useContext(PostContext)
    const router = useRouter()
    const pathname = usePathname()
    
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            setIsAuth(false);
            router.push('/')
            router.refresh();
        } catch (error) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    return (
        <div className="bg-[#FFFFFF] w-[250px] custom p-5 h-screen  min-[1200px]:block  fixed z-30 border-r-2 flex-shrink-0">
            <div className="flex  flex-col  justify-between h-full  ">
            <div className="flex flex-col  gap-9">
             <div className="flex justify-center items-center">
             <div className="flex justify-center   items-center p-3 w-[183px] h-[47px]">
                <p className="text-[#49c035e5] text-[34px] font-[700] leading-[normal]">Lingui</p>
              </div>
             </div>

             <div className="flex  justify-center items-center ">
                
                  <Link
                  href="/dashboard"
                  >
                <div className={`flex  justify-center items-center rounded-[8px] p-3 shadow-lg  border-[#413B89]  text-[#222222E5] ${pathname === '/dashboard' ? 'bg-green-400' : 'bg-gray-100'} w-[183px] h-[47px]`}>
                    <div className="flex items-center gap-2">
                    <LuLayoutDashboard className={`text-[#222222E5] text-[20px] font-[500] leading-[normal] ${pathname === '/dashboard' ? 'text-white' : ''} `} />
                    <p className={`text-[#222222E5] text-[20px] font-[600] leading-[normal] ${pathname === '/dashboard' ? 'text-white' : ''}`}>DashBoard</p>
                    </div>
                  </div>
                  </Link>
                </div>


              
              <div className="flex  justify-center items-center ">
                
                <Link
                href="/leaderboard"
                >
               
              <div className={`flex  justify-center items-center rounded-[8px] p-3 bg-gray-100 shadow-lg border-[#413B89] text-[#222222E5] ${pathname === '/leaderboard' ? 'bg-green-400' : ''} w-[183px] h-[47px]`}>
                <div className="flex items-center gap-2">
                <MdOutlineLeaderboard className={`text-[#222222E5] text-[20px] font-[500] ${pathname === '/leaderboard' ? 'text-white' : ''} leading-[normal]`}/>
                  <p className={`text-[#222222E5] text-[20px] font-[600] ${pathname === '/leaderboard' ? 'text-white' : ''} leading-[normal]`}>LearderBoard</p>
                </div>
                </div>
                </Link>
              </div>

              <div className="flex  justify-center items-center ">
                
                <Link
                href="/profile"
                >
                <div className={`flex  justify-center items-center rounded-[8px] bg-gray-100 p-3 shadow-lg border-[#413B89] text-[#222222E5] ${pathname === '/profile' ? 'bg-green-400' : ''} w-[183px] h-[47px]`}>
               <div className="flex items-center -ml-5 gap-2">
               <AiOutlineProfile className={`text-[#222222E5] text-[20px] font-[500] ${pathname === '/profile' ? 'text-white' : ''} leading-[normal `} />
                 <p className={`text-[#222222E5] text-[20px] font-[600] leading-[normal] ${pathname === '/profile' ? 'text-white' : ''} `}>My Profile</p>
               </div>
                </div>
                </Link>
              </div>

              <div className="flex  justify-center items-center ">
                
                <Link
                href="/setting"
                >
                <div className={`flex  justify-center items-center rounded-[8px]  bg-gray-100 p-3 shadow-lg border-[#413B89] text-[#222222E5] ${pathname === '/setting' ? 'bg-green-400' : ''} w-[183px] h-[47px]`}>
                <div className="flex items-center gap-2 -ml-6">
                <AiOutlineSetting className={`text-[#222222E5] text-[20px] font-[900] ${pathname === '/setting' ? 'text-white' : ''} leading-[normal]`}/>
                 <p className={`text-[#222222E5] text-[20px] font-[600]  leading-[normal] ${pathname === '/setting' ? 'text-white' : ''} `}>Setting</p>
                </div>
                </div>
                </Link>
              </div>

              <div className={`${!isAdmin ? "hidden" : "flex"}  justify-center items-center `}>
                
                <Link
                href="/administrator"
                >
                <div className={`flex  justify-center items-center rounded-[8px]  bg-gray-100 p-3 shadow-lg border-[#413B89] text-[#222222E5] ${pathname === '/administrator' ? 'bg-green-400' : ''} w-[183px] h-[47px]`}>
                <div className={` flex items-center gap-2`}>
                <RiAdminLine className={`text-[#222222E5] text-[20px] font-[900] ${pathname === '/administrator' ? 'text-white' : ''} leading-[normal]`}/>
                 <p className={`text-[#222222E5] text-[20px] font-[600] leading-[normal] ${pathname === '/administrator' ? 'text-white' : ''} `}>Administrator</p>
                </div>
                </div>
                </Link>
              </div>

             


            </div>
            <div className="flex items-center justify-center mt-auto">
             
             <button  onClick={logout} className="text-[#222222E5] text-[16px] font-[500] leading-[normal]">Logout</button>
             
            </div>
            </div>
        </div>
    );
};

export default Sidebar;
