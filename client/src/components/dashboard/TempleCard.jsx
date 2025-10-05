import React from 'react';
import { Link } from 'react-router-dom';

function TempleCard({ temple, crowdData, onSelect }) {
  const {
    name,
    location,
    city,
    currentCrowd = 0,
    capacity = 1000,
    queueTime = 0,
    facilities = {}
  } = temple;

  const crowdPercentage = capacity > 0 ? (currentCrowd / capacity) * 100 : 0;
  
  const getCrowdStatus = (percentage) => {
    if (percentage < 40) return { level: 'Low', color: 'green' };
    if (percentage < 70) return { level: 'Medium', color: 'orange' };
    if (percentage < 90) return { level: 'High', color: 'red' };
    return { level: 'Critical', color: 'purple' };
  };

  const status = getCrowdStatus(crowdPercentage);

  return (
    <div className="temple-card" onClick={() => onSelect(temple)}>
      <div className="temple-header">
        <h3>{name}</h3>
        <span className={`status-badge ${status.level.toLowerCase()}`}>
          {status.level}
        </span>
      </div>
      
      <div className="temple-location">
        <span>📍 {location}, {city}</span>
      </div>

      <div className="crowd-info">
        <div className="crowd-meter">
          <div className="meter-labels">
            <span>Current: {currentCrowd}</span>
            <span>Capacity: {capacity}</span>
          </div>
          <div className="meter-bar">
            <div 
              className="meter-fill"
              style={{ 
                width: `${Math.min(crowdPercentage, 100)}%`,
                backgroundColor: status.color
              }}
            ></div>
          </div>
          <div className="meter-percentage">
            {Math.round(crowdPercentage)}% Full
          </div>
        </div>

        <div className="queue-info">
          <div className="wait-time">
            ⏱️ Average Wait: {queueTime} mins
          </div>
          {crowdData?.queueLength && (
            <div className="queue-length">
              👥 Queue: {crowdData.queueLength} people
            </div>
          )}
        </div>
      </div>

      <div className="facilities">
        {facilities.parking && <span className="facility">🅿️</span>}
        {facilities.medical && <span className="facility">🏥</span>}
        {facilities.wheelchair && <span className="facility">♿</span>}
      </div>

      <div className="temple-actions">
        <Link to={`/temple/${temple._id || temple.id}`} className="view-details-btn">
          View Details
        </Link>
        <button className="live-status-btn">
          Live Status
        </button>
      </div>
    </div>
  );
}

export default TempleCard;