'use client'

import { useEffect, useState, createContext } from "react";
import axios from "axios";
import {toast} from "react-hot-toast";


export const PostContext = createContext({});


export const PostProvider = ({ children }) => {
    
    const [user, setUser] = useState({});
    const [questionIndex, setQuestionIndex] = useState(0);
    const [image, setImage] = useState(null);
    const [id, setId] = useState(null);
    const [isAuth, setIsAuth] = useState(false)
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [leaderboard, setLeaderboard] = useState([]);
    const [incorrectAnswersCount, setIncorrectAnswersCount] = useState(0);
    const [showFotter, setShowFotter] = useState(false);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);


  
      
    
    

    

      useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await axios.get("/api/users/detail");
            console.log('Fetched User:', response.data.data);
            setUser(response.data.data);
            setId(response.data.data._id);
            setIsAdmin(response.data.data.isAdmin)
          } catch (error) {
            console.error('Error fetching User:', error);
            
          } finally {
            console.log('Done fetching User');
          }
        };
    
        fetchUser();
      }, [setIsAuth, isAuth]);
      console.log(user);
      console.log(isAdmin)


      // useEffect(() => {
      //   const fetchLeaderboardData = async (language) => {
      //     try {
      //       // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint where you want to fetch leaderboard data.
      //       const response = await axios.get(`/api/users/userdetail/${language}`);
      //       console.log('Fetched leaderboard data:', response.data);
      //       setLeaderboard(response.data.data);
      //     } catch (error) {
      //       console.error('Error fetching leaderboard data:', error);
      //       throw error;
      //     }
      //   };
      //   fetchLeaderboardData(selectedLanguage);
      // }, [setUser, isAuth, setIsAuth, id, setId]);
      // console.log(leaderboard);


     

     


      

       

        useEffect(() => {
            const fetchImage = async () => {
              try {
                const response = await axios.get("/api/users/profile");
                console.log('Fetched Image:', response.data.profilePic
                );
                setImage(response.data.profilePic);
              } catch (error) {
                console.error('Error fetching Image:', error);
                
              } finally {
                console.log('Done fetching Image');
              }
            };
        
            fetchImage();
          
        
        }, [setUser,setIsAuth, id,setId])

        




    return (
        <PostContext.Provider value={{user, setUser,  image, setImage, id, isAuth, setIsAuth, questionIndex, setQuestionIndex,
        selectedAnswer, setSelectedAnswer, leaderboard, setLeaderboard, incorrectAnswersCount, setIncorrectAnswersCount, showFotter, setShowFotter,
        correctAnswersCount, setCorrectAnswersCount, isAdmin
        
        }}>
            <div>
                {children}
            </div>
        </PostContext.Provider>
    )
} 


