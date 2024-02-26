import React, { useState, useEffect } from "react";
import { API_URL } from "../constants";

function SettingsPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API_URL}/api/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setEmail(data.email);
        setUsername(data.username);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [token]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const submitData = {
      email: email,
      username: username,
      password: password,
    };

    if (!submitData.password) {
      delete submitData.password;
    }

    fetch(`${API_URL}/api/users/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(submitData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Settings updated successfully");
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Settings</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            New Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Settings
        </button>
      </form>
    </div>
  );
}

export default SettingsPage;
