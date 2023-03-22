import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from 'buffer';

const CLIENT_ID = "1f57088263ff49bebe219245a8e8c6c9"
const CLIENT_SECRET = "c26a902aef59405684bd3fd3c7a372c9"
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URI = "http://localhost:3000/"
const SCOPES = [] // Spotify account info that we want to have access to
const SCOPES_URL = SCOPES.join("%20");

function Spotify() {
    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchTokens() {
            if (window.location.search) {
                const afterQuestion = window.location.search.toString().substring(1);
                const [key, value] = afterQuestion.split("=");

                if (key !== "error") {
                    // get access token and refresh token -- THE ERROR IS WITH THIS POST
                    var authOptions = {
                        url: 'https://accounts.spotify.com/api/token',
                        data: JSON.stringify({
                            code: value,
                            redirect_uri: REDIRECT_URI,
                            grant_type: 'authorization_code'
                        }),
                        headers: {
                        'Authorization': 'Basic ' + (Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET, 'base64')),
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                        //'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
                        },
                        json: true
                    };
        
                    try {
                        const res = await axios.post(authOptions); 
                        const jsonRes = JSON.parse(res);
        
                        // store Spotify credentials in user object
                        try {
                            axios.put("/users/" + user._id, {
                                spotifyAccessToken: jsonRes.access_token,
                                spotifyRefreshToken: jsonRes.refresh_token
                            });
                        } catch (err) {
                            console.log(err);
                        }
                    } catch(err) {
                        console.log(err);
                    }
                }
                else {
                    console.log("error with Spotify authorization")
                }

                dispatch({ type:"LOGOUT", payload: user })
                navigate('/login');
            }
        }
        fetchTokens();
    });

    const handleLogin = () => {
        // redirect to Spotify authorization page
        window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_URL}&response_type=code&show_dialog=true`;
    }
    return ( 
        <div>
            <button onClick = {handleLogin}> login to spotify </button> 
        </div> 
    )
}
export default Spotify