//HOME PAGE FRONTEND CODE
import { React, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./home.css"
import Calendar from "./calendar/calendar"
import NavBar from "../navbar/index"
import GetDailyQuote from "./quotes/dailyQuote";
<<<<<<< HEAD
import SpotifyAuth from "./spotify/spotifyAuth";
import SongRecs from "./songRecs/songRecs"

=======
import Colby from "./colby.png";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
>>>>>>> userInputsBackend1
export default function Home() {

    
    const { user } = useContext(AuthContext);
    console.log(user);
    return (
<<<<<<< HEAD
        <div>
            {/*{ <SpotifyAuth></SpotifyAuth> }*/} {/*TODO: figure out a better way to do this*/}
            { <NavBar></NavBar> }
=======
        <div> 
            {<NavBar></NavBar>}   
>>>>>>> userInputsBackend1
            { <Calendar></Calendar> }
            <img src={Colby} alt="cow or something" width="200"/>
            { <GetDailyQuote></GetDailyQuote> }
            { <SongRecs></SongRecs> }
         </div>
    )
}