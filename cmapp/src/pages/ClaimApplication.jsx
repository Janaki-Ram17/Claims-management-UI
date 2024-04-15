import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClaimForm from '../components/ClaimForm';
import '../components/ClaimApplication.css';
const API_BASE_URL ='http://localhost:5000/api';

const ClaimApplication = () => {
  const [claims, setClaims] = useState([]);
  const [selectedPolicyId, setSelectedPolicyId] = useState('');

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`${API_BASE_URL}/claims/${userId}`);
      setClaims(response.data.claims);
    } catch (error) {
      console.error('Error fetching claims:', error);
    }
  };
  

  const handleClaimButtonClick = (policyId) => {
    setSelectedPolicyId(policyId);
  };

  return (
    <div>
      <h2>Claim Application</h2>
      <div>
        <ClaimForm policyId={selectedPolicyId} />
        <h3>Claims</h3>
        <ul>
          {claims.map(claim => (
            <li key={claim._id}>
              <div>Policy: {claim.policyId}</div>
              <div>Claim Amount: {claim.claimAmount}</div>
              <div>Status: {claim.status}</div>
              <div>
                <button onClick={() => handleClaimButtonClick(claim.policyId)}>Claim</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClaimApplication;
