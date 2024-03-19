import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user'); // Default to user login
  const navigate = useNavigate(); // useNavigate hook

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      if (response.status === 200) {
        const user = response.data.user;
        // Store user ID in local storage
        localStorage.setItem('userId', user._id);
        localStorage.setItem('token', response.data.token);
        console.log(user)
        
        if (userType === 'admin' && user.userType === 'admin') {
          // Redirect to AdminDashboard if admin selected and user is admin
          navigate('/admin');
        } else if (userType === 'user' && user.userType === 'customer') {
          // Redirect to home page if user selected and user is not admin
          navigate('/home');
        } else {
          // Show error message if selected user type doesn't match user role
          console.error('Unauthorized access');
        }
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="login-container">
      <h1 className="app-name">PCM by Ram</h1> {/* Application name */}
      <h2 className="login-heading">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            className="form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* Dropdown for selecting login type */}
        <div className="form-group">
          <label className="form-label">Login as:</label>
          <select className="form-select" value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button className="login-button" type="submit">Login</button>
      </form>
      <p className="register-link">Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default LoginPage;
