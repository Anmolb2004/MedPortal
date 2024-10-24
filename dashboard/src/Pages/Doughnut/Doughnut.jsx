import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChartAppointments = ({ appointments }) => {
  const statusCounts = appointments.reduce((acc, appointment) => {
    const status = appointment.status;
    acc[status] = acc[status] ? acc[status] + 1 : 1;
    return acc;
  }, {
    Accepted: 0,
    Rejected: 0,
    Completed: 0,
    notVisited: 0,
    Pending: 0
  });

  const data = {
    labels: ['Accepted', 'Rejected', 'Completed', 'Not Visited', 'Pending'],
    datasets: [
      {
        data: [
          statusCounts.Accepted, 
          statusCounts.Rejected, 
          statusCounts.Completed, 
          statusCounts.notVisited, 
          statusCounts.Pending
        ],
        backgroundColor: ['#4caf50', '#f44336', '#2196f3', '#ff9800', '#9e9e9e'],
        hoverBackgroundColor: ['#388e3c', '#d32f2f', '#1976d2', '#f57c00', '#757575'],
        borderWidth: 1,
      },
    ],
  };

  return (
      <Doughnut data={data} />
  );
};

export default DoughnutChartAppointments;
