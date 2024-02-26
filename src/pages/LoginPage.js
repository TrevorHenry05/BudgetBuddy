import React, { useState } from "react";
import logo from "../components/img/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../constants";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const credentials = { email, password };

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
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <img
          src={logo}
          alt="Logo"
          className="mb-4"
          style={{ maxWidth: "150px" }}
        />
        <h1>Welcome to Budget Buddy</h1>
        <p>Please sign up or log in to access your account.</p>
      </div>
      <div className="form-container d-flex justify-content-center">
        <form onSubmit={handleSubmit} className="w-50">
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type={showPassword ? "text" : "password"} // Toggle password visibility
              name="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)} // Toggle showPassword state
            />
            <label className="form-check-label" htmlFor="showPassword">
              Show Password
            </label>
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Log In
            </button>
          </div>
        </form>
      </div>
      <div className="text-center mt-3">
        Don't have an account? <Link to="/signUp">Sign Up</Link>
      </div>
    </div>
  );
}

export default LoginPage;
