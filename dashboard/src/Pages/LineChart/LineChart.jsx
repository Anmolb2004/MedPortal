import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChartAppointments = ( {appointments} ) => {
  const [chartData, setChartData] = useState({});
  // console.log(appointments);

  useEffect(() => {
    const processAppointmentData = () => {
      const currentDate = new Date();
      const lastFiveMonths = [];

      for (let i = 4; i >= 0; i--) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        lastFiveMonths.push(date.toISOString().slice(0, 7));
      }
      

      const appointmentCounts = lastFiveMonths.map((month) => {
        return appointments.filter((appointment) => {
          const appointmentMonth = appointment.appointment_date.slice(0, 7); 
          // console.log(appointmentMonth);
          
          return appointmentMonth === month;
        }).length;
      });

      setChartData({
        labels: lastFiveMonths,
        datasets: [
          {
            label: 'Number of Appointments',
            data: appointmentCounts,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.4,
          },
        ],
      });
    };

    processAppointmentData();
  }, [appointments]);
  if (!appointments || appointments.length === 0) {
    return <div>Loading...</div>;
  }
  return (
      <Line data={chartData} />
  );
};

export default LineChartAppointments;