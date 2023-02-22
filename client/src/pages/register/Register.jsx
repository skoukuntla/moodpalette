//REGISTRATION PAGE FRONTEND CODE
import { React, useRef, useState } from "react";
import axios from "axios";
import "./register.css"

import { useNavigate } from 'react-router-dom';

export default function Register() {

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPass = useRef();
  const age = useRef();
  const music = useRef();

  const navigate = useNavigate();


	const [validE, setValidE] = useState(0);
	const [validP, setValidP] = useState(0);
	const [validC, setValidC] = useState(0);
	const [validU, setValidU] = useState(0);
  const [validA, setValidA] = useState(0);
  // const [checked, setChecked] = useState(0);

  // const handleCheck = () => {
  //   setChecked(!checked);
  // };


	function validateEmail() {
		if (email.current.value.length === 0) {
			document.getElementById("emailError").innerHTML =
				"Please enter an email address!";
			console.log("no email provided");
			setValidE(0);
		} else if (
			!String(email.current.value).match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
		) {
			console.log("invlaid email type");
			setValidE(0);
			document.getElementById("emailError").innerHTML =
				"Please enter a valid email address!";
		} else {
			document.getElementById("emailError").innerHTML = "";
			setValidE(1);
		}
	}
	function validatePassword() {
		// add regex check
		// var re = ^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$;
		if (password.current.value.length === 0) {
			document.getElementById("passError").innerHTML = "Please enter password!";
			console.log("no password written");
			setValidP(0);
		} else if ( //currently the password checker does NOT need an uppercase letter (will have to figure the regex later)
			!(
				password.current.value.length >= 8 &&
				password.current.value.length <= 15 &&
				(password.current.value.match(/^(?=.*[A-Z])/ && /(?=.*[^a-z])/ && /(?=.*\d)/ && /(?=.*[@$!%*#?&])/) &&
				
					!/\s/g.test(password.current.value)) //this is checking for spaces in the password
			)
		) {
			document.getElementById("passError").innerHTML =
				"Please enter a valid password!";
			console.log("not a valid password");
			setValidP(0);
		} else {
			document.getElementById("passError").innerHTML = "";
			setValidP(1);
		}
	}
	function validateConfirmPass() {
		if (confirmPass.current.value.length === 0) {
			document.getElementById("confirmPassError").innerHTML =
				"Please enter password again!";
			console.log("confirm password length is 0");
			setValidC(0);
		} else if (confirmPass.current.value !== password.current.value) {
			document.getElementById("confirmPassError").innerHTML =
				"Please enter matching password!";
			console.log("confirm password does not match oringal password");
			setValidC(0);
		} else {
			document.getElementById("confirmPassError").innerHTML = "";
			setValidC(1);
		}
	}
	function validateUsername() {
		if (username.current.value.length === 0) {
			document.getElementById("usernameError").innerHTML =
				"Please enter username!";
			console.log("no username provided");
			setValidU(0);
		} else if (
			!(
				username.current.value.length <= 16 &&
				!/\s/g.test(username.current.value) //checking for spaces
			)
		) {
			document.getElementById("usernameError").innerHTML =
				"Please enter valid username!";
			console.log("username less than 16 char");
			setValidU(0);
		} else {
			document.getElementById("usernameError").innerHTML = "";
			setValidU(1);
		}
	}
  function validateAge() {
		if (age.current.value.length === 0) {
			document.getElementById("ageError").innerHTML = "Please enter age!";
			console.log("no age given");
			setValidA(0);
		} else {
			document.getElementById("ageError").innerHTML = "";
			setValidA(1);
		}
	}


  const handleRegisterClick = async (e) => {
    e.preventDefault();

    if (validC + validE + validP + validU + validA !== 5) {
			document.getElementById("overallError").innerHTML =
				"Please fill all fields!";
        
		} else {
        const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        age: age.current.value
      };
      console.log('user', user)
      try {
        await axios.post("/auth/register", user);
        navigate('/login');

      } catch (err) {
        console.log(err);
        document.getElementById("overallError").innerHTML = 
				  "Email or Username already taken!";
        console.log("email or username already taken")
      }
    }
  };

  const loginRedirect = () => {
    navigate('/login');
	};

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
          <form className="registerBox" onSubmit={handleRegisterClick}>

            {/* USERNAME INFO AND ERROR */}
            <input placeholder="Username"  ref = {username} className="registerInput" onBlur={validateUsername} />
            <div id="usernameError" style={{ color: "red" }}></div>
            <small style={{ textAlign: "center", color: "darkseagreen"}}>
							Username length is restricted to 16 characters.
						</small>

            {/* EMAIL INFO AND ERROR */}
            <input placeholder="Email"  ref={email}c type="email" className="registerInput" onBlur={validateEmail}/>
						<div id="emailError" style={{ color: "red" }}></div>

            {/* FIRST PASSWORD INFO AND ERROR */}
            <input placeholder="Password"  ref={password} type="password" className="registerInput" onBlur={validatePassword}/>
            <div id="passError" style={{ color: "red" }}></div>
						<small style={{ textAlign: "center", color: "darkseagreen" }}>
							Your password must be 8-15 characters long and contain the following: one uppercase letter, one lowercase letter, 
							one special character (not including numbers), and must not contain spaces.
						</small>

            {/* CONFIRMATION PASSWORD INFO AND ERROR */}
            <input placeholder="Retype Password"  ref={confirmPass} type="password" className="registerInput" onBlur={validateConfirmPass}/>
						<div id="confirmPassError" style={{ color: "red" }}></div>

            {/* AGE INFO AND ERROR */}
            <input placeholder="Age"  ref={age} className="registerInput" onBlur={validateAge} />
            <div id="ageError" style={{ color: "red" }}></div>

            {/* EXPLICIT MUSIC INFO */}
            {/* <label className="trial">Explicit music? </label>
            <input type="checkbox"  ref={music} className="registerInputCheck" checked={checked} onChange={handleCheck} /> 
            <small style={{ textAlign: "center", color: "darkseagreen" }}>
							Mood Palette gives each user a "song of the day" to reflect the information they've inputted. Would you
              like to receive songs that may contain explicit lyrics?
						</small> */}

            {/* REGISTER BUTTON */}
            <button className="registerButton" type="submit">Sign Up</button>
            
            <button className="loginRegisterButton" onClick={loginRedirect}>
              Log into Account
            </button>

            {/* USERNAME AND INFO ALREADY TAKEN; AT THE VERY BOTTOM BECAUSE WE NEED FORM TO BE SUBMITTED AND CHECKED W DATABASE */}
            <div id="overallError" style={{ color: "red" }}></div>
          </form>
        </div>
      </div>
    </div>
  );
}

