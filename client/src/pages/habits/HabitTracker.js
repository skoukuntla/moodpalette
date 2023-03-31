import React, { useState, useContext, useRef, useEffect } from "react";
import NavBar from "../navbar/index";
import { AuthContext } from "../../context/AuthContext";
import "./habittracker.css";
import "reactjs-popup/dist/index.css";
import axios from "axios";

const HabitTracker = () => {
  const { user } = useContext(AuthContext);
  const [updatedUser, setUser] = useState({user});

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

 

  return (
    <div>
      {<NavBar></NavBar>}
      <br></br>
      <h1 className="header1"> {user.username}'s Habits!!</h1>
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
