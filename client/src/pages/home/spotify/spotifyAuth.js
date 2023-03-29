import SpotifyWebApi from 'spotify-web-api-js';
import axios from "axios";

/*function fetchAccessToken() {
    // Create the api object with the credentials
    var spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET
    });
    spotifyApi.clientCredentialsGrant().then(
        function(data) {
          console.log('The access token expires in ' + data.body['expires_in']);
          console.log('The access token is ' + data.body['access_token']);
      
          // Save the access token so that it's used in future calls
          spotifyApi.setAccessToken(data.body['access_token']);
          localStorage.setItem("spotify_token", data.body['access_token']);
        },
        function(err) {
          console.log('Something went wrong when retrieving an access token', err);
        }
    );
}*/

function checkAccessToken() {
    if (localStorage.getItem("spotify_token") == null) {
        fetchNewAccessToken();
        while (localStorage.getItem("spotify_token") == null) {
            // wait for async function to return
        }
    }
    else {
        var spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(localStorage.getItem("spotify_token"));
        spotifyApi.getMe().then((response) => {
            // do nothing, everything is good
        })
        .catch((error) => {
        if (error.status === 401)
            console.log("The access token has expired");
            localStorage.setItem("spotify_token", null);
            fetchNewAccessToken();
            while (localStorage.getItem("spotify_token") == null) {
                // wait for async function to return
            }
        }); 
    }
}

async function fetchNewAccessToken() {
    const res = await axios.post("/spotify/fetchAccessToken", {});
    localStorage.setItem("spotify_token", res.data);
}

export { checkAccessToken };