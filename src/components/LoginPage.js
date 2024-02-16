import React, { useState } from "react";
import "./Style.css"; // Import CSS file for styling
import logo from "./img/logo.jpg";
import { Link, useNavigate } from "react-router-dom";


function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (email === "test@gmail.com" && password === "pass123!@#") {
      navigate("/budget"); // Replace '/dashboard' with the desired route
    } else {
      window.alert("Incorrect email or password. Please try again."); // Display alert
    }
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
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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
