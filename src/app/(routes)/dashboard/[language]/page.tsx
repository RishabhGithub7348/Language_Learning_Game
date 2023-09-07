import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
import Image from "next/image";


export default function Language({ params: { language } }: { params: { language: string } }) {
  // Define language data for the supported languages
  const languageData:any = {
    spanish: {
      name: "Spanish",
      image: "/images/spanish.png",
      description: "Spanish for English speakers",
      learners: "33.6M active learners",
    },
    french: {
      name: "French",
      image: "/images/french.jpg",
      description: "French for English speakers",
      learners: "45.6M active learners",
    },
    russia: {
      name: "Russia",
      image: "/images/russia.jpg",
      description: "Russia for Spanish speakers",
      learners: "77.6M active learners",
    },
    italian: {
      name: "Italian",
      image: "/images/italy.jpg",
      description: "Italian for English speakers",
      learners: "57.6M active learners",
    },
    german :{
      name: "German",
      image: "/images/german.jpg",
      description: "German for English speakers",
      learners: "66.6M active learners",
    },
    dutch: {
      name: "Dutch",
      image: "/images/dutch.jpg",
      description: "Dutch for English speakers",
      learners: "34.9M active learners", 
    }

    // Add more languages as needed
  };

  // Get the selected language data based on the 'language' parameter
  const selectedLanguage = languageData[language];

  if (!selectedLanguage) {
    return <div>Language not found</div>; // Handle invalid language
  }

  return (
    <div className="flex flex-col p-7 m-7 w-screen min-h-screen">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-slate-600">{selectedLanguage.name}</h1>
        <GoArrowRight className="text-2xl text-slate-600" />
      </div>
      <div className="flex items-center mt-6">
        <div>
          <Image src={selectedLanguage.image} className="rounded-md" width={80} height={80} alt={selectedLanguage.name} />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xl font-bold text-slate-600">{selectedLanguage.description}</p>
          <p className="text-base text-slate-400">{selectedLanguage.learners}</p>
        </div>
      </div>
      <div className="w-full h-[1px] bg-slate-200 mt-5"></div>
      <div className="flex items-center mt-6">
        <h1 className="text-xl font-semibold text-slate-600">About Game</h1>
      </div>
      <div className="w-[900px]">
        <p className="text-base text-slate-500 font-medium mt-3">
          Welcome to our Language Learning Game - {selectedLanguage.name} edition! Improve your {selectedLanguage.name} proficiency with three levels of difficulty: Easy, Medium,
          and Hard. Questions adapt to your performance, so if you answer correctly at Easy, the next challenge will be Medium. If a Hard question stumps you, don't worry; we'll guide you back to Easy. Earn points, track progress, and enjoy a fun and effective learning experience. ¡Buena suerte! (Good luck!)
        </p>
      </div>
      <div className="flex gap-2 items-center mt-12">
        <h1 className="text-2xl font-bold text-slate-600">Select the level</h1>
        <span>
          <GoArrowRight className="text-4xl text-slate-600" />
        </span>
      </div>
      <div className="flex flex-col gap-5 mt-6">
        <Link href={`/${language.toLowerCase()}/easy`}>
          <div className="flex items-center justify-center border-[4px] outline-none shadow-2xl hover:bg-green-500 shadow-green-500/50 hover:shadow-green-700/50 border-green-400 hover:scale-105 w-[200px] rounded-[10px] bg-green-400 p-3">
            <p className="text-xl font-bold text-slate-700">Level 1</p>
          </div>
        </Link>
        <Link href={`/${language.toLowerCase()}/medium`}>
          <div className="flex items-center justify-center border-[4px] outline-none shadow-2xl hover:bg-green-500 shadow-green-500/50 hover:shadow-green-700/50 border-green-400 hover:scale-105 w-[200px] rounded-[10px] bg-green-400 p-3">
            <p className="text-xl font-bold text-slate-700">Level 2</p>
          </div>
        </Link>
        <Link href={`/${language.toLowerCase()}/hard`}>
          <div className="flex items-center justify-center border-[4px] outline-none shadow-2xl hover:bg-green-500 shadow-green-500/50 hover:shadow-green-700/50 border-green-400 hover:scale-105 w-[200px] rounded-[10px] bg-green-400 p-3">
            <p className="text-xl font-bold text-slate-700">Level 3</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
