import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import './PolicyRequestsPage.css'; // Import the CSS file

const PolicyRequestsPage = () => {
  const [policyRequests, setPolicyRequests] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    fetchPolicyRequests();
  }, []);

  const fetchPolicyRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/policies');
      console.log('Policy Requests:', response.data); // Log the response data
      const requests = await Promise.all(response.data.map(async (policyRequest) => {
        const name = await fetchUserName(policyRequest.customerId);
        return { ...policyRequest, name };
      }));
      setPolicyRequests(requests);
    } catch (error) {
      console.error('Error fetching policy requests:', error);
    }
  };

  const fetchUserName = async (customerId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${customerId}`);
      return response.data.name; // Assuming 'name' is the property for user name
    } catch (error) {
      console.error('Error fetching user name:', error);
      return '';
    }
  };

  const handleStatusChange = async (policyId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/policies/${policyId}/${newStatus}`);
      fetchPolicyRequests(); // Refresh policy requests after status change
    } catch (error) {
      console.error('Error updating policy status:', error);
    }
  };

  const goToHomePage = () => {
    navigate('/admin'); 
  };

  return (
    <div className="policy-requests-container"> {/* Apply CSS class to the container */}
      <button className="home-button" onClick={goToHomePage}>Home</button> {/* Home button */}
      <h2>Policy Requests</h2>
      <div className="policy-cards-container"> {/* Apply CSS class to the policy cards container */}
        {policyRequests.map(policyRequest => (
          <div key={policyRequest._id} className="policy-card"> {/* Apply CSS class to each policy card */}
            <div>User Name: {policyRequest.name}</div>
            <div>User ID: {policyRequest.customerId}</div>
            <div>Status: {policyRequest.status}</div>
            <div>Policy Amount: {policyRequest.PolicyAmount}</div>
            <div>Policy Balance: {policyRequest.PolicyBalance}</div>
            <div>Amount Claimed: {policyRequest.amountClaimed}</div>
            <div>Comment: {policyRequest.comment}</div>
            <div>
              <button onClick={() => handleStatusChange(policyRequest._id, 'approve')}>Approve</button>
              <button onClick={() => handleStatusChange(policyRequest._id, 'reject')}>Reject</button>
            </div>
            {/* Add more policy request details here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PolicyRequestsPage;
