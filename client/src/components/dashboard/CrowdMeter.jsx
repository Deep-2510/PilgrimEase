import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function CrowdMeter({ temple, historyData = [] }) {
  const chartData = {
    labels: historyData.map(item => new Date(item.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Crowd Size',
        data: historyData.map(item => item.crowdCount),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1
      },
      {
        label: 'Wait Time (mins)',
        data: historyData.map(item => item.averageWaitTime),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.1,
        yAxisID: 'y1'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Crowd Size'
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Wait Time (mins)'
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="crowd-meter-detail">
      <h3>{temple.name} - Crowd Analytics</h3>
      <div className="current-stats">
        <div className="stat">
          <span className="stat-label">Current Crowd</span>
          <span className="stat-value">{temple.currentCrowd}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Capacity</span>
          <span className="stat-value">{temple.capacity}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Wait Time</span>
          <span className="stat-value">{temple.queueTime} mins</span>
        </div>
        <div className="stat">
          <span className="stat-label">Utilization</span>
          <span className="stat-value">
            {Math.round((temple.currentCrowd / temple.capacity) * 100)}%
          </span>
        </div>
      </div>
      
      {historyData.length > 0 && (
        <div className="chart-container">
          <Line data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
}

export default CrowdMeter;