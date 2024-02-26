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
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.token) {
          localStorage.setItem("token", data.token);
          navigate("/budget");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
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
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <br />
          <input
            type={showPassword ? "text" : "password"} // Toggle password visibility
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <br />
          <input
            type={showPassword ? "text" : "password"} // Toggle password visibility
            name="repassword"
            placeholder="Re-enter Password"
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)} // Toggle showPassword state
          />
          <label htmlFor="showPassword">Show Password</label>
          <br />
          <input type="submit" value="Sign Up" />
        </form>
        <p>
          Already have an account? <Link to="/">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
