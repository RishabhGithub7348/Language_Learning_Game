"use client"
import { AiOutlineCamera } from "react-icons/ai";
import CircularProgress from "@/components/CircularProgress";
import ProgressBar from "@/components/ProgressBar";
import { GoX } from "react-icons/go";
import { useState , useEffect} from "react";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-hot-toast";


export default function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('french');
  
  const [score, setScore] = useState<any>([]);

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
      try {
        // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint where you want to fetch leaderboard data.
        const response = await axios.get(`/api/users/userdetail/${language}`);
        console.log('Fetched leaderboard data:', response.data);
        setScore(response.data.data[0]);
       
      
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        throw error;
      }
    };
    fetchLeaderboardData(selectedLanguage);
  }, [setSelectedLanguage]);
  console.log(score);

    return (
    <div className="flex flex-col  p-2 w-[1100px] ml-[20px]   min-h-screen  mt-2 ">
      <div className="flex gap-2 items-center justify-end mt-9 mr-9">
      <div className=" flex z-10 relative">
        <button className="bg-blue-500 flex gap-2 items-center text-white px-4 py-2 rounded" onClick={openModal}>
          Select Language
          <span>
            <Image className="text-white" src="/images/Arrow-Down.svg" width={30} height={30} alt="" />
          </span>
        </button>
        {isModalOpen && (
        <div className="absolute  bg-slate-100 flex flex-col p-2 border-2 w-[160px]  rounded  top-[46px] left-10 text-center ">
          <div className="">
            <h2>Select Language</h2>
            <div className="w-full h-1 border-b"></div>
            <ul>
              {languages.map((language, index) => (
               <div className="flex   flex-col">
                 <li className="m-[2px] text-slate-500" key={index}>
                  <button onClick={() => handleLanguageSelect(language)}>{languageMapping[language]}</button>
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
       <div className="flex items-center justify-between p-4   ">
         
         <div className="flex flex-col items-center  gap-3 p-3  bg-gray-100 mt-8 border rounded-md w-[300px]">
         <div className="flex items-center bg-gray-100   p-2  ">
         <div className=" relative ">
         <Image src="/images/noprofile.png" alt="" width={20} height={20} className="rounded-full border-2  bg-slate-700  w-[150px] h-[150px]" />
          <AiOutlineCamera  className="text-base ml-2 flex items-center justify-center absolute cursor-pointer z-10 w-[40px] p-1  h-[40px] bg-blue-500 top-[120px] rounded-full text-slate-800 left-[95px]" />
         </div>
         </div>
          <div className="flex items-center justify-items-center">
            <p className="font-bold text-lg "> Rishabh Maurya</p>
          </div>
          <div>
             <div className="text-base">
             <p className="text-base font-base"> rishabhmaurya7654@gmail.com</p>
             </div>
          </div>
          <div className="flex items-center justify-items-center">
           <p className="fond-medium text-base "> Language - French</p>
          </div>

          <div className="flex items-center justify-center border shadow-md rounded-lg bg-green-400 p-3 w-[200px]">
          <button className="text-base font-bold text-slate-800">Edit Profile Pic</button>
         </div>
         </div>

        <div className="flex flex-col">
        <div className="flex items-center justify-around border-[2px] outline-none shadow-2xl w-[700px] h-[355px]  shadow-green-500/50 hover:shadow-green-700/50 border-green-400   rounded-[10px]  p-3 mt-8 ">
          <div className="flex flex-col gap-7 items-center">
          <CircularProgress value={score?.scores?.[selectedLanguage]?.easy || 0} color="blue" />
          <div className="flex items-center justify-center">
              <p className="font-bold text-gray-600 text-lg">Level-1</p>
            </div>
        
          </div>
          <div className="flex flex-col gap-7 items-center">
          <CircularProgress value={score?.scores?.[selectedLanguage]?.medium || 0 } color="green" />
          <div className="flex items-center justify-center">
              <p className="font-bold text-gray-600 text-lg">Level-2</p>
            </div>
        
          </div>
          <div className="flex flex-col gap-7 items-center">
          <CircularProgress value={score?.scores?.[selectedLanguage]?.hard || 0} color="orange" />
          <div className="flex items-center justify-center">
              <p className="font-bold text-gray-600 text-lg">Level-3</p>
            </div>
        
          </div>
          
        </div>
        

       </div>
       
       </div>

       
    </div>

  )

}