import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from React Router
import "../styles/Style.css"; // Import CSS file for styling
import logo from "../components/img/logo.jpg";
import { API_URL } from "../constants";

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    repassword: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (user.password === user.repassword) {
      fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.token) {
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
          } else {
            navigate("/");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred. Please try again.");
        });
    } else {
      alert("Passwords didn't match! Please check again.");
    }
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
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Username"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="form-control"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type={showPassword ? "text" : "password"}
              name="repassword"
              className="form-control"
              placeholder="Re-enter Password"
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
              onChange={() => setShowPassword(!showPassword)}
            />
            <label className="form-check-label" htmlFor="showPassword">
              Show Password
            </label>
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
        </form>
      </div>
      <div className="text-center mt-3">
        Already have an account? <Link to="/">Sign In</Link>
      </div>
    </div>
  );
}

export default SignUpPage;
