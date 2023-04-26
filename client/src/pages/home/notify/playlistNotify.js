import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { useContext, useEffect } from "react";
import Popup from 'reactjs-popup';
import "./notify.css"

function PlaylistNotify() {
    const {user} = useContext(AuthContext);

    const updateNotifyFlag = async () => {
        console.log("updating notify flag!")
        try {
            const currentUser = {
                username: user.username,
            };

            //update DB
            await axios.post("/users/updateNotifyFlag", currentUser)
        
            // update user object for this page
            user.monthlyNotify = false
            
            // update user object in local (browser) storage
            const newUser = JSON.parse(localStorage.getItem("user"))
            newUser["monthlyNotify"] = false
            localStorage.setItem("user", JSON.stringify(newUser))
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <Popup open={user.monthlyNotify} modal nested onClose={updateNotifyFlag}>
                {close => (
                <div className="notifyOuterContainer"> 
                    <div className="notifyInnerContainer">
                        <div className="notifyText">
                            <p>Your monthly Spotify playlist is ready!</p>
                        </div>
                    </div>
                    <br></br>
                    <div className="notifyInnerContainer">
                        <button className="notifyYesBtn" onClick={() => {close()}}>Cool!</button>
                    </div>
                </div>
                )}
            </Popup>
        </div> 
    )
}

export default PlaylistNotify