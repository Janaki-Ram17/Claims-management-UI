// SubmitClaimComponent.js
import React, { useState } from 'react';
import axios from 'axios';

const SubmitClaimComponent = ({ policyId, userId }) => {
  const [claimAmount, setClaimAmount] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    // Submit claim to the backend
    axios.post(`/api/claims/add`, { policyId, customerId: userId, claimAmount, reason })
      .then(response => {
        // Handle success
      })
      .catch(error => {
        // Handle error
        console.error('Error submitting claim:', error);
      });
  };

  return (
    <div>
      <h2>Submit Claim</h2>
      <input type="number" value={claimAmount} onChange={e => setClaimAmount(e.target.value)} />
      <textarea value={reason} onChange={e => setReason(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default SubmitClaimComponent;
