import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PolicyCard from '../components/PolicyCard';
import './HomePage.css';

const HomePage = () => {
  const [userPolicies, setUserPolicies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
  const fetchUserPolicies = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:5000/api/policies/${userId}`);
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
    // Perform logout actions here, such as removing user data from localStorage
    localStorage.removeItem('userId');
    // Redirect to the login page or any other desired page after logout
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
