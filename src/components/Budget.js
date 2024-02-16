import React from 'react';
import { Link } from "react-router-dom";
import logo from "./img/logo.jpg";

function Budget() {

    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-primary">
                <div class="container-fluid">
                    <Link to="/budget" className="navbar-brand">
                        <img src={logo} alt="Budget Buddy Logo" style={{ maxWidth: '170px', maxHeight: '70px' }}/>
                    </Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarText">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <ul className="nav justify-content-end">
                                <li className="nav-item">
                                    <Link to="/budget" className="nav-link active">Budget Management</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/expenseTracking" className="nav-link">Expense tracking</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/groupColab" className="nav-link">Group Collaboration</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/expense" className="nav-link">Expense Category</Link>
                                </li>

                            </ul>
                        </ul>
                        <span class="navbar-text">
                            <ul className="nav justify-content-end">
                                <li className="nav-item">
                                    <a className="nav-link" href="/#">Settings</a>
                                </li>
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">Log Out</Link>
                                </li>
                            </ul>
                        </span>
                    </div>
                </div>
            </nav >

            <div>
                <h1>Budget Information</h1>
            </div>
        </>
    );
}

export default Budget;