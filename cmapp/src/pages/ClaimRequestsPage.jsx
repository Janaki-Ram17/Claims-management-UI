import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClaimRequestsPage = () => {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/claims');
      setClaims(response.data.claims);
    } catch (error) {
      console.error('Error fetching claims:', error);
    }
  };

  return (
    <div>
      <h2>Claim Requests</h2>
      <ul>
        {claims.map((claim) => (
          <li key={claim._id}>
            <div>Customer Name: {claim.customerName}</div>
            <div>Policy Name: {claim.policyName}</div>
            <div>Amount: {claim.amount}</div>
            <div>Reason: {claim.reason}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClaimRequestsPage;
