import { useState } from "react";
import { Login } from "../components/Login";
import { SignUp } from "../components/SignUp";
import { useNavigate } from "react-router-dom";
import '../css/Authentication.css'; 

export function Authentication() {
  const navigate = useNavigate();
  const [registeredUser, setRegisteredUser] = useState(false);
  const [authMessage, setAuthMessage] = useState("");

  function toggleAuthMessage() {
    if (registeredUser) {
      setAuthMessage("Already a user, log in");
    } else {
      setAuthMessage("Not a user, sign up");
    }
  }

  function handleToggleUser() {
    setRegisteredUser(!registeredUser);
    toggleAuthMessage(); // Update the message
  }

  return (
    <div className="auth-wrapper">
      <h1>CRM</h1>

      <div className="header-container">
        <button onClick={handleToggleUser} className="switch-button">
          {registeredUser ? "Switch to SignUp" : "Switch to Login"}
        </button>
      </div>

      <div className="auth-content">
        <p>{authMessage}</p>
        {registeredUser ? <Login /> : <SignUp />}
      </div>
    </div>
  );
}
