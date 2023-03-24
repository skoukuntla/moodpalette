//HOME PAGE FRONTEND CODE
import { React, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./home.css"
import Calendar from "./calendar/calendar"
import NavBar from "../navbar/index"
import GetDailyQuote from "./quotes/dailyQuote";
import HabitChecklist from "./habitChecklist/HabitChecklist";
export default function Home() {

    
    
    const { user } = useContext(AuthContext);
    console.log(user);
    return (
        <div classname="homePage">

        <div classname="sprint">
            {<NavBar></NavBar>}
            { <Calendar></Calendar> }
            { <GetDailyQuote></GetDailyQuote> }
            
        </div>

        <div className = "sprint">
            {<HabitChecklist></HabitChecklist> }
        </div>
        
        </div>
    )
}