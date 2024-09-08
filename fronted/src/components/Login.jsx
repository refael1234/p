import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../services/auth"; // יבוא ה-apiPost שלך

export function Login() {
  const navigate = useNavigate();
  const formInput = useRef();
  const [credentialsForm, setCredentialsForm] = useState({
    email: "",
    password: ""
  });

  async function handleLogin() {
    try {
        const response = await apiPost("auth/login", credentialsForm);
        console.log("Login response:", response);  // בדוק את התגובה
        if (response.status === 200) {
            alert("User logged in successfully...");
            navigate("/dashbord"); 
        } else if (response.status === 403) {
            alert("Login failed: Incorrect email or password.");
        } else {
            alert("An unexpected error occurred.");
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("Login failed due to server error.");
    }
}


  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(); 
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '60vh'}}>
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '2rem',
        borderRadius: '8px' }}>
        <span>
          <label htmlFor="email">
            Please fill in your email
          </label>
          <input ref={formInput} 
            id="email" onChange={(e) => setCredentialsForm({ ...credentialsForm, email: e.target.value })} />
        </span>
        <span>
          <label htmlFor="password">
            Please fill in your password
          </label>
          <input id="password" type="password" onChange={(e) => setCredentialsForm({ ...credentialsForm, password: e.target.value })} />
        </span>

        <button type="submit" style={{
          padding: '0.5rem',
          borderRadius: '4px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          cursor: 'pointer'}}> Log in </button>
      </form>
    </div>
  );
}
