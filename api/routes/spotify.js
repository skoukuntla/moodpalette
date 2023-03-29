const router = require("express").Router();
const SpotifyWebApi = require("spotify-web-api-node");

router.post("/fetchAccessToken", async (req, res) => {
    try {
        // Create the api object with the credentials
        var spotifyApi = new SpotifyWebApi({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET
        });
        spotifyApi.clientCredentialsGrant().then(
            function (data) {
                console.log('The access token expires in ' + data.body['expires_in']);
                console.log('The access token is ' + data.body['access_token']);
            
                // Save the access token so that it's used in future calls
                return res.status(200).json(data.body['access_token']);
            },
            function (err) {
                console.log('Something went wrong when retrieving an access token', err);
                return res.status(500).json(err);
            }
        );
    }
    catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router