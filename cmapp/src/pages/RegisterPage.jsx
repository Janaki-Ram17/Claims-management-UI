import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css';
const API_BASE_URL ='http://localhost:5000/api';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [age, setAge] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_BASE_URL}/users/register`, {
        name,
        email,
        password,
        mobileNumber,
        age,
        dateOfBirth,
        policies: [],
        claims: []
      });
      navigate('/home');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="register-container">
    <h2 className="app-name">PCM by Ram</h2>
    <h2 className="register-heading">Register</h2>
    <form onSubmit={handleRegister}>
    <div className="form-group">
      <label htmlFor="name" className="form-label">Name:</label>
      <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="form-input" required />
    </div>
    <div className="form-group">
      <label htmlFor="email" className="form-label">Email:</label>
      <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" required />
    </div>
    <div className="form-group">
      <label htmlFor="password" className="form-label">Password:</label>
      <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" required />
    </div>
    <div className="form-group">
      <label htmlFor="mobileNumber" className="form-label">Mobile Number:</label>
      <input type="text" id="mobileNumber" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} className="form-input" required />
    </div>
    <div className="form-group">
      <label htmlFor="age" className="form-label">Age:</label>
      <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} className="form-input" required />
    </div>
    <div className="form-group">
      <label htmlFor="dateOfBirth" className="form-label">Date of Birth:</label>
      <input type="date" id="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} className="form-input" required />
    </div>
    <button type="submit" className="register-button">Register</button>
  </form>
  <p className="login-link">Already have an account? <Link to="/" className="login-link">Login</Link></p>
</div>

  );
};

export default RegisterPage;
