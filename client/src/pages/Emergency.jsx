import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { reportEmergency } from '../services/api';
import { EMERGENCY_TYPES } from '../utils/constants';

function Emergency() {
  const { state, dispatch } = useApp();
  const [selectedType, setSelectedType] = useState('');
  const [formData, setFormData] = useState({
    location: '',
    description: '',
    severity: 'medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedType) {
      alert('Please select an emergency type');
      return;
    }

    setIsSubmitting(true);
    try {
      const emergencyData = {
        templeId: state.currentTemple?._id || state.temples[0]?._id,
        type: selectedType,
        ...formData,
        userId: state.user?._id
      };

      const response = await reportEmergency(emergencyData);
      dispatch({ type: 'ADD_EMERGENCY', payload: response.data });
      
      alert('Emergency reported successfully! Help is on the way.');
      setFormData({ location: '', description: '', severity: 'medium' });
      setSelectedType('');
    } catch (error) {
      console.error('Error reporting emergency:', error);
      alert('Failed to report emergency. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="emergency-page">
      <div className="emergency-header">
        <h1>🚨 Emergency Assistance</h1>
        <p>Report an emergency situation immediately</p>
      </div>

      <div className="emergency-section">
        <form onSubmit={handleSubmit} className="emergency-form">
          <div className="form-group">
            <label>Select Emergency Type *</label>
            <div className="emergency-types">
              {Object.entries(EMERGENCY_TYPES).map(([key, value]) => (
                <button
                  key={key}
                  type="button"
                  className={`emergency-type-btn ${
                    selectedType === key ? 'selected' : ''
                  }`}
                  onClick={() => setSelectedType(key)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location">Your Location *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g., Main Temple Hall, Parking Area, Queue Line..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="severity">Severity Level</label>
            <select
              id="severity"
              name="severity"
              value={formData.severity}
              onChange={handleInputChange}
            >
              <option value="low">Low - Minor issue</option>
              <option value="medium">Medium - Needs attention</option>
              <option value="high">High - Urgent situation</option>
              <option value="critical">Critical - Immediate danger</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Please provide details about the emergency situation..."
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting || !selectedType}
          >
            {isSubmitting ? 'Reporting...' : '🚨 Report Emergency'}
          </button>
        </form>

        <div className="emergency-contacts">
          <h3>📞 Emergency Contacts</h3>
          <div className="contact-list">
            <div className="contact-item">
              <strong>Police</strong>
              <span>100</span>
            </div>
            <div className="contact-item">
              <strong>Ambulance</strong>
              <span>108</span>
            </div>
            <div className="contact-item">
              <strong>Fire</strong>
              <span>101</span>
            </div>
            <div className="contact-item">
              <strong>Temple Security</strong>
              <span>+91-XXX-XXXXXXX</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Emergency;