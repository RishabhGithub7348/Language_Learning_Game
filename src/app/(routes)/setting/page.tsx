"use client"
import { GoX } from "react-icons/go";
import { useState, useEffect } from "react";
import CircularProgress from "@/components/CircularProgress";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";




export default function Setting() {
  
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<any>('french');

  const [score, setScore] = useState<any>([]);
  const router = useRouter();

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

  


  const handleAnswer = async (language:string, level:string) => {

    try{
        // Handle incorrect answer
        const response = await axios.put(`/api/users/reset/${language}/${level}`, {
          score :0,
        });
        toast.success("Successfully Reset");
      
        router.push("/dashboard");
        console.log("response", response.data);


    } catch (error) {
      console.log(error);
    }
  }


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
  }, [setSelectedLanguage, handleAnswer]);
    return (
        <>
        <div className="flex flex-col w-[1100px] mt-9 min-h-screen ">
        <div className="flex items-center justify-between mx-[30px]">
           <div>
            <p className="text-2xl font-bold text-slate-700">Rest Progress</p>
           </div>
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

        <div className="flex items-center  mt-16 justify-evenly">
            <div className="flex flex-col w-[270px] items-center p-6 border-2 shadow-lg rounded-md shadow-emerald-500 border-green-500">
            <CircularProgress value={score?.scores?.[selectedLanguage]?.easy || 0} color="blue" />
              <div className="flex items-center justify-center mt-3 w-[200px]">
                <button onClick={() => handleAnswer(selectedLanguage, 'easy')} className="bg-green-300 mt-3 text-gray-800 font-semibold rounded-md p-3">
                  RESET LEVEL-1
                </button>
              </div>
            </div>  

            <div className="flex flex-col w-[270px] items-center p-6 border-2 shadow-lg rounded-md shadow-emerald-500 border-green-500">
            <CircularProgress value={score?.scores?.[selectedLanguage]?.medium || 0 } color="green" />

              <div className="flex items-center justify-center mt-3 w-[200px]">
                <button onClick={() => handleAnswer(selectedLanguage, 'medium')} className="bg-green-300 mt-3 text-gray-800 font-semibold rounded-md p-3">
                  RESET LEVEL-2
                </button>
              </div>
            </div>  

            <div className="flex flex-col w-[270px] items-center p-6 border-2 shadow-lg rounded-md shadow-emerald-500 border-green-500">
            <CircularProgress value={score?.scores?.[selectedLanguage]?.hard || 0} color="orange" />

              <div className="flex items-center justify-center mt-3 w-[200px]">
                <button onClick={() => handleAnswer(selectedLanguage, 'hard')} className="bg-green-300 mt-3 text-gray-800 font-semibold rounded-md p-3">
                  RESET LEVEL-3
                </button>
              </div>
            </div>  

        </div>
        </div>
        </>
    )
}
