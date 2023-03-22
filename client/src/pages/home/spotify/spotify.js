import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";

const CLIENT_ID = "1f57088263ff49bebe219245a8e8c6c9"
const CLIENT_SECRET = "c26a902aef59405684bd3fd3c7a372c9"
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URI = "http://localhost:3000/"
const SCOPES = [] // Spotify account info that we want to have access to
const SCOPES_URL = SCOPES.join("%20");

function Spotify() {
    const { user } = useContext(AuthContext);
    const handleLogin = async () => {
        // redirect to Spotify authorization page
        window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_URL}&response_type=code&show_dialog=true`;

        const afterQuestion = window.location.search.substring(1);
        const [key, value] = afterQuestion.split("=");
        if (key !== "error") {
            // get access token and refresh token
            var authOptions = {
                url: 'https://accounts.spotify.com/api/token',
                form: {
                  code: value,
                  redirect_uri: REDIRECT_URI,
                  grant_type: 'authorization_code'
                },
                headers: {
                  'Authorization': 'Basic ' + (Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET, 'base64'))
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

    }
    return ( 
        <div>
            <button onClick = {handleLogin}> login to spotify </button> 
        </div> 
    )
}
export default Spotify