const CLIENT_ID = "b14d518d348545139a83571ffbe78a48"
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/home"


function Spotify() {
    const handleLogin = () => {
        window.location = `SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}`
    }
    return(
        <div> hi </div>
        <button onClick={handleLogin}> login to spotify</button>
    )
}
export default Spotify