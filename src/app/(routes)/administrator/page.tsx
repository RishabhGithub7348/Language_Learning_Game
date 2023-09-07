"use client"
import { useState, useContext } from 'react';
import { PostContext } from '@/context/PostContext';
import axios from 'axios';


export default function Home() {
  const [formData, setFormData] = useState({
    language: 'french',
    level: 'easy',
    question: '',
    options: [
      { text: '', correct: false }, // Option 0
      { text: '', correct: false }, // Option 1
      { text: '', correct: false }, // Option 2
      { text: '', correct: false }, // Option 3
    ],
    correctAnswer: 0, // Index of the correct option
  });

  

  
  const handleChange = (e:any, index:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      options: prevData.options.map((option, i) => ({
        ...option,
        text: i === index ? value : option.text,
      })),
    }));
  };

  const handleCorrectAnswerChange = (e:any) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      correctAnswer: parseInt(value, 10), // Parse the value to an integer
      options: prevData.options.map((option, index) => ({
        ...option,
        correct: index === parseInt(value, 10), // Set correct based on the selected index
      })),
    }));
  };

  const questionhandleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  
  
  const handleSubmit = async (e:any) => {
    e.preventDefault();
  
    try {
      const dataToSend = {
        ...formData
      };
      console.log("dataToSend", dataToSend);
      
      const response = await axios.post('/api/question', dataToSend);
      console.log("response", response.data);
  
      if (response.status === 200) {
        console.log('Question submitted successfully');
        // Clear the form or show a success message
      } else {
        console.error('Question submission failed');
        // Handle error
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center w-[1100px]  ">
      <div className="bg-white shadow-md shadow-green-300 rounded-md w-[900px] border-b border-l border-r  py-4 px-9 ">
        <h1 className="text-xl font-semibold mb-2">Submit a Question</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col ">
            <label className="block  text-base  font-bold text-gray-700">Language:</label>
            <select
              name="language"
              value={formData.language}
              onChange={questionhandleChange}
              className="mt-1 block w-full p-2 border-gray-300 border rounded-md shadow-md focus:ring-indigo-500 focus:border-indigo-500 lg:text-base sm:text-sm"
            >
              <option value="french">French</option>
              <option value="spanish">Spanish</option>
            </select>
          </div>
          <div className="mb-4 flex flex-col ">
            <label className="block text-base  font-bold text-gray-700">Level:</label>
            <select
              name="level"
              value={formData.level}
              onChange={questionhandleChange}
              className="mt-1 block w-full p-2 lg:text-base border-gray-300 rounded-md shadow-md border focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="mb-4 flex flex-col ">
            <label className="block text-base font-bold text-gray-700">Question:</label>
            <textarea
              rows={1}
              placeholder="Enter your question here"
              id="question"
              aria-label="Question"
              aria-describedby="question"
              required
              autoFocus
              autoComplete="off"
              
              name="question"
              value={formData.question}
              onChange={questionhandleChange}
              className="mt-1 block w-full border-gray-300 border rounded-md shadow-md lg:text-base p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4 flex flex-col gap-1 ">
            <label className="block text-lg font-bold text-gray-700">Options:</label>
            {formData.options.map((option, index) => (
             <input
             type="text"
             name={`options[${index}]`}
             key={index}
             value={option.text}
             onChange={(e) => handleChange(e, index)} // Pass the index here
             className="mt-1 p-2 border lg:text-base block w-full border-gray-300 rounded-md shadow-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
           />
           
            ))}
          </div>
          <div className="mb-4 flex flex-col">
            <label className="block text-base font-bold text-gray-700">Correct Answer:</label>
            <select
              name="correctAnswer"
              value={formData.correctAnswer}
              onChange={handleCorrectAnswerChange}
              className="mt-1 p-2 lg:text-base block w-full border-gray-300 rounded-md shadow-md border focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {formData.options.map((_, index) => (
                <option key={index} value={index}>
                  Option {index + 1}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white text-base font-semibold rounded-md py-2 px-4 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
