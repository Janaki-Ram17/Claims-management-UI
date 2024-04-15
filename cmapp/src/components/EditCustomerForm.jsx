import React, { useState } from 'react';
import axios from 'axios';
const API_BASE_URL ='http://localhost:5000/api';

const EditCustomerForm = ({ customer, onClose }) => {
  const [formData, setFormData] = useState({
    name: customer.name,
    email: customer.email,
    mobileNumber: customer.mobileNumber,
    age: customer.age,
    dateOfBirth: customer.dateOfBirth
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/users/${customer._id}`, formData);
      onClose(); // Close the edit form after successful submission
    } catch (error) {
      console.error('Error editing customer:', error);
      // Handle error, such as displaying an error message to the user
    }
  };

  return (
    <div>
      <h2>Edit Customer Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Mobile Number:</label>
          <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
        </div>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};


export default EditCustomerForm;
