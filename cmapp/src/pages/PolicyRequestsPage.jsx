import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './PolicyRequestsPage.css'; 
const API_BASE_URL ='http://localhost:5000/api';

const PolicyRequestsPage = () => {
  const [policyRequests, setPolicyRequests] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchPolicyRequests();
  }, []);

  const fetchPolicyRequests = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/policies`);
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
      const response = await axios.get(`${API_BASE_URL}/users/${customerId}`);
      return response.data.name; // Assuming 'name' is the property for user name
    } catch (error) {
      console.error('Error fetching user name:', error);
      return '';
    }
  };

  const handleStatusChange = async (policyId, newStatus) => {
    try {
      await axios.put(`${API_BASE_URL}/policies/${policyId}/${newStatus}`);
      fetchPolicyRequests(); // Refresh policy requests after status change
    } catch (error) {
      console.error('Error updating policy status:', error);
    }
  };

  const goToHomePage = () => {
    navigate('/admin'); 
  };

  return (
    <div className="policy-requests-container"> 
      <button className="home-button" onClick={goToHomePage}>Home</button> 
      <h2>Policy Requests</h2>
      <div className="policy-cards-container"> 
        {policyRequests.map(policyRequest => (
          <div key={policyRequest._id} className="policy-card"> 
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default PolicyRequestsPage;
