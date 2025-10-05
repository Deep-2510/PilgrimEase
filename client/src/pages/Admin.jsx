import React, { useState } from 'react';

function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = {
    totalVisitors: 12500,
    currentCrowd: 3200,
    emergencies: 12,
    avgWaitTime: 45
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>⚙️ Admin Dashboard</h1>
        <p>Temple Management System</p>
      </div>

      <div className="admin-tabs">
        <button 
          className={activeTab === 'dashboard' ? 'active' : ''}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Dashboard
        </button>
        <button 
          className={activeTab === 'crowd' ? 'active' : ''}
          onClick={() => setActiveTab('crowd')}
        >
          👥 Crowd Management
        </button>
        <button 
          className={activeTab === 'emergencies' ? 'active' : ''}
          onClick={() => setActiveTab('emergencies')}
        >
          🚨 Emergencies
        </button>
        <button 
          className={activeTab === 'settings' ? 'active' : ''}
          onClick={() => setActiveTab('settings')}
        >
          ⚙️ Settings
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard-tab">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Visitors Today</h3>
                <div className="stat-value">{stats.totalVisitors.toLocaleString()}</div>
              </div>
              <div className="stat-card">
                <h3>Current Crowd</h3>
                <div className="stat-value">{stats.currentCrowd.toLocaleString()}</div>
              </div>
              <div className="stat-card">
                <h3>Active Emergencies</h3>
                <div className="stat-value">{stats.emergencies}</div>
              </div>
              <div className="stat-card">
                <h3>Avg Wait Time</h3>
                <div className="stat-value">{stats.avgWaitTime} mins</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'crowd' && (
          <div className="crowd-tab">
            <h3>Crowd Management</h3>
            <p>Crowd monitoring and control features will be implemented here.</p>
          </div>
        )}

        {activeTab === 'emergencies' && (
          <div className="emergencies-tab">
            <h3>Emergency Management</h3>
            <p>Emergency response and monitoring features will be implemented here.</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-tab">
            <h3>System Settings</h3>
            <p>Temple configuration and system settings will be implemented here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;