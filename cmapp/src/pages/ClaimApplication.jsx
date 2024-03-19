import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClaimForm from '../components/ClaimForm';
import '../components/ClaimApplication.css';

const ClaimApplication = () => {
  const [claims, setClaims] = useState([]);
  const [selectedPolicyId, setSelectedPolicyId] = useState('');

  useEffect(() => {
    // Fetch claims when component mounts
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:5000/api/claims/${userId}`);
      setClaims(response.data.claims);
    } catch (error) {
      console.error('Error fetching claims:', error);
    }
  };

  const approveClaim = async (claimId) => {
    try {
      await axios.put(`http://localhost:5000/api/claims/${claimId}/approve`);
      fetchClaims();
    } catch (error) {
      console.error('Error approving claim:', error);
    }
  };

  const rejectClaim = async (claimId) => {
    try {
      await axios.put(`http://localhost:5000/api/claims/${claimId}/reject`);
      // Refresh claims after rejection
      fetchClaims();
    } catch (error) {
      console.error('Error rejecting claim:', error);
    }
  };

  const handleClaimButtonClick = (policyId) => {
    setSelectedPolicyId(policyId);
  };

  return (
    <div>
      <h2>Claim Application</h2>
      <div>
        <div>
          <ClaimForm policyId={selectedPolicyId} />
        </div>
        <h3>Claims</h3>
        <ul>
          {claims.map(claim => (
            <li key={claim._id}>
              <div>Policy Name: {claim.policyName}</div>
              <div>Claim Amount: {claim.claimAmount}</div>
              <div>Status: {claim.status}</div>
              <div>
                <button onClick={() => approveClaim(claim._id)}>Approve</button>
                <button onClick={() => rejectClaim(claim._id)}>Reject</button>
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
