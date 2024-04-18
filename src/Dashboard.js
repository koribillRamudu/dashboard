import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const MessageContainer = styled.div`
  text-align: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
`;

const ChartContainer = styled.div`
  max-width: 800%;
  margin-top: 20px;
`;

const StatusList = styled.div`
  margin-top: 40px;
  padding-right: -120px;
`;

const StatusListItem = styled.li`
  margin-bottom: 10px;
  padding-right: 130px;
  font-size: 18px;
  color: ${props => props.color};
`;

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [statusCounts, setStatusCounts] = useState({ pending: 0, denied: 0, success: 0 });
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
          data: [statusCounts.pending, statusCounts.denied, statusCounts.success],
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
  }, [statusCounts]); // Re-render chart when statusCounts change

  useEffect(() => {
    setStatusCounts(getStatusCounts());
  }, [applications]); // Update statusCounts when applications change

  const getStatusCounts = () => {
    let pendingCount = 0;
    let deniedCount = 0;
    let successCount = 0;
    
    applications.forEach(application => {
      if (application.status === 'pending') {
        pendingCount++;
      } else if (application.status === 'denied') {
        deniedCount++;
      } else if (application.status === 'success') {
        successCount++;
      }
    });

    return { pending: pendingCount, denied: deniedCount, success: successCount };
  };

  return (
    <DashboardContainer>
      <MessageContainer>
        <h1>Dashboard</h1>
        <ChartContainer>
          <canvas id="statusPieChart"></canvas>
        </ChartContainer>
        <StatusList>
          <h2>Status Count</h2>
          <ul>
            <StatusListItem color="#FFA500">Pending: {statusCounts.pending}</StatusListItem>
            <StatusListItem color="#FF0000">Denied: {statusCounts.denied}</StatusListItem>
            <StatusListItem color="green">Success: {statusCounts.success}</StatusListItem>
          </ul>
        </StatusList>
      </MessageContainer>
    </DashboardContainer>
  );
}

export default Dashboard;
