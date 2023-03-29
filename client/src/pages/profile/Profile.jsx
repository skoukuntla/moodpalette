import "./profile.css";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import NavBar from "../navbar/index";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SpotifyWebApi from 'spotify-web-api-js';

import emailjs from 'emailjs-com';

import SpotifyImg from "./spotify_logo.png";
import qs from 'qs';

const CLIENT_ID = "1f57088263ff49bebe219245a8e8c6c9"
const CLIENT_SECRET = "c26a902aef59405684bd3fd3c7a372c9"
const spotifyApi = new SpotifyWebApi();

const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize"; //TODO: put this in separate file
const REDIRECT_URI = "http://localhost:3000/profile/"
const SCOPES = ["user-read-email user-read-playback-state"] // Spotify account info that we want to have access to
const SCOPES_URL = SCOPES.join("%20");

const notify = () => {
  toast("Make sure to fill out your Mood Palette for the day!");
}

export default function Profile() {

  const [currRec, setCurrRec] = useState("");
  const [spotifyName, setSpotifyName] = useState(null);
  const [spotifyEmail, setSpotifyEmail] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    function getUserInfo() {
      console.log(isLoggingIn)
      while (isLoggingIn) { //wait for async fetchTokens() function to return
        // do nothing
      }
      if (!user.spotifyAccessToken) {
        // user opted out of logging into Spotify account - do nothing
        console.log("No Spotify account has been linked")
      }
      else {
        spotifyApi.setAccessToken(user.spotifyAccessToken);
        console.log(user.spotifyAccessToken);
    
        var hasExpired = false;
        spotifyApi.getMe().then((response) => {
          setSpotifyName(response.display_name)
          setSpotifyEmail(response.email)
        })
        .catch((error) => {
          if (error.status === 401) // access token has expired
            console.log("Access token has expired")
            user.spotifyAccessToken = null;
            fetchNewSpotifyToken();
            hasExpired = true;
        });;
    
        if (hasExpired) {
          // wait for fetchNewSpotifyToken() to finish
          while (user.spotifyAccessToken == null) {
            // do nothing
          }
          // try everything again
          console.log("trying again")
          spotifyApi.setAccessToken(user.spotifyAccessToken);
          spotifyApi.getMe().then((response) => {
            setSpotifyName(response.display_name)
            setSpotifyEmail(response.email)
          })
          .catch((error) => {
            console.log(error);
          });
        }
      } 
    }

    async function fetchTokens() { // TODO: put this in separate file
      var success = false;
      if (window.location.search) {
        const afterQuestion = window.location.search.toString().substring(1);
        const [key, value] = afterQuestion.split("=");
        
        if (key !== "error") {
            // POST request for access token and refresh token
            const res = await axios.post('https://accounts.spotify.com/api/token', 
                qs.stringify (
                ({
                    grant_type: "authorization_code",
                    code: value,
                    redirect_uri: REDIRECT_URI,
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET
                }),
                {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    json: true
                }
            ))
            .then((res) => {
                // store Spotify credentials in user object
                try {
                    success = true;

                    //update DB
                    axios.put("/users/" + user._id, {
                        spotifyAccessToken: res.data.access_token,
                        spotifyRefreshToken: res.data.refresh_token
                    });

                    // update user object for this page
                    user.spotifyAccessToken = res.data.access_token;
                    user.spotifyRefreshToken = res.data.refresh_token;
                    
                    // update user object in local (browser) storage
                    const newUser = JSON.parse(localStorage.getItem("user"));
                    newUser["spotifyAccessToken"] = res.data.access_token;
                    newUser["spotifyRefreshToken"] = res.data.refresh_token;
                    localStorage.setItem("user", JSON.stringify(newUser));
                    setIsLoggingIn(false)
                } catch (error) {
                    console.log(error);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
        else if (value === "access_denied") {
            // user denied Spotify authorization, so create popup warning
            // TODO
        }
        else {
            console.log("ERROR WITH SPOTIFY AUTH")
        }    
      }
      if (!success & isLoggingIn) {
        setIsLoggingIn(false)
      }
    }

    getUserInfo();
    fetchTokens();
  });

  const form = useRef();
    function sendEmail(e) {
        e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it
    
        emailjs.sendForm('service_t3oalh7', 'template_zh4imic', e.target, 'QDfiNV70JdveqlrKq')
          .then((result) => {
              window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
          }, (error) => {
              console.log(error.text);
          });
      }

  const { user, dispatch } = useContext(AuthContext);
  console.log(user)

  const username = useRef();
  const email = useRef();
  const age = useRef();

  const navigate = useNavigate();

  const handleEdit = async (e) => {
    e.preventDefault();
     console.log("username entered", username.current.value)
	if (username.current.value.length !== 0) {
		try {
			axios.put("/users/" + user._id, {
				username: username.current.value
			});
		} catch (err) {
			console.log("error with editing username");
		}
	}

	if (email.current.value.length !== 0) {
		try {
			axios.put("/users/" + user._id, { email: email.current.value });
		} catch (err) {
			console.log("error with editing email");
		}
	}

	if (age.current.value.length !== 0) {
		try {
			axios.put("/users/" + user._id, { age: age.current.value });
		} catch (err) {
			console.log("error with editing age");
		}
	}

	// when user updates their credentials, they must login again
	dispatch({type:"LOGOUT", payload: user})
	navigate('/login');

  };

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
        console.log("New access token: " + res.data.access_token);
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
      } catch (error) {
          console.log(error);
      }
    })
    .catch((error) => {
        console.log(error);
    });
  }

  const loginSpotify = () => {
    // redirect to Spotify authorization page
    setIsLoggingIn(true)
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_URL}&response_type=code&show_dialog=true`;
  }

  const logoutSpotify = () => {
    //update DB
      axios.put("/users/" + user._id, {
        spotifyAccessToken: "",
        spotifyRefreshToken: ""
    });

    // update user object for this page
    user.spotifyAccessToken = "";
    user.spotifyRefreshToken = "";
    
    // update user object in local (browser) storage
    const newUser = JSON.parse(localStorage.getItem("user"));
    newUser["spotifyAccessToken"] = "";
    newUser["spotifyRefreshToken"] = "";
    localStorage.setItem("user", JSON.stringify(newUser));

    setSpotifyName(null);
    setSpotifyEmail(null);
  }

  const handleDelete = async (e) => {
	e.preventDefault();
	try {
		const res = await axios.delete(`/users/${user._id}`);
		console.log(res)
		
		dispatch({type:"LOGOUT", payload: user})
		navigate("/register");
	} catch (err) {
		console.log("error with deleting");
	}
  };

  let editButton = (
    <button variant="contained" className="blueBtnEdit">
      Edit Profile
    </button>
  );
  let deleteButton = (
    <button variant="contained" className="greenBtnChoose">
      {" "}
      Delete Profile
    </button>
  );
  let logoutButton = (
    <button variant="contained" className="blueBtnEdit" onClick={logoutSpotify}>
    {" "}
    Logout
  </button> 
  );
  let loginButton = (
    <button variant="contained" className="greenBtnChoose" onClick={loginSpotify}>
    {" "}
    Log In
  </button> 
  );

  let deleteFinal = (
    <button
      variant="contained"
      className="blueBtnFinal"
      onClick={handleDelete}
    >
      {" "}
      Delete Profile
    </button>
  );

  const getRecs = () => {
    //fetchNewSpotifyToken();
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
          albumArt: response.tracks[0].album.images[0].url
        })

    });
  }

  return (
    <>
      {<NavBar></NavBar>}
        <div className="entireProfile">
          <img
            className="profileUserImg"
			alt="mooPal"
            src="https://img.freepik.com/free-vector/cute-cow-sitting-eating-grass-cartoon-vector-icon-illustration-animal-nature-icon-isolated-flat_138676-4780.jpg?w=2000"
          />
          <h4 className="profileInfoName">{user.username}</h4>
          <p className="profileInfoEmail">{user.email}</p>
          <span className="profileInfoDesc">{user.age}</span>
          <div className="spacer">
            <Popup trigger={editButton} modal nested>
              {(close) => (
                <div className="modal">
                  <div className="content">
                    <h2>Edit Profile</h2>
                    <div>
                      <form className="registerBox" onSubmit={handleEdit}>
                        <input
                          placeholder={user.username}
                          ref={username}
                          className="registerInput"
                        />
                        <input
                          placeholder={user.email}
                          ref={email}
                          c
                          type="email"
                          className="registerInput"
                        />
                        <input
                          placeholder={user.age}
                          ref={age}
                          className="registerInput"
                        />
                        <button className="registerButton" type="submit">
                          Update Info
                        </button>
                        <button
                          className="loginRegisterButton"
                          onClick={() => close()}
                        >
                          Cancel
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Popup>{" "}
            <Popup trigger={deleteButton} modal nested>
              {(close) => (
                <div className="modal">
                  <div className="content">
                    <h2>Delete Profile</h2>
                    <br />
                    <p>
                      We're sad to see you leave! Are you sure you wish to
                      delete your account?
                    </p>
                    <p>
                      {" "}
                      This is permanent and all your information will be lost!{" "}
                    </p>
                    <br />
                    <div className="spacer">
                      {deleteFinal}{" "}
                      <button
                        variant="contained"
                        className="greenBtnCancel"
                        onClick={() => close()}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Popup>
          </div>{" "}
          {/* this div has the two buttons --> leads to popups*/}
        </div>
        <div className="entireProfile"> {/* this popup is for displaying Spotify info */}
          <img
            className="profileUserImg"
			      alt="spotifyLogo"
            src={SpotifyImg}
          />
          <h4 className="profileInfoName">{spotifyName ? spotifyName : ""}</h4>
          <p className="profileInfoEmail">{spotifyEmail ? spotifyEmail : ""}</p>
          <div className="spacer">
            {spotifyName ? logoutButton : loginButton}
          </div>{" "}
        </div>
        <div className="email">
            <div classname="emailWrapper">
            <span className="loginDesc">
            Subscribe to email notifications!
          </span>
            <br/>
            <div className="emailRight">
            <form className="contact-form" onSubmit={sendEmail}>
                <input type="hidden" name="contact_number" />
                <label>Name</label>
                <input className="from_name" type="text" name="from_name" />
                <br/>
                <label>Email</label>
                <input className="from_email" type="email" name="from_email" />
                <br/>
                <label>Time</label>
                <input type="time" className="from_time" name="from_time" />
                <br/>
                <label>Subscribe</label>
                <input  type="checkbox" name="from_checkbox"/>
                <br/>
                <input className="submit" type="submit" value="Send" />
                <br/>
                <button className="notify" value="Notify!" onClick={notify}></button>
                </form>

            </div>
            <br></br>
            <div>
                Song Recs!
                <br></br>
                <button onClick={getRecs}>get song recs</button>
                <div>
                  <img src={currRec.albumArt} style={{height: 150}}/>
                  <script type="text/javascript">
                    document.write(currRec.name)
                  </script>
                </div>
            </div>
            <ToastContainer/>
            </div>
        </div>
    </>
    
  );
}
