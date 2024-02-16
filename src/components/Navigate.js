import React from 'react';
import '../App.css'
import { NavLink, Link } from "react-router-dom";
import logo from './img/logo.jpg';

function Navigate() {
    return (
        <>
            <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link to="/budget" className="navbar-brand">
                        <img src={logo} alt="Budget Buddy Logo" style={{ maxWidth: '150px', maxHeight: '50px' }}/>
                    </Link>
                
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                                <NavLink exact to="/BudGet" className="nav-link">Budget Management</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/ExpenseTracking" className="nav-link">Expense tracking</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/GroupColab" className="nav-link">Group Collaboration</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/Expense" className="nav-link">Expense Category</NavLink>
                            </li>
                        </ul>
                        <span className="navbar-text">
                            <ul className="nav justify-content-end">
                                <li className="nav-item">
                                    <NavLink to="/Settings" className="nav-link">Settings</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/" className="nav-link">Log Out</NavLink>
                                </li>
                            </ul>
                        </span>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navigate;
