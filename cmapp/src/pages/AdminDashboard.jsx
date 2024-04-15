import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditCustomerForm from '../components/EditCustomerForm';
import './AdminDashboard.css'; 
const API_BASE_URL ='http://localhost:5000/api';

const AdminDashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [policies, setPolicies] = useState([]);
  const [claims, setClaims] = useState([]);
  const [editingCustomerId, setEditingCustomerId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchPolicies();
    fetchClaims();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      setCustomers(response.data.users);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchPolicies = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/policies`);
      setPolicies(response.data.policies);
    } catch (error) {
      console.error('Error fetching policies:', error);
    }
  };

  const fetchClaims = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/claims`);
      setClaims(response.data.claims);
    } catch (error) {
      console.error('Error fetching claims:', error);
    }
  };

  const handleViewCustomer = async (customerId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/customers/${customerId}`);
      const customer = response.data.customer;
      console.log('Customer Details:', customer);
      setCustomerDetails(customer);
    } catch (error) {
      console.error('Error viewing customer:', error);
    }
  };
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEditCustomer = (customerId) => {
    // Set editingCustomerId to trigger rendering of EditCustomerForm
    setEditingCustomerId(customerId);
  };

  const handleCloseCustomerDetails = () => {
    setCustomerDetails(null); // Clear customer details when modal is closed
  };

  const handleCloseEditForm = () => {
    setEditingCustomerId(null); // Clear editingCustomerId to close EditCustomerForm
  };

  const handleDeleteCustomer = (customerId) => {
    // Delete customer
    console.log('Delete customer with ID:', customerId);
  };

  const handleAddCustomer = () => {
    // Add new customer
    console.log('Add new customer');
  };

  const handleApproveClaim = (claimId) => {
    // approve claim
    console.log('Approve claim with ID:', claimId);
  };

  const handleRejectClaim = (claimId) => {
    // reject claim
    console.log('Reject claim with ID:', claimId);
  };

  const handlePoliciesClick = () => {
    navigate('/policy-requests');
  };

  const handleClaimsClick = () => {
    navigate('/claim-requests'); // Navigate to claim requests page
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out');
    navigate('/'); 
  };

  return (
    <div className="admin-dashboard-container">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <div className="admin-dashboard-buttons">
        <button onClick={handlePoliciesClick}>Policies</button>
        <button onClick={handleClaimsClick}>Claims</button>
      </div>

      <div>
        {editingCustomerId && (
          <EditCustomerForm
            customer={customers.find((customer) => customer._id === editingCustomerId)}
            onClose={handleCloseEditForm}
          />
        )}
      </div>

      <div>
        <h3>Customers</h3>
        <div className="search-container">
        <input
          type="text"
          placeholder="Search by name or ID"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
        <button className="add-customer-button" onClick={handleAddCustomer}>Add New Customer</button>
        <div className="customer-list">
          {filteredCustomers.map((customer) => (
            <div className="customer-card" key={customer._id}>
              <div className="customer-details">
                <div>Customer Name: {customer.name}</div>
                <div>Customer ID: {customer._id}</div>
              </div>
              <div className="customer-actions">
                <button onClick={() => handleViewCustomer(customer._id)}>View</button>
                <button onClick={() => handleEditCustomer(customer._id)}>Edit</button>
                <button onClick={() => handleDeleteCustomer(customer._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal or separate page to display customer details */}
      {customerDetails && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseCustomerDetails}>
              &times;
            </span>
            <h2>Customer Details</h2>
            <p>Name: {customerDetails.name}</p>
            <p>Email: {customerDetails.email}</p>
            {/* Add more customer details here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
