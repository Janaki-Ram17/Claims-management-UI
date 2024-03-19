import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PolicyApplication.css';

const PolicyApplication = () => {
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [comment, setComment] = useState('');
  const navigate = useNavigate(); 

  const applyForPolicy = async () => {
    if (!amount || !duration) {
      alert('Please enter amount and duration');
      return;
    }
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:5000/api/policies/${userId}`, {
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
      // Redirect to claim form with the policy ID as a query parameter
      navigate(`/claim-form?policyId=${response.data.newPolicy._id}`);
    } catch (error) {
      console.error('Error applying for policy:', error);
      alert('Failed to apply for policy');
    }
  };

  const goToHomePage = () => {
    navigate('/home'); // Navigate to the home page
  };

  return (
    <div className="policy-application-container">
      <h2>Policy Application</h2>
      <div className="policy-selection">
        <div>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>
        <div>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Enter duration (in years)"
          />
        </div>
        <div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment"
          />
        </div>
        <button className="apply-button" onClick={applyForPolicy}>
          Apply for Policy
        </button>
        <button className="home-button" onClick={goToHomePage}>
          Home
        </button>
      </div>
    </div>
  );
};

export default PolicyApplication;
