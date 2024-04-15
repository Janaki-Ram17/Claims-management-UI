import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './ClaimRequestsPage.css'; 
const API_BASE_URL ='http://localhost:5000/api';

const ClaimRequestsPage = () => {
  const [claimRequests, setClaimRequests] = useState([]);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate(); 

  useEffect(() => {
    if (userId) {
      fetchClaimRequests();
      fetchCustomerName();
    }
  }, [userId]);

  const fetchClaimRequests = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/claims`);
      const { claims } = response.data; // Destructure the 'claims' array from response.data
      if (Array.isArray(claims)) {
        const updatedClaims = await Promise.all(claims.map(async (claim) => {
          if (claim.userId && typeof claim.userId === 'string') { // Check if userId is defined and it's a string
            const customerName = await fetchCustomerName(claim.userId); // Use userId instead of customerId
            return { ...claim, customerName };
          } else {
            console.error('Error: userId is invalid for claim:', claim);
            return claim;
          }
        }));
        setClaimRequests(updatedClaims); // Update state with updated claim requests
      } else {
        console.error('Error fetching claim requests: Response data is not an array');
      }
    } catch (error) {
      console.error('Error fetching claim requests:', error);
    }
  };
  
  
  

  const fetchCustomerName = async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
      return response.data.user.name; 
    } catch (error) {
      console.error('Error fetching customer name:', error);
      return '';
    }
  };
  
  

  const handleStatusChange = async (claimId, newStatus) => {
    try {
      await axios.put(`${API_BASE_URL}/claims/${claimId}/${newStatus}`);
      fetchClaimRequests(); // Refresh claim requests after status change
    } catch (error) {
      console.error('Error updating claim status:', error);
    }
  };

  const goToHomePage = () => {
    navigate('/admin'); 
  };

  return (
    <div className="claim-requests-container"> 
      <button className="home-button" onClick={goToHomePage}>Home</button> 
      <h2>Claim Requests</h2>
      <div className="claim-cards-container"> 
        {claimRequests.map(claimRequest => (
          <div key={claimRequest._id} className="claim-card"> 
            <div>User Name: {claimRequest.name}</div>
            <div>User ID: {claimRequest.userId}</div> {/* Display userId instead of customerId */}
            <div>Status: {claimRequest.status}</div>
            <div>Claim Amount: {claimRequest.claimAmount}</div>
            <div>Reason: {claimRequest.reason}</div>
            <div>
              <button onClick={() => handleStatusChange(claimRequest._id, 'approve')}>Approve</button>
              <button onClick={() => handleStatusChange(claimRequest._id, 'reject')}>Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClaimRequestsPage;
