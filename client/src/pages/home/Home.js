//HOME PAGE FRONTEND CODE
import { React, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./home.css"
import Calendar from "./calendar/calendar"
import NavBar from "../navbar/index"
import GetDailyQuote from "./quotes/dailyQuote";
import Colby from "./colby.png";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
export default function Home() {

    
    
    const { user } = useContext(AuthContext);
    console.log(user);
    return (
        <div> 
            {<NavBar></NavBar>}   
            { <Calendar></Calendar> }
            <img src={Colby} alt="cow or something" width="200"/>
            { <GetDailyQuote></GetDailyQuote> }
        </div>
    )
}