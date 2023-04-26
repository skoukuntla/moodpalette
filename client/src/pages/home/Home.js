//HOME PAGE FRONTEND CODE
import { React, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./home.css"
import Calendar from "./calendar/calendar"
import NavBar from "../navbar/index"
import GetDailyQuote from "./quotes/dailyQuote";
import PlaylistNotify from "./notify/playlistNotify"

import HabitChecklist from "./habitChecklist/HabitChecklist";
import SpotifyAuth from "./spotify/spotifyAuth";
import SongRecs from "./songRecs/songRecs"

import Colby from "./colby.png";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Home() {
    const { user } = useContext(AuthContext);
    console.log(user);

    return (

        <div className="homePage">
            {/*{ <SpotifyAuth></SpotifyAuth> }*/} {/*TODO: figure out a better way to do this*/}
            {<NavBar></NavBar>}   
            <br></br>
            <br></br>
            <div className="calendarAndChecklist">
                <div className="calendar">
                    { <Calendar></Calendar> }
                </div>
                <div className="checklist">
                    {<HabitChecklist></HabitChecklist> }
                </div>
            </div>
            { <PlaylistNotify></PlaylistNotify> }
            { <GetDailyQuote></GetDailyQuote> }
            <center>
            { <SongRecs></SongRecs> }    
            </center>
        </div> 
    )
}