import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { useContext, useEffect } from "react";
import qs from 'qs';
import Popup from 'reactjs-popup';
import "./spotify.css"

const CLIENT_ID = "1f57088263ff49bebe219245a8e8c6c9"
const CLIENT_SECRET = "c26a902aef59405684bd3fd3c7a372c9"
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URI = "http://localhost:3000/"
const SCOPES = ["user-read-email"] // Spotify account info that we want to have access to
const SCOPES_URL = SCOPES.join("%20");

function SpotifyPopup() {
    const { user } = useContext(AuthContext);
    useEffect(() => {
        async function fetchTokens() {
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
            updateRegisteredStatus();
        }
        fetchTokens();
    });

    const handleLogin = () => {
        // redirect to Spotify authorization page
        window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_URL}&response_type=code&show_dialog=true`;
    }

    const updateRegisteredStatus = () => {
        try {
            // update DB
            axios.put("/users/" + user._id, {
                justRegistered: false,
            });

            // update user object for this page
            user.justRegistered = false;
            
            // update user object in local (browser) storage
            const newUser = JSON.parse(localStorage.getItem("user"));
            newUser["justRegistered"] = false;
            localStorage.setItem("user", JSON.stringify(newUser));
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            {/*<Popup open={user.justRegistered && user.spotifyAccessToken === ""} onClose={updateRegisteredStatus} modal nested>
            {close => (
            <div className="spotifyOuterContainer"> 
                <div className="spotifyInnerContainer">
                    <div className="spotifyText">
                        <p>No worries! You can log into Spotify whenever you want in the "My Profile" tab.</p>
                    </div>
                </div>
            </div>
            )}
            </Popup>

            <Popup open={user.justRegistered && user.spotifyAccessToken !== ""} onClose={updateRegisteredStatus} modal nested>
            {close => (
            <div className="spotifyOuterContainer"> 
                <div className="spotifyInnerContainer">
                    <div className="spotifyText">
                        <p>Thank you! You can log out of Spotify whenever you want in the "My Profile" tab.</p>
                    </div>
                </div>
            </div>
            )}
            </Popup>*/}

            <Popup open={user.justRegistered} modal nested onClose={updateRegisteredStatus}>
                {close => (
                <div className="spotifyOuterContainer"> 
                    <div className="spotifyInnerContainer">
                        <div className="spotifyText">
                            <p>Would you like create or log into a Spotify account?</p>
                        </div>
                    </div>
                    <div className="spotifyInnerContainer">
                        <button className="spotifyYesBtn" onClick={() => {handleLogin()}}>Yes please!</button>
                        <button className="spotifyNoBtn" onClick={() => {close()}}>Not now!</button>
                    </div>
                </div>
                )}
            </Popup>
        </div> 
    )
}
export default SpotifyPopup