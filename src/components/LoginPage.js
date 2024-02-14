import React, { useState } from 'react';
import './Style.css'; // Import CSS file for styling
import logo from './img/logo.jpg';
import { Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    console.log('Email:', email);
    console.log('Password:', password);

    // Connect with back end and route to dashboard 

  };

  return (
    <div className="container">
      <img src={logo} alt="Logo" />
      <h1>Welcome to Our Website</h1>
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
          <br/>
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <br/>
          <input type="submit" value="Log In" />
        </form>
        <p>Don't have an account? <Link to="signUp">Sign Up</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;