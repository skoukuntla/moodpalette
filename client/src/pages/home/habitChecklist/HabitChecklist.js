import React from 'react'
import { useContext } from "react";
import { AuthContext } from '../../../context/AuthContext';
import './habitChecklist.css';
import axios from "axios";
import { useState, useEffect } from 'react';

const HabitChecklist = () => {

const {user} = useContext(AuthContext)
const habits = user.userHabits // all of a user's habits

const userInputedHabits = []

const [dbCompletedHabits, setCompHabits] = useState([])
useEffect(()=>{
    const fetchAllCompHabits = async ()=>{ // async function since making api request
        try{
            const res = await axios.get(`day/getCompletedHabits/${user.username}`) // have to specify date
            setCompHabits(res.data[0].completedHabits);
            console.log(res)
        }catch(err){
            console.log(err)
        }
    }

    fetchAllCompHabits()
},[user.username])

console.log(dbCompletedHabits)

//console.log("completed habits", dbCompletedHabits[0].completedHabits.length)

const checklistSubmit = async (e) => {
    e.preventDefault();
    let completedHabits = [];
    var index = 0;
    let checkboxes = document.querySelectorAll("input[type='checkbox']");
    for (let i = 0 ; i < checkboxes.length; i++) {
        if(checkboxes[i].checked){
            completedHabits[index] = habits[i];
            index++;
        }
    }


    const habitsLog = {
        username: user.username,
        completedHabits: completedHabits
      };

      await axios.post("/day/addCompletedHabits", habitsLog);
    
  };



  return (
  
<>

{ dbCompletedHabits.length === 0 && (
              <div>
              <br></br>
              <br></br>
              <br></br>
            <h1>My Habits</h1>
            <br></br>
            <form>
           
           <div classname='habits'>
            {habits.map((habit) => (
                <div className='habit'>
                     <h3>{habit}</h3> 
                     <input type="checkbox"/>
                </div>
               
              ))}
    
    </div>
    
    <button className="loginButton" type="submit"  onClick={checklistSubmit}>
                  Submit
                </button>
    
    
    </form>
    </div>
    )}


{ dbCompletedHabits.length > 0 && (
              <div>
              <br></br>
              <br></br>
              <br></br>
            <h1>My Habits</h1>
            <br></br>
        
           
           <div classname='habits'>
            {dbCompletedHabits.map((habit) => (
                <div className='habit'>
                     <h3>{habit}</h3> 
                </div>
               
              ))}
    
    </div>
    <br></br>
    <br></br>
    <br></br>

{/* This div important for formatting? */}

    </div> 
    )}






</>


  )
}

export default HabitChecklist