//LOGIN PAGE FRONTEND CODE
import React from "react";
import "./login.css"

export default function Login() {
    return (
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo">Mood Palette</h3>
            <span className="loginDesc">
            Track your mood, write diary entries, customize your Moo Pal, and get a personalized song everyday!
            </span>
          </div>
          <div className="loginRight">
            <div className="loginBox">
              <input placeholder="Username" className="loginInput" />
              <input placeholder="Password" className="loginInput" />
              <button className="loginButton">Log In</button>
              <span className="loginForgot">Forgot Password?</span>
              <button className="loginRegisterButton">
                Create a New Account
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }