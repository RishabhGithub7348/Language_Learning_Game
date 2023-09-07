"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { GoX } from "react-icons/go";


import { Loading, Spacer } from "@nextui-org/react";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
    
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      toast.success("Signup success");
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0 

    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
    <div className="flex flex-col  bg-[#FAFBFF]  min-h-screen w-screen">
         <div className="flex items-center   justify-between p-9">
       <GoX  className="text-4xl cursor-pointer" onClick={() => router.push("/")}/>
       <Link
        href="/login">
          <div className="flex items-center cursor-pointer justify-center">
        <button className="bg-[#41b8d6] text-white cursor-pointer py-2 px-4 rounded-md"
        >Login IN</button>
       </div>
        </Link>  
      </div>

      <div className="flex flex-col items-center">
      <div className="flex items-center justify-center mt-9">
       <h1 className="text-2xl font-extrabold text-slate-800  ">Create your Profile</h1>
      </div>

      <div className="flex w-[400px] mx-auto items-center justify-center mt-7">
      <input className='flex-1 items-center outline-0 text-slate-600 font-semibold  focus:border focus:ring-2  focus:ring-blue-500 focus:border-blue-500 focus:outline-none border-2 rounded-[10px] bg-slate-100 p-3'
           name="username"
           type="text"
           placeholder="Name"
           value={user.username}
           onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
      </div>

      <div className="flex w-[400px] mx-auto items-center justify-center mt-7">
      <input className='flex-1 items-center outline-0 text-slate-600 font-semibold  focus:border focus:ring-2  focus:ring-blue-500 focus:border-blue-500 focus:outline-none border-2 rounded-[10px] bg-slate-100 p-3'
            name="email"
            type="email"
            placeholder="Email "
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
      </div>

      <div className="flex w-[400px] mx-auto items-center justify-center mt-5">
      <input className='flex-1 items-center outline-0 text-slate-600 font-semibold   focus:border focus:ring-2  focus:ring-blue-500 focus:border-blue-500 focus:outline-none border-2 rounded-[10px] bg-slate-100 p-3'
             name="password"
             type="password"
             placeholder=" Password"
             value={user.password}
             onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
      </div>

      <div className="flex w-[400px] mx-auto items-center justify-center mt-7">
      <button className="bg-[#41b8d6] w-full text-white p-3  shadow-cyan-500/50 shadow-2xl border-b-4 border-[#41b8d6] rounded-[20px] mt-5"
        onClick={onSignup}
        disabled={buttonDisabled || loading}>
       {loading ? (
                <div className="flex gap-9 items-center text-center justify-center">
                    Validating
                  <Loading
                    color={"white"}
                    size="md"
                    className="justify-center place-self-center"
                  />
                </div>
              ) : (
                "Register Account"
              )}
      </button>
      
      </div>

    
      </div>
       
        </div>
    </>
  );
}
