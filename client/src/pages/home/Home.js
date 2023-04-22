//HOME PAGE FRONTEND CODE
import { React, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./home.css"
import Calendar from "./calendar/calendar"
import NavBar from "../navbar/index"
import GetDailyQuote from "./quotes/dailyQuote";

import HabitChecklist from "./habitChecklist/HabitChecklist";
import SpotifyAuth from "./spotify/spotifyAuth";
import SongRecs from "./songRecs/songRecs"

import Colby from "./colby.png";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import partyprimary from '../shop/outfits/party-primary.png'
import partysecondary from '../shop/outfits/party-secondary.png'
import crownprimary from '../shop/outfits/crown-primary.png'
import crownsecondary from '../shop/outfits/crown-secondary.png'
import cowboyprimary from '../shop/outfits/cowboy-primary.png'
import cowboysecondary from '../shop/outfits/cowboy-secondary.png'
import fancyprimary from '../shop/outfits/fancy-primary.png'
import fancysecondary from '../shop/outfits/fancy-secondary.png'
import employeeprimary from '../shop/outfits/employee-primary.png'
import employeesecondary from '../shop/outfits/employee-secondary.png'
import chefprimary from '../shop/outfits/chef-primary.png'
import chefsecondary from '../shop/outfits/chef-secondary.png'
import sportsprimary from '../shop/outfits/sports-primary.png'
import sportssecondary from '../shop/outfits/sports-secondary.png'
import ninjaprimary from '../shop/outfits/ninja-primary.png'
import ninjasecondary from '../shop/outfits/ninja-secondary.png'
import popstarprimary from '../shop/outfits/popstar-primary.png'
import popstarsecondary from '../shop/outfits/popstar-secondary.png'
import discoprimary from '../shop/outfits/disco-primary.png'
import discosecondary from '../shop/outfits/disco-secondary.png'

export default function Home() {
    const { user } = useContext(AuthContext);
    console.log(user);

    const outfits = [partyprimary, partysecondary, crownprimary, crownsecondary, cowboyprimary, cowboysecondary, fancyprimary, fancysecondary, employeeprimary, employeesecondary, chefprimary, chefsecondary, sportsprimary, sportssecondary, ninjaprimary, ninjasecondary, popstarprimary, popstarsecondary, discoprimary, discosecondary]
    const mooPalImg = outfits[user.mooPalOutfit]

    return (

        <div className="homePage">
        <div className="">
            {/*{ <SpotifyAuth></SpotifyAuth> }*/} {/*TODO: figure out a better way to do this*/}
            {<NavBar></NavBar>}   
            <br></br>
            <br></br>
            <div className="sprint">
            { <Calendar></Calendar> }
            </div>
          
            { <GetDailyQuote></GetDailyQuote> }
            <div className="sprint">
            {<HabitChecklist></HabitChecklist> }
            </div>
            <div className="sprint">
            <img src={mooPalImg} alt="MooPal" width="200"/>
            </div>
            { <SongRecs></SongRecs> }
         </div>


        
        
        </div> 
    )
}