import React from 'react';
import './Style.css'; // Import CSS file for styling
import logo from './img/logo.jpg';
import { Link } from "react-router-dom";

function LoginPage() {
  return (
      <div className="container">
        <img src={logo} alt="Logo" />
        <h1>Welcome to Our Website</h1>
        <p>Please sign up or log in to access your account.</p>
        <div className="form-container">
          <form action="#" method="post">
            <input type="email" name="email" placeholder="Email" required /><br />
            <input type="password" name="password" placeholder="Password" required /><br />
            <input type="submit" value="Log In" />
          </form>
          <p>Don't have an account? <Link to="signUp">Sign Up</Link></p>
        </div>
      </div>
  );
}

export default LoginPage;