import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './SuccessPage.css';

const SuccessPage = () => {
  const { state } = useLocation();
  const { formData } = state || {};

  if (!formData) return <div>No data available</div>;

  return (
    <div className="success-page">
      <h2>Registration Successful!</h2>
      <div className="user-details">
        <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
        <p><strong>Username:</strong> {formData.username}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Phone:</strong> {formData.phoneCode} {formData.phoneNumber}</p>
        <p><strong>Location:</strong> {formData.city}, {formData.country}</p>
        <p><strong>PAN:</strong> {formData.panNo}</p>
        <p><strong>Aadhar:</strong> {formData.aadharNo}</p>
      </div>
      <Link to="/" className="back-btn">Back to Form</Link>
    </div>
  );
};

export default SuccessPage;
