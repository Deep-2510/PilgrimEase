import React from 'react';
import { EMERGENCY_TYPES } from '../../utils/constants';

function EmergencyAlert({ emergency }) {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 border-red-500 text-red-700';
      case 'high': return 'bg-orange-100 border-orange-500 text-orange-700';
      case 'medium': return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      default: return 'bg-blue-100 border-blue-500 text-blue-700';
    }
  };

  return (
    <div className={`emergency-alert border-l-4 p-4 mb-3 ${getSeverityColor(emergency.severity)}`}>
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold">
            🚨 {EMERGENCY_TYPES[emergency.type] || emergency.type}
          </h4>
          <p className="text-sm">{emergency.location}</p>
          {emergency.description && (
            <p className="text-sm mt-1">{emergency.description}</p>
          )}
        </div>
        <span className={`severity-badge severity-${emergency.severity}`}>
          {emergency.severity}
        </span>
      </div>
      <div className="text-xs mt-2 text-gray-600">
        Reported {new Date(emergency.createdAt).toLocaleTimeString()}
      </div>
    </div>
  );
}

export default EmergencyAlert;