import React, { useState, useContext, useRef, useEffect } from "react";
import NavBar from "../navbar/index";
import { AuthContext } from "../../context/AuthContext";
import "./habittracker.css";
import "reactjs-popup/dist/index.css";
import axios, { all } from "axios";
import Dropdown from 'react-bootstrap/Dropdown';


const HabitTracker = () => {
  const { user } = useContext(AuthContext);
  const [updatedUser, setUser] = useState({ user });

  const [errorHandling, setErrorHandling] = useState("")

  //SINCE WE HAVE LABELED PRIORITIES AS 1,2,3 --> HIGHER PRIORITIES should theoretically BE FIRST ON LIST
  const allHabits = user.userHabits.sort();

  const habit = useRef();
  const priority = useRef();

  const enterHabit = async (e) => {
    e.preventDefault(); // stops page from refreshing on button click
    console.log(habit.current.value);
    for (let i = 0; i < allHabits.length; i++) {
      if (allHabits[i].substring(1) === habit.current.value) {
        document.getElementById("HabitError").innerHTML =
				"You've already entered this habit!";
			  console.log("habit already exists");
        return;
      }
    }

    if (allHabits.length >= 10) {
      setErrorHandling("You've reached the maximum number (10) of habits!")
      // document.getElementById("HabitError").innerHTML =
      // "You've reached the maximum number (10) of habits!";
      console.log("habit limit reached");
      return;
    }
    setErrorHandling("")
    const prioritizeHabit = priority.current.value + habit.current.value;
    console.log(prioritizeHabit);

    const addHabit = {
      username: user.username,
      habit: prioritizeHabit,
    };

    console.log(priority.current.value);

    await axios.post("/users/addHabit", addHabit); // call login api call, asccessing the req.body.habit in users.j

    const res = await axios.get(`/users/${user._id}`);

    console.log("res.data", res.data);
    //setUser(res.data);

    //localStorage.setItem("user", JSON.stringify(updatedUser.user))
    localStorage.setItem("user", JSON.stringify(res.data));

    window.location.reload(false);
    console.log("updated:", updatedUser);
  };

  const deleteHabit = async (e, habitD) => {
    e.preventDefault(); // stops page from refreshing on button click
    console.log("habit to be deleted:", habitD.habit);

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
    localStorage.setItem("user", JSON.stringify(res.data));

    window.location.reload(false);
    console.log("updated:", updatedUser);
  };

  const updateHabit = async (e, habitU) => {
    e.preventDefault(); // stops page from refreshing on button click
    console.log("habit to be updated:", habitU.habit);

    const updateHabit = {
      username: user.username,
      oldHabit: habitU.habit,
      newHabit: "something",
    };

    console.log("updateHabit", updateHabit);
    const test = await axios.put("/users/updateHabit", updateHabit);
    console.log("test", test);

    const res = await axios.get(`/users/${user._id}`);

    console.log("res.data", res.data);
    //setUser(res.data);

    //localStorage.setItem("user", JSON.stringify(updatedUser.user))
    localStorage.setItem("user", JSON.stringify(res.data));

    window.location.reload(false);
    console.log("updated:", updatedUser);
  };

  // const sortHabits = () => {
  //   allHabits.sort();
  //   console.log(allHabits)
  // }

  return (
    <div>
      {<NavBar></NavBar>}
      <br></br>
      <h1 className="header1"> {user.username}'s Habits!!</h1>
      <div>
        {/* <button onClick={sortHabits}>hi</button> */}

        {allHabits?.map((habit, index) => (
          <div className="listingHabit">
            {habit.substring(0, 1) === "1" && (
              <h3 style={{color:"red"}}>
                {index + 1} . {habit.substring(1)}
              </h3>
            )}
            {habit.substring(0, 1) === "2" && (
              <h3 style={{color:"#D29E1E"}}>
                {index + 1} . {habit.substring(1)}
              </h3>
            )}
            {habit.substring(0, 1) === "3" && (
              <h3 style={{color:"green"}}>
                {index + 1} . {habit.substring(1)}
              </h3>
            )}
            <button
              className="deleteButton"
              onClick={(e) => deleteHabit(e, { habit })}
            >
              Delete
            </button>
            <button
              className="updateButton"
              onClick={(e) => updateHabit(e, { habit })}
            >
              Update
            </button>
          </div>
        ))}
      </div>

      <form className="inputHabit" onSubmit={enterHabit}>
        <input
          placeholder="Enter your habit here!"
          className="habitInput"
          ref={habit}
        />
        <div className="priorityLevel">
        <label for="priority">Choose a priority level: </label>

        <select name="priority" id="levels" ref={priority}>
          <option value="1">High</option>
          <option value="2">Medium</option>
          <option value="3">Low</option>
        </select>
        </div>
        {/* <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Choose your priority
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1" style={{backgroundColor:"red"}}>High</Dropdown.Item>
        <Dropdown.Item href="#/action-2" style={{backgroundColor:"yellow"}}>Medium</Dropdown.Item>
        <Dropdown.Item href="#/action-3" style={{backgroundColor:"green"}}>Low</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown> */}
        <button
          className="addHabitButton"
          type="submit"
          // disabled={allHabits.length >= 10}
          
        >
          Add your habit!
        </button>
        
        <p id="HabitError">{errorHandling}</p>

        <br></br>
        <br></br>
      </form>
      <div id="HabitError"></div>
    </div>
  );
};

export default HabitTracker;
