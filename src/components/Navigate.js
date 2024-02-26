import React from "react";
import "../App.css";
import { NavLink } from "react-router-dom";
import logo from "./img/logo.jpg";

function NavBar({ onLogout, isAdmin }) {
  return (
    <nav
      className="navbar navbar-expand-lg bg-dark fixed-top"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <NavLink
          to="/dashboard"
          className="navbar-brand d-flex align-items-center"
        >
          <img
            src={logo}
            alt="Budget Buddy Logo"
            style={{ maxWidth: "150px", maxHeight: "50px", margin: "auto" }}
          />
          <span className="me-2">Budget Buddy</span>
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isAdmin ? (
              <li className="nav-item">
                <NavLink to="/admindashboard" className="nav-link">
                  Admin Dashboard
                </NavLink>
              </li>
            ) : (
              <></>
            )}
          </ul>
          <span className="navbar-text">
            <ul className="nav justify-content-end">
              <li className="nav-item">
                <NavLink to="/Settings" className="nav-link">
                  Settings
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/" className="nav-link" onClick={onLogout}>
                  Log Out
                </NavLink>
              </li>
            </ul>
          </span>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
