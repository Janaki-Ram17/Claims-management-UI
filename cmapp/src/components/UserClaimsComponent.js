// UserClaimsComponent.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserClaimsComponent = ({ userId }) => {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    // Fetch user's claims from the backend
    axios.get(`/api/users/${userId}/claims`)
      .then(response => {
        setClaims(response.data.claims);
      })
      .catch(error => {
        console.error('Error fetching user claims:', error);
      });
  }, [userId]);

  return (
    <div>
      <h2>User Claims</h2>
      <ul>
        {claims.map(claim => (
          <li key={claim._id}>{claim.reason}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserClaimsComponent;
