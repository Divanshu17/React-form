import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserForm.css';

const UserForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', username: '', email: '',
    password: '', phoneCode: '+91', phoneNumber: '',
    country: '', city: '', panNo: '', aadharNo: ''
  });
  
  const [errors, setErrors] = useState({});

  const countries = ['India', 'USA', 'UK', 'Canada', 'Australia'];
  const cities = {
    India: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'],
    USA: ['New York', 'Los Angeles', 'Chicago'],
    UK: ['London', 'Manchester', 'Birmingham'],
    Canada: ['Toronto', 'Vancouver', 'Montreal'],
    Australia: ['Sydney', 'Melbourne', 'Brisbane']
  };

  const validateForm = () => {
    let newErrors = {};
    if (formData.firstName.length < 2) 
      newErrors.firstName = 'First name is too short';
    if (formData.lastName.length < 2)
      newErrors.lastName = 'Last name is too short';
    if (formData.username.length < 4)
      newErrors.username = 'Username is too short';
    if (!formData.email.includes('@'))
      newErrors.email = 'Please check your email';
    if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    if (formData.phoneNumber.length !== 10)
      newErrors.phoneNumber = 'Please enter a valid phone number';
    if (!formData.country)
      newErrors.country = 'Please select a country';
    if (!formData.city)
      newErrors.city = 'Please select a city';
    if (formData.panNo.length !== 10)
      newErrors.panNo = 'Please check PAN number';
    if (formData.aadharNo.length !== 12)
      newErrors.aadharNo = 'Please check Aadhar number';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate('/success', { state: { formData } });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <h2>User Registration</h2>
      
      <div className="form-row">
        <div className="form-group">
          <input type="text" name="firstName" placeholder="First Name"
            value={formData.firstName} onChange={handleChange} />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>
        <div className="form-group">
          <input type="text" name="lastName" placeholder="Last Name"
            value={formData.lastName} onChange={handleChange} />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>
      </div>
      
      <div className="form-group">
        <input type="text" name="username" placeholder="Username"
          value={formData.username} onChange={handleChange} />
        {errors.username && <span className="error">{errors.username}</span>}
      </div>

      <div className="form-group">
        <input type="email" name="email" placeholder="Email"
          value={formData.email} onChange={handleChange} />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="form-row">
        <div className="form-group" style={{ flex: '0 0 100px' }}>
          <select name="phoneCode" value={formData.phoneCode} onChange={handleChange}>
            <option value="+91">+91</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
          </select>
        </div>
        <div className="form-group">
          <input type="tel" name="phoneNumber" placeholder="Phone Number"
            value={formData.phoneNumber} onChange={handleChange} />
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <select name="country" value={formData.country} 
            onChange={handleChange}>
            <option value="">Select Country</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          {errors.country && <span className="error">{errors.country}</span>}
        </div>
        <div className="form-group">
          <select name="city" value={formData.city} 
            onChange={handleChange} disabled={!formData.country}>
            <option value="">Select City</option>
            {formData.country && cities[formData.country].map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          {errors.city && <span className="error">{errors.city}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <input type="text" name="panNo" placeholder="PAN Number"
            value={formData.panNo} onChange={handleChange} />
          {errors.panNo && <span className="error">{errors.panNo}</span>}
        </div>
        <div className="form-group">
          <input type="text" name="aadharNo" placeholder="Aadhar Number"
            value={formData.aadharNo} onChange={handleChange} />
          {errors.aadharNo && <span className="error">{errors.aadharNo}</span>}
        </div>
      </div>

      <div className="form-group">
        <div className="password-field">
          <input type={showPassword ? "text" : "password"}
            name="password" placeholder="Password"
            value={formData.password} onChange={handleChange} />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <button type="submit" className="submit-btn">Submit</button>
    </form>
  );
};

export default UserForm;
