import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_BASE_URL ='http://localhost:5000/api';

const UserForm = ({ userId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [age, setAge] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
      const userData = response.data.user;
      setName(userData.name);
      setEmail(userData.email);
      setMobileNumber(userData.mobileNumber);
      setAge(userData.age);
      setDateOfBirth(userData.dateOfBirth);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      mobileNumber,
      age,
      dateOfBirth
    };
    try {
      if (userId) {
        // Update user details if userId is provided (for editing)
        await axios.put(`${API_BASE_URL}/users/${userId}`, userData);
        alert('User details updated successfully');
      } else {
        // Create new user if userId is not provided (for registration)
        await axios.post(`${API_BASE_URL}/users/register`, userData);
        alert('User registered successfully');
      }
    } catch (error) {
      console.error('Error submitting user data:', error);
    }
  };

  return (
    <div>
      <h2>{userId ? 'Edit User' : 'Register User'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Mobile Number:</label>
          <input type="tel" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
        </div>
        <button type="submit">{userId ? 'Update' : 'Register'}</button>
      </form>
    </div>
  );
};

export default UserForm;
