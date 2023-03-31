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

    console.log("deleteHabit1", deleteHabit)
    const test = await axios.post("/users/deleteHabit", deleteHabit);
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
      <div className="allHabitsListing">
      {allHabits.map((habit) => (
              <div className="listingHabit">
                <h3>{habit}</h3>
                <button className="deleteButton" onClick={(e) => deleteHabit(e, {habit})}>Delete</button>
                <button className="updateButton">Update</button>
              </div>
      ))}
      </div>

      <form className="inputHabit" onSubmit={enterHabit}>
        <input
          placeholder="Enter your habit here!"
          className="habitInput"
          ref={habit}
        />

        <button className="addHabitButton" type="submit">
          Add your habit!
        </button>
      </form>
    </div>
  );
};

export default HabitTracker;
