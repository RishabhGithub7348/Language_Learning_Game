"use client"
import  languages  from "@/question/data.json";
import Link from "next/link";
import { useState, useContext } from "react";
import  { useRouter } from "next/navigation";
import { PostContext } from "@/context/PostContext";
import Image from "next/image";

interface LevelProps {
  params: {
    language: string;
    level: string;
  };
}
  
  const Level: React.FC<LevelProps> = ({ params }) => {
    // const [questionIndex, setQuestionIndex] = useState(0); // Initialize with the first question
    const {questionIndex, setQuestionIndex} = useContext<any>(PostContext);
   
    const router = useRouter();
    console.log(params);

    const {language, level} = params;
     console.log("Language:", language);
     console.log("Level:", level);
    
    
 //@ts-ignore
  const selectedLanguage = languages[language];

  if (!selectedLanguage) {
    return (
      <div>
        <h1>Language not found</h1>
      </div>
    );
  }

//   // Assuming your selectedLanguage object contains easy, medium, and hard levels
  const selectedQuestions = selectedLanguage[level];



  if (!selectedQuestions) {
    return (
      <div>
        <h1>Difficulty level not found</h1>
      </div>
    );
  }

  const handleNextQuestion = () => {
    if (questionIndex < selectedQuestions.length - 1) {
      // Check if there are more questions
      setQuestionIndex((prev:any) => prev + 1);
      
      router.push(`/${language}/${level}/${questionIndex + 1}`); // Redirect to the next question
    } else {
      // No more questions, you can handle this as needed
      router.push(`/end`); // Redirect to an "end" page or handle it in some way
    }
  };
  

  return (
      <div className="w-full min-h-screen bg-slate-100">

<div className="flex flex-col gap-8   items-center p-[250px]  ">
    <div className="flex flex-col gap-7 items-center">
    <p className="text-3xl font-bold text-slate-800">{`Begin your  ${level} level game of  ${language}`.toUpperCase()}</p>

    <p className="text-2xl font-semibold text-slate-800">LEVEL - 1</p>
    </div>
    <button className="bg-[#84e373] p-4 w-[280px] border-2 rounded-[10px] text-slate-900 text-xl font-semibold shadow-2xl shadow-[#84e373]" onClick={handleNextQuestion}>START</button>
    
  </div>
      </div>


      );
    };

export default Level;
