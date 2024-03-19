import React from 'react';

const ClaimCard = ({ claim }) => {
  return (
    <div className="claim-card">
      <h3>{claim.policyName}</h3>
      <p><strong>Policy ID:</strong> {claim.policyId}</p>
      <p><strong>Customer ID:</strong> {claim.customerId}</p>
      <p><strong>Claim ID:</strong> {claim._id}</p>
      <p><strong>Claim Amount:</strong> {claim.claimAmount}</p>
      <p><strong>Status:</strong> {claim.status}</p>
    </div>
  );
};

export default ClaimCard;
