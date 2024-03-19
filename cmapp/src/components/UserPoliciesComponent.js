// UserPoliciesComponent.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserPoliciesComponent = ({ userId }) => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    // Fetch user's policies from the backend
    axios.get(`/api/users/${userId}/policies`)
      .then(response => {
        setPolicies(response.data.policies);
      })
      .catch(error => {
        console.error('Error fetching user policies:', error);
      });
  }, [userId]);

  return (
    <div>
      <h2>User Policies</h2>
      <ul>
        {policies.map(policy => (
          <li key={policy._id}>{policy.policyName}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserPoliciesComponent;
