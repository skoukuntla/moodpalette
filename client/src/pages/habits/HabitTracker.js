import React, { useState, useContext, useRef, useEffect } from "react";
import NavBar from "../navbar/index";
import { AuthContext } from "../../context/AuthContext";
import "./habittracker.css";
import "reactjs-popup/dist/index.css";
import axios from "axios";

const HabitTracker = () => {
  const { user } = useContext(AuthContext);
  const [updatedUser, setUser] = useState({user});
  const allHabits = user.userHabits; 
  const habit = useRef();

  const enterHabit = async (e) => {
    e.preventDefault(); // stops page from refreshing on button click
    console.log(habit.current.value);

    const addHabit = {
      username: user.username,
      habit: habit.current.value,
    };

    await axios.post("/users/addHabit", addHabit); // call login api call, asccessing the req.body.habit in users.j

    const res = await axios.get(`/users/${user._id}`);
    
    console.log("res.data", res.data)
    //setUser(res.data);

    //localStorage.setItem("user", JSON.stringify(updatedUser.user))
    localStorage.setItem("user", JSON.stringify(res.data))

    window.location.reload(false);
    console.log("updated:", updatedUser);
  };


  const deleteHabit = async (e, habitD) => {
    e.preventDefault(); // stops page from refreshing on button click
    console.log("habit to be deleted:",habitD.habit);

    const deleteHabit = {
      username: user.username,
      habit: habitD.habit,
    };

    const deleteDayHabit = {
      username: user.username,
      habit: habitD.habit,
      date: new Date().toDateString()
    }

    const test = await axios.post("/users/deleteHabit", deleteHabit);
    console.log("test",test)
    const test1 = await axios.post("/day/deleteHabit", deleteDayHabit);
    console.log("test1",test1) //deleting from days object

    const res = await axios.get(`/users/${user._id}`);

    //const res1 = await axios.get(`/day/${user._id}/${new Date().toDateString}`);
    
    console.log("res.data", res.data)
    //setUser(res.data);

    //localStorage.setItem("user", JSON.stringify(updatedUser.user))
    localStorage.setItem("user", JSON.stringify(res.data))

    window.location.reload(false);
    console.log("updated:", updatedUser);
  };
 
  const updateHabit = async (e, habitU) => {
    e.preventDefault(); // stops page from refreshing on button click
    console.log("habit to be updated:",habitU.habit);

    const updateHabit = {
      username: user.username,
      oldHabit: habitU.habit,
      newHabit: "something",
    };

    console.log("updateHabit", updateHabit)
    const test = await axios.put("/users/updateHabit", updateHabit);
    console.log("test",test)

    const res = await axios.get(`/users/${user._id}`);
    
    console.log("res.data", res.data)
    //setUser(res.data);

    //localStorage.setItem("user", JSON.stringify(updatedUser.user))
    localStorage.setItem("user", JSON.stringify(res.data))

    window.location.reload(false);
    console.log("updated:", updatedUser);
  };


  return (
    <div>
      {<NavBar></NavBar>}
      <br></br>
      <h1 className="header1"> {user.username}'s Habits!!</h1>
      <div>
      {allHabits?.map((habit, index) => (
              <div className="listingHabit">
                <h3>{index + 1} . {habit}</h3>
                <button className="deleteButton" onClick={(e) => deleteHabit(e, {habit})}>Delete</button>
                 <button className="updateButton"  onClick={(e) => updateHabit(e, {habit})}>Update</button> 
              </div>
      ))}
      </div>

      <form className="inputHabit" onSubmit={enterHabit}>
        <input
          placeholder="Enter your habit here!"
          className="habitInput"
          ref={habit}
        />

        <button className="addHabitButton" type="submit" disabled={allHabits.length >= 10}>
          Add your habit!
        </button>
        <br></br>
        <br></br>
      </form>
      <div id="passError" style={{ color: "red" }}></div>
  
    </div>
  );
};

export default HabitTracker;
