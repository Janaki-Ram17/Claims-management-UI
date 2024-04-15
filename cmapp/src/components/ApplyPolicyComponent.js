import React, { useState } from 'react';
import axios from 'axios';

const ApplyPolicyComponent = ({ userId }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    // Submit policy application to the backend
    axios.post(`/api/users/${userId}/apply-policy`, { comment })
      .then(response => {
        // Handle success
      })
      .catch(error => {
        // Handle error
        console.error('Error applying for policy:', error);
      });
  };

  return (
    <div>
      <h2>Apply for Policy</h2>
      <textarea value={comment} onChange={e => setComment(e.target.value)} />
      <button onClick={handleSubmit}>Apply</button>
    </div>
  );
};

export default ApplyPolicyComponent;
