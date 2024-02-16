import React from 'react';
import '../App.css'
import { NavLink, Link } from "react-router-dom";

function Navigate() {
    return (
        <>
            <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">Budget Budy</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                                <NavLink exact to="/" className="nav-link">Budget Management</NavLink>
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
                                    <NavLink to="/LoginPage" className="nav-link">Log Out</NavLink>
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
