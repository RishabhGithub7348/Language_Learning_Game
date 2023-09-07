"use client"
import { use, useState } from "react";
import { GoX } from "react-icons/go";
import { PostContext } from "@/context/PostContext";
import { useContext, useEffect } from "react";
import axios from "axios";
import  Image  from "next/image";

export default function Leaderboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {isAuth, setIsAuth} = useContext<any>(PostContext);
  
  const {  leaderboard, setLeaderboard} = useContext<any>(PostContext);
  const [selectedLanguage, setSelectedLanguage] = useState('russia'); // Default language is English

  const languages = ['italian', 'spanish', 'french', 'german', 'russia', "italian", "dutch"];
 // Add your language options here

 interface LanguageMapping {
  [key: string]: string;
}

const languageMapping: LanguageMapping = {
  
  spanish: 'Spanish',
  french: 'French',
  german: 'German',
  russia: 'Russia',
  italian: "Italian",
  dutch: "Dutch"

};

  

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLanguageSelect = (language:any) => {
    setSelectedLanguage(language);
    closeModal();
  };
  

  useEffect(() => {
    const fetchLeaderboardData = async (language:any) => {
      if(isAuth){

      }
      try {
        // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint where you want to fetch leaderboard data.
        const response = await axios.get(`/api/users/usersdetail/${language}`);
        setLeaderboard(response.data.data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }

    };
    fetchLeaderboardData(selectedLanguage);
  }, [selectedLanguage]);

  return (
    <div className=" flex flex-col p-4 m-3  w-[1100px] min-h-screen">
      <div className="flex mt-4 items-center justify-between">
        <div>
          <p className="text-3xl font-bold text-center">Leaderboard</p>
        </div>
        <div className=" flex z-10 relative">
        <button className="bg-blue-500 flex gap-2 items-center text-white px-4 py-2 rounded" onClick={openModal}>
          Select Language
          <span>
            <Image className="text-white" src="/images/Arrow-Down.svg" width={30} height={30
            } alt="" />
          </span>
        </button>
        {isModalOpen && (
        <div className="absolute bg-slate-100  flex flex-col p-2 border-2 w-[160px]  rounded  top-[46px] left-10 text-center ">
          <div className="">
            <h2>Select Language</h2>
            <div className="w-full h-1 border-b"></div>
            <ul>
              {languages.map((language, index) => (
               <div className="flex   flex-col">
                 <li className="m-[2px] text-slate-500" key={index}>
                
                  <button onClick={() => handleLanguageSelect(language)}>
                  
                     {languageMapping[language]}
                     </button>
                </li>
                <div className="w-full h-1 border-t"></div>
               </div>
                
              ))}
            </ul>
            <button className="m-[2px] text-slate-700" onClick={closeModal}>
              <GoX />
            </button>
          </div>
        </div>
      )}
        </div>
      </div>


      <div className="flex flex-col    border-2 rounded-[13px] mt-11 p-5  w-full">
      <div className='pb-20'>
  <div className='flex items-center justify-between gap-2 mt-6 ml-10 mr-10'>
    <div className='  w-[180px] text-center'>
      <p className='text-slate-600 font-semibold text-base' >Name</p>
    </div>
    <div className='  w-[150px]  text-center'>
      <p className='text-slate-600 font-semibold text-base'>Language</p>
    </div>
    <div className='  w-[150px] text-center'>
      <p className='text-slate-600 font-semibold text-base'>Level-1</p>
    </div>
    <div className='  w-[150px] text-center '>
      <p className='text-slate-600 font-semibold text-base'>Level-2</p>
    </div>
    <div className='  w-[150px]  text-center'>
      <p className='text-slate-600 font-semibold text-base'>Level-3</p>
    </div>
    <div className='  w-[150px]  text-center'>
      <p className='text-slate-600 font-semibold text-base'>Rank</p>
    </div>
   
  </div>

  <div className="w-full h-1 border-b-2 m-4"></div>
 
  {leaderboard && leaderboard.map((user: any, index: any) => (
  <div
    className={` items-center mt-5 bg-green-200 hover:bg-green-300 rounded-2xl ${selectedLanguage ? 'flex' : 'hidden'} border-2 p-3 justify-between gap-2 ml-10 mr-10`}
    key={index}
  >
    <div className='w-[180px] flex items-center gap-3 justify-center'>
      <p className='text-base'>{user.username}</p>
    </div>
    <div className='w-[150px] text-center'>
      <p className='text-base'>{selectedLanguage.toUpperCase()}</p>
    </div>
    <div className='w-[150px] text-center'>
    <p className='text-base'>{user.scores[selectedLanguage]?.easy}</p>
    </div>
    <div className='w-[150px] text-center'>
    <p className='text-base'>{user.scores[selectedLanguage]?.medium}</p>
    </div>
    <div className='w-[150px] text-center'>
    <p className='text-base'>{user.scores[selectedLanguage]?.hard}</p>
    </div>
    <div className='w-[150px] text-center'>
      <p className='text-base'>{index + 1}</p>
    </div>
  </div>
))}

        
</div>
      </div>

      
    </div>
  );
}