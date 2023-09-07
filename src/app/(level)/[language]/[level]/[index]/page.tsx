"use client"
import  languages  from "@/question/data.json";
import Link from "next/link";
import { useState, useContext } from "react";
import  { useRouter } from "next/navigation";
import { PostContext } from "@/context/PostContext";
import ProgressBar from "@/components/ProgressBar";
import { GoX } from "react-icons/go";
import axios from "axios";
import Circular from "@/components/Circular";
import Image from "next/image";

interface LevelProps {
    params: {
      language: string;
      level: string;
      index: string;
    };
  }

 
  
  const Question: React.FC<LevelProps> = ({ params }) => {
    const {questionIndex, setQuestionIndex ,incorrectAnswersCount, setIncorrectAnswersCount, correctAnswersCount, setCorrectAnswersCount  } = useContext<any>(PostContext);
    const [showFotter, setShowFotter] = useState<boolean>(false);
    const [selectedAnswer, setSelectedAnswer] = useState("")
    const [showDialog, setShowDialog] = useState(false);
    
    
    const [marks, setMarks] = useState(0);
    const [category, setCategory] = useState("");
    
    
    const router = useRouter();
    console.log(params);

    const {language, level, index} = params;
     console.log("Language:", language);
     console.log("Level:", level);
     console.log("Index:", index);

     const handleGoXClick = () => {
      setShowDialog(true);
      console.log("showDialog:", showDialog);
    
    };
  
    const handleStay = () => {
      // Handle staying on the current page, e.g., close the dialog.
        setShowDialog(false);        
    };


  
    const handleQuit = () => {
      // Handle quitting, e.g., redirect to another page or perform an action.
      // You can use router.push("/your-quit-page") from Next.js if needed.
      router.push("/dashboard");
    
    };


    
    
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

  const question= selectedQuestions[questionIndex];

  
  const options = selectedQuestions[questionIndex].options;

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
      setShowFotter(false);
        // setQuestionNumber(questionNumber + 1);
      router.push(`/${language}/${level}/${questionIndex + 1}`); // Redirect to the next question
    } else {
      // No more questions, you can handle this as needed
      router.push(`/dashboard`); // Redirect to an "end" page or handle it in some way
    }
  };

  const handleAnswerClick = (selectedAnswer: string) => {
    
    setSelectedAnswer(selectedAnswer);
    console.log(selectedAnswer);
   
  };
  const isCorrect = question.options.some(
    (option:any) => option.text === selectedAnswer && option.correct
  );

  // Find the correct answer by searching for the option with correct: true
  const correctAnswer = options.find((option: any) => option.correct);

  const correctOptionText = correctAnswer ? correctAnswer.text : "Correct answer not found";
  

  const handleAnswer = async (selectedAnswer: string) => {
    
    setShowFotter(true);
    const currentQuestion = selectedQuestions[questionIndex];

    const isCorrect = currentQuestion.options.some(
      (option:any) => option.text === selectedAnswer && option.correct
    );

    try{
      
      if (isCorrect) {
        
        let score = 0;
        if (question.difficulty === "easy") {
          setCategory("easy");
          setMarks(2);
      score = 2;
         } else if (question.difficulty === "medium") {
            setCategory("medium");
            setMarks(3);
      score = 3;
      } else if (question.difficulty === "hard") {
        setCategory("hard");
        setMarks(5);
       score = 5;
      }
      setCorrectAnswersCount((count:any) => count + 1);
        const response = await axios.put(`/api/users/score/${language}/${level}`, {
          score: score,
        });
        
        console.log("response", response.data);
        console.log(`Selected answer "${selectedAnswer}" is correct!`);
        
      } else {
        // Handle incorrect answer
        setIncorrectAnswersCount((count:any) => count + 1);
        const response = await axios.put(`/api/users/score/${language}/${level}`, {
          score :0,
        });
        console.log("response", response.data);
      
        console.log(`Selected answer "${selectedAnswer}" is incorrect.`);
        
      }

    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    
        <>
        {showDialog && (
        <div className="fixed flex flex-col justify-center bottom-0 left-0 right-0 z-30 h-[160px]  bg-white border-t border-slate-200 p-4 dialog-slide-up">
         <div className="flex items-center justify-around ">
         <div className="flex flex-col items-center gap-1">
         <p className="text-2xl font-bold text-slate-800">Are you sure you want to quit?</p>
         <p className="text-slate-500 font-medium  text-base">All progress in this session will be lost.</p>
         </div>
          <div className="flex gap-4 mt-4">
            <button
              className="border-b-[4px] border-2 text-xl font-semibold text-slate-600 border-gray-400 rounded-[15px] shadow-2xl shadow-slate-300 w-[160px]  p-2"
              onClick={handleStay}
            >
              STAY
            </button>
            <button
               className="border-b-[4px] text-white text-xl font-semibold border-2 bg-blue-300 border-blue-400 rounded-[15px] shadow-2xl shadow-slate-300 w-[160px]  p-2"
              onClick={handleQuit}
            >
              QUIT
            </button>
          </div>
         </div>
        </div>
      )}
        <div className={`flex flex-col p-3 ${showDialog ? "opacity-20 shadow-lg shadow-[#202020]   bg-slate-200" : ""} w-screen min-h-screen`}>
           <div className="grid grid-cols-12  items-center  ml-[250px]  p-9 ">
           <div className="col-span-1 ">
            <button onClick={handleGoXClick}>
            <GoX className="cursor-pointer  text-3xl text-slate-800"  />
            </button>
        
      </div>
             {/* Dialog/Modal */}
      
            <div className="col-span-6">
            <ProgressBar value = {questionIndex}/>
            </div>

            <div className="col-span-1 ml-11">
              <Image src="/images/love.svg" width={30} height={30} alt="" />
            </div>
           
            <div className="gap-4 flex">
            <div className="col-span-1">
              <Circular  value={correctAnswersCount} color="green" />
           </div>
           
           
           <div className="col-span-1">
             <Circular  value={incorrectAnswersCount} color="red"  />
           </div>
            </div>


           </div>
          

           <div className=" mt-2 max-w-[1150px] w-[1150px] mx-auto ">
             <div className="flex items-center mx-[170px] gap-3 p-2">
             <Image src="/images/star.svg" alt="" width={40} height={40}  />
              <p className="text-2xl font-bold text-indigo-500">New World</p>
             </div>
             <div className="flex items-center mx-[170px] mt-4">
              <p className="text-3xl font-bold  text-gray-700">{question?.question}</p>
             </div>
             <div className="grid grid-cols-10 gap-9 mx-[170px]  mt-10 ">
             {options.map((option: any, optionIndex: number) => (
            <div  className="col-span-5" key={optionIndex}>

                <button 
                  className={`flex border-2 w-[350px] items-center justify-center text-xl text-center font-medium text-gray-500  cursor-pointer h-[100px] hover:bg-slate-100 ${selectedAnswer  === option.text ? "bg-slate-200" : ""} rounded-md p-4 items-center`}
                  onClick={() => handleAnswerClick(option.text)}
                >
                   {option.text}
                </button>
              
            </div>
          ))}
             </div>


           </div> 

           <footer className={`fixed  flex-col  ${showFotter ? "hidden" : "flex"}  justify-center bottom-0 left-0 w-full h-[140px] border-t-2    text-white p-4 `}>
               <div className="flex items-center justify-around">
                 <div className="">
                 <button onClick={handleNextQuestion} className="border-4 shadow-lg outline-none rounded-[20px] border-[#98aabb82] p-4 bg-gray-300 text-gray-900 w-[170px] text-center z-10 text-xl font-semibold">SKIP</button>
                 </div>
                 <div className="">
                 <button onClick={() => handleAnswer(selectedAnswer)} className={`border-4 border-[#d9d6bb82] shadow-lg outline-none rounded-[20px] p-4  ${
          selectedAnswer ? "bg-green-500" : "bg-slate-700/70"
        }  text-gray-100 w-[170px] text-center z-10 text-xl font-semibold`}>CHECK</button>
                 </div>
               </div>
          </footer>


          {isCorrect && showFotter && (
        // Correct Footer
        <footer className="fixed flex flex-col justify-center bottom-0 left-0 w-full h-[140px] border-t-2   bg-emerald-200    text-white p-4 ">
          <div className="flex items-center justify-around">
            <div className="flex items-center gap-5">
              <div className="border rounded-[50%] w-[80px] h-[80px] text-center flex items-center justify-center  bg-white z-10 ">
                <button>
                  <Image src="/images/correct.svg" alt="" width={40} height={40} />
                </button>
              </div>
              <div className="flex items-center flex-col gap-2">
                <p className="text-2xl font-bold text-green-700">Correct Answer</p>
                <p className="text-xl leading-6 font-semibold text-green-400">{correctOptionText}</p>
                <p className="text-xl leading-6 font-semibold text-green-400">+ {marks} Awarded</p>
                <p className="text-xl leading-6 font-semibold text-green-400"> {category.toUpperCase()} Category</p>
              </div>
            </div>
            <div className="">
              <button onClick={handleNextQuestion} className="border-4 border-[#d9d6bb82] shadow-lg outline-none rounded-[20px] p-3  bg-green-600 text-gray-100 w-[170px] text-center z-10 text-xl font-semibold">CONTINUE</button>
            </div>
          </div>
        </footer>
      ) 
          }
          {!isCorrect && showFotter && 
      (
        // Wrong Footer
        <footer className="fixed flex flex-col justify-center bottom-0 left-0 w-full h-[140px] border-t-2   bg-red-200    text-white p-4 ">
          <div className="flex items-center justify-around">
            <div className="flex items-center gap-5">
              <div className="border rounded-[50%] w-[80px] h-[80px] text-center flex items-center justify-center  bg-white z-10 ">
                <button>
                  <Image src="/images/wrong.svg" width={40} height={40} alt="" />
                </button>
              </div>
              <div className="flex items-center flex-col gap-2">
                <p className="text-2xl font-bold text-red-700">Wrong Answer</p>
                <p className="text-xl leading-6 font-semibold text-red-400">{correctOptionText}</p>
              </div>
            </div>
            <div className="">
              <button onClick={handleNextQuestion} className="border-4 border-[#d9d6bb82] shadow-lg outline-none rounded-[20px] p-3  bg-red-600 text-gray-100 w-[170px] text-center z-10 text-xl font-semibold">CONTINUE</button>
            </div>
          </div>
        </footer>
      )
      }
      </div>
        </>
      );
    };

export default Question;
