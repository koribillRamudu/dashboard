import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:5000/applicationsData')
      .then(response => {
        setApplications(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (chartRef.current !== null) {
      // Destroy the existing chart
      chartRef.current.destroy();
    }

    // Draw a new pie chart
    const ctx = document.getElementById('statusPieChart');
    const newChartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Pending', 'Denied', 'Success'],
        datasets: [{
          data: getStatusCounts(),
          backgroundColor: ['#FFA500', '#FF0000', 'green'],
          hoverBackgroundColor: ['#FFA500', '#FF0000', 'green']
        }]
      },
      options: {
        responsive: true
      }
    });

    // Store the chart instance in the ref
    chartRef.current = newChartInstance;
  }, [applications]); // Re-render chart when applications change

  const getStatusCounts = () => {
    const counts = { pending: 0, denied: 0, success: 0 };
    applications.forEach(application => {
      counts[application.status]++;
    });
    return [counts.pending, counts.denied, counts.success];
  };

  return (
    <div className="center-container">
      <div className="message-container">
        <center><h1>Dashboard</h1></center>
        <div className="chart-container" style={{ maxWidth: '400px', margin: 'auto' }}>
          <canvas id="statusPieChart" style={{ width: '100%', height: 'auto' }}></canvas>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;