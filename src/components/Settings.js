import React, { useState } from 'react';
import Main from '../Layout/Main';

function SettingsPage({onLogout}) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to update user settings goes here
    console.log('Updated Email:', email);
    console.log('Updated Username:', username);
    console.log('Updated Password:', password);
  };

  return (
    <Main onLogout={onLogout}>
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
                required 
            />
            </label>
            <br />
            <input type="submit" value="Update Settings" />
        </form>
        </div>
    </Main>
  );
}

export default SettingsPage;
