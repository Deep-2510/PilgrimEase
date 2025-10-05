import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

function Profile() {
  const { state } = useApp();
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 9876543210',
    age: 35,
    specialNeeds: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>👤 Pilgrim Profile</h1>
        <p>Manage your profile and preferences</p>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <h3>Personal Information</h3>
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({...user, name: e.target.value})}
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                value={user.phone}
                onChange={(e) => setUser({...user, phone: e.target.value})}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                value={user.age}
                onChange={(e) => setUser({...user, age: parseInt(e.target.value)})}
                min="1"
                max="120"
              />
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={user.specialNeeds}
                  onChange={(e) => setUser({...user, specialNeeds: e.target.checked})}
                />
                I require special assistance (elderly, differently-abled, etc.)
              </label>
            </div>

            <button type="submit" className="update-btn">
              Update Profile
            </button>
          </form>
        </div>

        <div className="preferences-card">
          <h3>Pilgrimage Preferences</h3>
          <div className="preferences">
            <div className="preference-item">
              <strong>Preferred Temples:</strong>
              <span>Somnath, Dwarka, Ambaji</span>
            </div>
            <div className="preference-item">
              <strong>Visit Timing:</strong>
              <span>Morning (6 AM - 12 PM)</span>
            </div>
            <div className="preference-item">
              <strong>Language:</strong>
              <span>English, Hindi</span>
            </div>
          </div>
        </div>

        <div className="emergency-contacts-card">
          <h3>🆘 Emergency Contacts</h3>
          <div className="emergency-contacts">
            <div className="contact-item">
              <strong>Primary Contact</strong>
              <span>+91 9876543210</span>
            </div>
            <div className="contact-item">
              <strong>Secondary Contact</strong>
              <span>+91 9123456789</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;