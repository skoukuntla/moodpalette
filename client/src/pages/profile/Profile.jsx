import { Button } from "@mui/material";
import "./profile.css";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import NavBar from "../navbar/index";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useRef } from "react";

export default function Profile() {
  const { user } = useContext(AuthContext);

  const username = useRef();
  const email = useRef();
  const age = useRef();

  const handleEdit = async (e) => {
    e.preventDefault();
    const userInput = {
      username: username.current.value,
      email: email.current.value,
      age: age.current.value,
    };
    console.log("user data", userInput);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    console.log("clicked delete");
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

  let deleteFinal = (
    <button
      variant="contained"
      className="greenBtnFinal"
      onClick={handleDelete}
    >
      {" "}
      Delete Profile
    </button>
  );

  return (
    <>
      {<NavBar></NavBar>}
        <div className="entireProfile">
          <img
            className="profileUserImg"
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
                          Close modal
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
                        className="blueBtnCancel"
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
    </>
  );
}
