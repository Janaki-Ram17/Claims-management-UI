import React from 'react';
import { Link } from 'react-router-dom';

const PolicyCard = ({ policy }) => {
  const handleClaimClick = () => {
    window.location.href = `/claims?policyId=${policy._id}`;
  };
  return (
    <div className="policy-card">
      <h3>{policy.policyName}</h3>
      <p><strong>Policy ID:</strong> {policy._id}</p>
      <p><strong>Status:</strong> {policy.status}</p>
      <p><strong>Validity:</strong> {new Date(policy.validity).toLocaleDateString()}</p>
      <p><strong>Total Sum Assured:</strong> {policy.PolicyAmount}</p>
      <p><strong>Amount Claimed:</strong> {policy.amountClaimed}</p>
      <p><strong>Amount Remaining:</strong> {policy.PolicyBalance}</p>
      <button onClick={handleClaimClick}>Claim</button>
    </div>
  );
};

export default PolicyCard;
