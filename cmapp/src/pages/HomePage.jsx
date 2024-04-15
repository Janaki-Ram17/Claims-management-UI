import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PolicyCard from '../components/PolicyCard';
import './HomePage.css';
const API_BASE_URL ='http://localhost:5000/api';

const HomePage = () => {
  const [userPolicies, setUserPolicies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
  const fetchUserPolicies = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`${API_BASE_URL}/policies/${userId}`);
      if (response.status === 200) {
        setUserPolicies(response.data.policies);
        console.log(response.data)
      }
    } catch (error) {
      console.error('Error fetching user policies:', error);
    }
  };
  fetchUserPolicies();
  }, []);


  const navigateToAddPolicy = () => {
    navigate('/policies');
  };

  const navigateToClaims = () => {
    navigate('/claims');
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/');
  };
  

  return (
    <div className="user-home-container">
      <div className="top-right">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <h2>Welcome to the Home Page</h2>

      <div className="policy-grid">
        {userPolicies.length > 0 ? (
          userPolicies.map(policy => (
            <PolicyCard key={policy._id} policy={policy} />
          ))
        ) : (
          <p>You have no policies.</p>
        )}
      </div>
      <div className="action-buttons">
        <button onClick={navigateToAddPolicy}>Add Policy</button>
        <button onClick={navigateToClaims}>View Claims</button>
      </div>
    </div>
  );
};

export default HomePage;
