import React from 'react'
import { Link } from "react-router-dom";
function Navigate() {
    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-primary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Budget Budy</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarText">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <ul className="nav justify-content-end">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/#">Budget Management</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="./src/components/Budget.js">Expense tracking</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/#">Group Collaboration</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/#">Expense Category</a>
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

        </>
    )
}
export default Navigate;