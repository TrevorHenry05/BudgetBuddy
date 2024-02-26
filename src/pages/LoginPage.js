import React, { useState } from "react";
import "../styles/Style.css"; // Import CSS file for styling
import logo from "../components/img/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../constants";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          onLogin(data.token, data.isAdmin);
          navigate("/dashboard");
        } else {
          console.error("Login failed:", data.message);
          alert("Incorrect email or password. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // if (email === "test@gmail.com" && password === "pass123!@#") {
    //   navigate("/Budget"); // Replace '/dashboard' with the desired route

    // } else {
    //   window.alert("Incorrect email or password. Please try again."); // Display alert
    // }
  };

  return (
    <div className="container">
      <img src={logo} alt="Logo" />
      <h1>Welcome to Budget Buddy</h1>
      <p>Please sign up or log in to access your account.</p>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type={showPassword ? "text" : "password"} // Toggle password visibility
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            required
          />
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)} // Toggle showPassword state
          />
          <label htmlFor="showPassword">Show Password</label>
          <br />
          <input type="submit" value="Log In" />
        </form>
        <p>
          Don't have an account? <Link to="signUp">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
