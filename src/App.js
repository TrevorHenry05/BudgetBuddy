import React, { useState, useEffect } from "react";
import Login from "./pages/LoginPage";
import SignUp from "./pages/SignUpPage";
import NavBar from "./components/Navigate";
import UserDashboard from "./pages/UserDashboard";
import Expense from "./pages/Expense";
import Budget from "./pages/Budget";
import Group from "./pages/Group";
import Settings from "./pages/Settings";
import "./styles/bootstrap.css";
import "./styles/Style.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // use this in the navbar to dynamically render the admin dashboard link

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token, userIsAdmin) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    setIsAdmin(userIsAdmin);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  console.log(isAuthenticated);

  return (
    <Router>
      <>
        {isAuthenticated && (
          <NavBar onLogout={handleLogout} isAdmin={isAdmin} />
        )}
        <div style={{ paddingTop: "80px" }}>
          <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? <UserDashboard /> : <Navigate to="/" />
              }
            />
            <Route
              path="/expenses/:expenseId"
              element={isAuthenticated ? <Expense /> : <Navigate to="/" />}
            />
            <Route
              path="/budgets/:budgetId"
              element={isAuthenticated ? <Budget /> : <Navigate to="/" />}
            />
            <Route
              path="/groups/:groupId"
              element={isAuthenticated ? <Group /> : <Navigate to="/" />}
            />
            <Route
              path="/settings"
              element={
                isAuthenticated ? (
                  <Settings onLogout={handleLogout} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </div>
      </>
    </Router>
  );
}

export default App;
