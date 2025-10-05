import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getTempleDetails, getCrowdHistory } from '../services/api';
import CrowdMeter from '../components/dashboard/CrowdMeter';
import Loading from '../components/common/Loading';

function TempleView() {
  const { id } = useParams();
  const { state, dispatch, joinTemple } = useApp();
  const [temple, setTemple] = useState(null);
  const [crowdHistory, setCrowdHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTempleDetails();
    joinTemple(id);
  }, [id]);

  const loadTempleDetails = async () => {
    try {
      setLoading(true);
      const [templeResponse, historyResponse] = await Promise.all([
        getTempleDetails(id),
        getCrowdHistory(id, 6) // Last 6 hours
      ]);
      
      setTemple(templeResponse.data);
      setCrowdHistory(historyResponse.data);
    } catch (error) {
      console.error('Error loading temple details:', error);
      // Fallback to static data
      const staticTemple = state.temples.find(t => t._id === id || t.id === id);
      setTemple(staticTemple);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!temple) {
    return (
      <div className="error-page">
        <h2>Temple not found</h2>
        <p>The requested temple could not be found.</p>
      </div>
    );
  }

  return (
    <div className="temple-view">
      <div className="temple-header">
        <h1>{temple.name}</h1>
        <p>📍 {temple.location}, {temple.city}</p>
      </div>

      <div className="temple-content">
        <div className="temple-sidebar">
          <div className="info-card">
            <h3>📋 Temple Information</h3>
            <div className="info-item">
              <strong>Timings:</strong>
              <span>{temple.timings?.opening} - {temple.timings?.closing}</span>
            </div>
            <div className="info-item">
              <strong>Capacity:</strong>
              <span>{temple.capacity} people</span>
            </div>
            <div className="info-item">
              <strong>Current Crowd:</strong>
              <span>{temple.currentCrowd} people</span>
            </div>
            <div className="info-item">
              <strong>Wait Time:</strong>
              <span>{temple.queueTime} minutes</span>
            </div>
          </div>

          <div className="facilities-card">
            <h3>🏥 Facilities</h3>
            <div className="facilities-list">
              {temple.facilities?.parking && <div className="facility">🅿️ Parking Available</div>}
              {temple.facilities?.medical && <div className="facility">🏥 Medical Center</div>}
              {temple.facilities?.restrooms && <div className="facility">🚻 Restrooms</div>}
              {temple.facilities?.wheelchair && <div className="facility">♿ Wheelchair Accessible</div>}
            </div>
          </div>
        </div>

        <div className="temple-main">
          <CrowdMeter temple={temple} historyData={crowdHistory} />
          
          <div className="live-updates">
            <h3>📊 Live Updates</h3>
            <div className="updates-grid">
              <div className="update-card">
                <span className="update-label">Crowd Level</span>
                <span className="update-value">
                  {Math.round((temple.currentCrowd / temple.capacity) * 100)}%
                </span>
              </div>
              <div className="update-card">
                <span className="update-label">Queue Status</span>
                <span className="update-value">
                  {temple.queueTime > 60 ? 'Long' : temple.queueTime > 30 ? 'Medium' : 'Short'}
                </span>
              </div>
              <div className="update-card">
                <span className="update-label">Best Time to Visit</span>
                <span className="update-value">
                  {temple.currentCrowd < temple.capacity * 0.4 ? 'Now' : 'Evening'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TempleView;