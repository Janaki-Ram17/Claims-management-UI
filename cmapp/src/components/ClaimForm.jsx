import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/ClaimApplication.css'; // Import the ClaimApplication CSS file
import './ClaimForm.css'; // Import the ClaimForm CSS file

const ClaimForm = () => {
  const [policyId, setPolicyId] = useState('');
  const [claimAmount, setClaimAmount] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate(); 


  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const policyIdParam = searchParams.get('policyId');
    if (policyIdParam) {
      setPolicyId(policyIdParam);
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!policyId || !claimAmount || !reason) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:5000/api/claims/${userId}`, {
        policyId,
        claimAmount,
        reason
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Claim request added successfully:', response.data.newClaim);
      alert('Claim application submitted successfully');
    } catch (error) {
      console.error('Error adding claim:', error);
      setError('Failed to add claim');
    } finally {
      setLoading(false);
    }
  };
  
  const goToHomePage = () => {
    navigate('/home'); 
  };


  return (
    <div className="claim-form-container">
      <button className="home-button" onClick={goToHomePage}>Home</button> 
      <h2>Claim Policy</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Policy ID:
          <input type="text" value={policyId} onChange={(e) => setPolicyId(e.target.value)} readOnly />
        </label>
        <label>
          Claim Amount:
          <input type="text" value={claimAmount} onChange={(e) => setClaimAmount(e.target.value)} />
        </label>
        <label>
          Reason:
          <textarea value={reason} onChange={(e) => setReason(e.target.value)} />
        </label>
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={loading}>Claim Policy</button>
      </form>
    </div>
  );
};

export default ClaimForm;
