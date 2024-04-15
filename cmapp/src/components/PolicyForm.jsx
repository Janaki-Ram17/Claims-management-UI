import React, { useState } from 'react';
import axios from 'axios';
const API_BASE_URL ='http://localhost:5000/api';

const PolicyForm = () => {
  const [policyName, setPolicyName] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [validity, setValidity] = useState('');
  const [totalSumAssured, setTotalSumAssured] = useState('');

  const handlePolicySubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_BASE_URL}/policies/add`, {
        policyName,
        customerId,
        validity,
        totalSumAssured
      });
      // Handle success
    } catch (error) {
      console.error('Error adding policy:', error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handlePolicySubmit}>
      <input type="text" value={policyName} onChange={(e) => setPolicyName(e.target.value)} placeholder="Policy Name" required />
      <input type="text" value={customerId} onChange={(e) => setCustomerId(e.target.value)} placeholder="Customer ID" required />
      <input type="text" value={validity} onChange={(e) => setValidity(e.target.value)} placeholder="Validity" required />
      <input type="text" value={totalSumAssured} onChange={(e) => setTotalSumAssured(e.target.value)} placeholder="Total Sum Assured" required />
      <button type="submit">Apply for Policy</button>
    </form>
  );
};

const ClaimForm = () => {
  const [policyId, setPolicyId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [claimAmount, setClaimAmount] = useState('');
  const [reason, setReason] = useState('');

  const handleClaimSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_BASE_URL}/claims/add`, {
        policyId,
        claimAmount,
        reason
      });
      // Handle success
    } catch (error) {
      console.error('Error submitting claim:', error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleClaimSubmit}>
      <input type="text" value={policyId} onChange={(e) => setPolicyId(e.target.value)} placeholder="Policy ID" required />
      <input type="text" value={customerId} onChange={(e) => setCustomerId(e.target.value)} placeholder="Customer ID" required />
      <input type="text" value={claimAmount} onChange={(e) => setClaimAmount(e.target.value)} placeholder="Claim Amount" required />
      <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason" required />
      <button type="submit">Submit Claim</button>
    </form>
  );
};

export { PolicyForm, ClaimForm };
