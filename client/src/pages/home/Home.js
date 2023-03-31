//HOME PAGE FRONTEND CODE
import { React, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./home.css"
import Calendar from "./calendar/calendar"
import NavBar from "../navbar/index"
import GetDailyQuote from "./quotes/dailyQuote";
<<<<<<< HEAD
import HabitChecklist from "./habitChecklist/HabitChecklist";
=======
import SpotifyAuth from "./spotify/spotifyAuth";
import SongRecs from "./songRecs/songRecs"

>>>>>>> sprint2
export default function Home() {

    
    const { user } = useContext(AuthContext);
    console.log(user);
    return (
<<<<<<< HEAD
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
=======
        <div>
            {/*{ <SpotifyAuth></SpotifyAuth> }*/} {/*TODO: figure out a better way to do this*/}
            { <NavBar></NavBar> }
            { <Calendar></Calendar> }
            { <GetDailyQuote></GetDailyQuote> }
            { <SongRecs></SongRecs> }
         </div>
>>>>>>> sprint2
    )
}