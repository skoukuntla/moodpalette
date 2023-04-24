import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./home.css";
import Calendar from "./calendar/calendar";
import NavBar from "../navbar/index";
import GetDailyQuote from "./quotes/dailyQuote";
import HabitChecklist from "./habitChecklist/HabitChecklist";
import SpotifyAuth from "./spotify/spotifyAuth";
import SongRecs from "./songRecs/songRecs";
import Colby from "./colby.png";

export default function Home() {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <div className="homePage">
      {/* <SpotifyAuth /> */} {/* TODO: figure out a better way to do this */}
      <NavBar />
      <br />
      <br />
      <div className="calendarAndChecklist">
        <div className="sprint">
          <div className="calendar">
            <Calendar />
          </div>
          <div className="checklist">
            <HabitChecklist />
          </div>
        </div>
      </div>
      <div className = "secondRow">
      <div className="sprint">
        <div className="col">
          <GetDailyQuote />
        </div>
        <div className="col">
          <SongRecs />
        </div>
      </div>
      </div>
    </div>
  );
}
