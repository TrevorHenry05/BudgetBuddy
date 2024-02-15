import React from 'react'
function Navigate() {
    return (
        <>
            {/* Top Navigation Section */}
            <nav className="navbar navbar-dark bg-primary mb-3 justify-content-start">
                <div className="container">
                    <a href="/#" className="navbar-brand">Budget Budy</a><br />
                    <a href="" className="">about</a>
                </div>
                <div className="navbar">
                   
                </div>
            </nav>
            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/#">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/#">Budgets</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/#">Transactions</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/#">Overview</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled" aria-disabled="true">Log Out</a>
                </li>
            </ul>
        </>
    )
}
export default Navigate;