import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from React Router
import "./Style.css"; // Import CSS file for styling
import logo from "./img/logo.jpg";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypedPass, setRetypedPass] = useState("");
  const [userName, setUserName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Re-password:", retypedPass);
    console.log("UserName:", userName);

    // Connect with back end and route to dashboard
    navigate("/budget");
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
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <br />
          <input 
            type={showPassword ? "text" : "password"} // Toggle password visibility
            name="password" 
            placeholder="Password" 
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <br/>
          <input 
            type={showPassword ? "text" : "password"} // Toggle password visibility
            name="repassword" 
            placeholder="Re-enter Password" 
            onChange={(e) => setRetypedPass(e.target.value)}
            required 
          />
          <br/>
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
        {/* Use Link instead of anchor tag for navigation */}
        <p>
          Already have an account? <Link to="/">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
