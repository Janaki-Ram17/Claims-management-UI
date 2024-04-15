import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PolicyApplication.css';

const API_BASE_URL = 'http://localhost:5000/api';

const PolicyApplication = () => {
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [comment, setComment] = useState('');
  const [userAge, setUserAge] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserAge();
  }, []);

  const fetchUserAge = () => {
    const age = parseInt(localStorage.getItem('userAge'), 10);
    setUserAge(age);
  };

  const applyForPolicy = async () => {
    if (!amount || !duration) {
      setError('Please enter amount and duration');
      return;
    }
    if (amount < 0 || duration < 0) {
      setError('Amount and duration cannot be negative');
      return;
    }
    if (userAge && parseInt(duration, 10) > userAge) {
      setError('Policy duration cannot exceed your age');
      return;
    }

    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/policies/${userId}`, {
        amount,
        duration,
        comment
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Response:', response.data.newPolicy);
      alert('Policy application submitted successfully');
      navigate('/home');
    } catch (error) {
      console.error('Error applying for policy:', error);
      alert('Failed to apply for policy');
    }
  };

  const goToHomePage = () => {
    navigate('/home');
  };

  return (
    <div className="policy-application-container">
      <button className="home-button" onClick={goToHomePage}>
        Home
      </button>
      <h2>Policy Application</h2>
      <div className="policy-selection">
        {error && <div className="error-message">{error}</div>}
        <div className="input-group">
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>
        <div className="input-group">
          <label>Duration (in years):</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Enter duration"
          />
        </div>
        <div className="input-group">
          <label>Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment"
          />
        </div>
        <button className="apply-button" onClick={applyForPolicy}>
          Apply for Policy
        </button>
      </div>
    </div>
  );
};

export default PolicyApplication;
