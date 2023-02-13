//REGISTRATION PAGE FRONTEND CODE
import React from "react";
import "./register.css"

export default function Register() {
  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Mood Palette</h3>
          <span className="registerDesc">
          Track your mood, write diary entries, customize your Moo Pal, and get a personalized song everyday!
          </span>
        </div>
        <div className="registerRight">
          <div className="registerBox">
            <input placeholder="Username" className="registerInput" />
            <input placeholder="Email" type="email" className="registerInput" />
            <input placeholder="Password" type="password" className="registerInput" />
            <input placeholder="Retype Password" type="password" className="registerInput" />
            <input placeholder="Age" className="registerInput" />
            <button className="registerButton">Sign Up</button>
            <button className="loginRegisterButton">
              Log into Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}