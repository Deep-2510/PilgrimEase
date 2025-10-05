import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import TempleCard from '../components/dashboard/TempleCard';
import CrowdMeter from '../components/dashboard/CrowdMeter';
import EmergencyAlert from '../components/dashboard/EmergencyAlert';
import { getTemples } from '../services/api';
import { TEMPLES } from '../utils/constants';
import Loading from '../components/common/Loading';

function Dashboard() {
  const { state, dispatch } = useApp();
  const [selectedTemple, setSelectedTemple] = useState(null);

  useEffect(() => {
    loadTemples();
  }, []);

  const loadTemples = async () => {
    try {
      const response = await getTemples();
      dispatch({ type: 'SET_TEMPLES', payload: response.data });
    } catch (error) {
      console.error('Error loading temples:', error);
      // Fallback to static data
      dispatch({ type: 'SET_TEMPLES', payload: TEMPLES });
    }
  };

  if (state.loading && state.temples.length === 0) {
    return <Loading />;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Pilgrimage Crowd Management</h1>
        <p>Real-time crowd monitoring and management for Gujarat's major temples</p>
      </div>

      <div className="dashboard-alerts">
        {state.emergencies.slice(0, 3).map(emergency => (
          <EmergencyAlert key={emergency._id} emergency={emergency} />
        ))}
      </div>

      <div className="dashboard-content">
        <div className="temples-grid">
          {state.temples.map(temple => (
            <TempleCard
              key={temple._id || temple.id}
              temple={temple}
              crowdData={state.crowdData[temple._id] || state.crowdData[temple.id]}
              onSelect={setSelectedTemple}
            />
          ))}
        </div>

        {selectedTemple && (
          <div className="selected-temple-details">
            <CrowdMeter temple={selectedTemple} />
          </div>
        )}
      </div>
      

      <div className="quick-actions">
        <Link to="/emergency" className="emergency-btn">
          🚨 Emergency Assistance
        </Link>
        <Link to="/admin" className="admin-btn">
          📊 Admin Dashboard
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;