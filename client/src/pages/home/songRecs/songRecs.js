import "./songRecs.css"
import "reactjs-popup/dist/index.css";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import SpotifyWebApi from 'spotify-web-api-js';
import { useContext, useState } from "react";
import { useRef } from "react";
import qs from 'qs';



const CLIENT_ID = "1f57088263ff49bebe219245a8e8c6c9"
const CLIENT_SECRET = "c26a902aef59405684bd3fd3c7a372c9"
const spotifyApi = new SpotifyWebApi();

function SongRecs() {

    const [currRec, setCurrRec] = useState("");

var counter = 0;

const { user, dispatch } = useContext(AuthContext);
console.log(user)

const username = useRef();
const email = useRef();
const age = useRef();

async function fetchNewSpotifyToken() {
  // POST request for new access token
  const res = await axios.post('https://accounts.spotify.com/api/token', 
    qs.stringify (
      ({
          grant_type: "refresh_token",
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          refresh_token: user.spotifyRefreshToken
      }),
      {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          json: true
      }
    )
  )
  .then((res) => {
    try {
      console.log(res.data.access_token);
      //update DB
      axios.put("/users/" + user._id, {
          spotifyAccessToken: res.data.access_token
      });

      // update user object for this page
      user.spotifyAccessToken = res.data.access_token;
      
      // update user object in local (browser) storage
      const newUser = JSON.parse(localStorage.getItem("user"));
      newUser["spotifyAccessToken"] = res.data.access_token;
      localStorage.setItem("user", JSON.stringify(newUser));

      //try fetching user info again
      //fetchSpotifyUser();
    } catch (error) {
        console.log(error);
    }
  })
  .catch((error) => {
      console.log(error);
  });
}


const getRecs = () => {
    fetchNewSpotifyToken();
    spotifyApi.setAccessToken(user.spotifyAccessToken);

    return spotifyApi.getRecommendations({
      limit:5,
      market:"ES",
      seed_artists:"4NHQUGzhtTLFvgF5SZesLK",
      seed_genres:"rock,pop,classical",
      seed_tracks:"0c6xIDDpzE81m2q797ordA"
    }).then((response) => {
        console.log("THIS IS MY REC:", response)
        setCurrRec({
          name: response.tracks[0].name,
          albumArt: response.tracks[0].album.images[0].url,
          artist: response.tracks[0].artists[0].name
        })

    });
  }

  const getUserInfo = () => {
    fetchNewSpotifyToken();
    spotifyApi.setAccessToken(user.spotifyAccessToken);

    return spotifyApi.getMe().then((response) => {
        console.log("THIS IS MY REC:", response)
    });
  }
  //npm install spotify-web-api-js
  //<button onClick={getUserInfo}>get user info!</button>


  return (
    
    <div className="recs">
        <div className="recsWrapper">
            <span className="recsDesc">
              <br/> 
                View your Song Reccomendation!
            </span>
                <br/>
                <br/>
                <div className="recsRight"></div>
                <button className="songButton" onClick={getRecs}>Song of the Day!</button>
                <div className="song">
                  <img src={currRec.albumArt}/>
                  <br/> <br/>
                  <span className="recsDesc">
                  Song: {currRec.name}
                  <br/> <br/>
                  Artist: {currRec.artist}
                  <br/> <br/> <br/>
                  </span>
                </div>
        </div>
    </div>
  );
  }

  export default SongRecs