
import React, { useState, useEffect } from 'react';
import Login from './components/LoginPage';
import SignUp from './components/SignUpPage';
import Budget from './components/Budget';
import Expense from './components/Expense';
import ExpenseTracking from './components/ExpenseTracking';
import GroupColab from './components/GroupColab';
import Settings from './components/Settings';
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Login />,
//   },
//   {
//     path: "signUp",
//     element: <SignUp />,
//   },
//   {
//     path: "budget",
//     element: <Budget />,
//   },
//   {
//     path: "expense",
//     element: <Expense />,
//   },
//   {
//     path: "expenseTracking",
//     element: <ExpenseTracking />,
//   },
//   {
//     path: "groupColab",
//     element: <GroupColab />,
//   },
//   {
//     path: "settings",
//     element: <Settings />,
//   },
// ])

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  console.log(isAuthenticated);

  return (
    <>
      <Router>
        <Routes>
          <Route 
            path="/"
            element={
              <Login onLogin={handleLogin} />
            }
          />
          <Route 
            path="/signUp"
            element={
              <SignUp/>
            }
          />
          <Route 
            path="/budget"
            element={ isAuthenticated ?
              <Expense onLogout={handleLogout}/> :
              <Budget onLogout={handleLogout}/>
            }
          />
          <Route 
            path="/expense"
            element={
              <Expense onLogout={handleLogout}/>
            }
          />
          <Route 
            path="/expenseTracking"
            element={
              <ExpenseTracking onLogout={handleLogout}/>
            }
          />
          <Route 
            path="/groupColab"
            element={
              <GroupColab onLogout={handleLogout}/>
            }
          />
          <Route 
            path="/settings"
            element={
              <Settings onLogout={handleLogout}/>
            }
          />
        </Routes>
      </Router>
    </>



  );
}

export default App;
