import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function SignUp() {
  const navigate = useNavigate();
  const formInput = useRef();
  
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    businessName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{5,8}$/;

  async function handleRegister() {
    try {
      const response = await axios.post("http://localhost:5000/auth/register", registerForm);
      if (response.status === 200) {
        alert("User registered successfully!");
        navigate("/Authentication");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during registration. Please try again.");
      console.error(err.message);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!registerForm.firstName || !registerForm.lastName || !registerForm.businessName || !registerForm.email || !registerForm.password || !registerForm.confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (!emailRegex.test(registerForm.email)) {
      setError("Invalid email format.");
      return;
    }

    if (!passwordRegex.test(registerForm.password)) {
      setError("Password must be 5-8 characters, with at least one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    handleRegister();
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '60vh',
    }}>
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '2rem',
        borderRadius: '8px',
        backgroundColor: '#f4f4f4',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}>
        <span>
          <label htmlFor="firstName">Please fill in your first name</label>
          <input id="firstName" onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })} />
        </span>
        <span>
          <label htmlFor="lastName">Please fill in your last name</label>
          <input id="lastName" onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })} />
        </span>
        <span>
          <label htmlFor="businessName">Please fill in your business name</label>
          <input id="businessName" onChange={(e) => setRegisterForm({ ...registerForm, businessName: e.target.value })} />
        </span>
        <span>
          <label htmlFor="email">Please fill in your email</label>
          <input id="email" onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })} />
        </span>
        <span>
          <label htmlFor="password">Please fill in your password</label>
          <input id="password" type="password" onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })} />
        </span>
        <span>
          <label htmlFor="confirmPassword">Please confirm your password</label>
          <input id="confirmPassword" type="password" onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })} />
        </span>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" style={{
          padding: '0.5rem',
          borderRadius: '4px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}>Sign Up</button>
      </form>
    </div>
  );
}
