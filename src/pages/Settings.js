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
        console.log(data);
        alert("Settings updated successfully");
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <div className="container">
        <h1>Settings</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            New Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <input type="submit" value="Update Settings" />
        </form>
      </div>
    </>
  );
}

export default SettingsPage;
