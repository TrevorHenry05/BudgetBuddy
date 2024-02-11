import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './Style.css'; // Import CSS file for styling
import logo from './img/logo.jpg';

function SignUpPage() {
  return (
    <div className="container">
      <img src={logo} alt="Logo" />
      <h1>Welcome to Our Website</h1>
      <p>Please sign up or log in to access your account.</p>
      <div className="form-container">
        <form action="#" method="post">
          <input type="email" name="email" placeholder="Email" required /><br />
          <input type="text" name="firstName" placeholder="First Name" required /><br />
          <input type="text" name="lastName" placeholder="Last Name" required /><br />
          <input type="password" name="password" placeholder="Password" required /><br />
          <input type="password" name="repassword" placeholder="Re-enter Password" required /><br />
          <input type="submit" value="Sign Up" />
        </form>
        {/* Use Link instead of anchor tag for navigation */}
        <p>Already have an account? <Link to="/">Sign In</Link></p>
      </div>
    </div>
  );
}

export default SignUpPage;
