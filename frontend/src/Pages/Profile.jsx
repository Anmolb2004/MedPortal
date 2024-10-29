import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./Profile.css";
import { Context } from "../main.jsx";

const Profile = () => {
  const { isAuthenticated, user } = useContext(Context);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchAppointments = async () => {
        try {
          const response = await axios.get(
            "https://medportal.onrender.com/api/v1/appointment/userappointments",
            { withCredentials: true }
          );
          setAppointments(response.data.appointments);
        } catch (error) {
          console.error("Error fetching appointments", error);
        } finally {
          setLoading(false);
        }
      };
      fetchAppointments();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <div>Please log in to view your profile.</div>;
  }

  if (loading) {
    return <div>Loading appointments...</div>;
  }

  const handlePayment = (appointmentId) => {
    // Add your payment handling logic here
    console.log(`Initiate payment for appointment ID: ${appointmentId}`);
  };

  return (
    <div className="profile-container">
      <h1>Welcome, {user.name}</h1>
      <h2>Your Appointment History</h2>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Doctor</th>
            <th>Status</th>
            <th>Action</th> {/* Add an Action column */}
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{new Date(appointment.appointment_date).toLocaleDateString()}</td>
                <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                <td
                  className={
                    appointment.status === "Accepted"
                      ? "status-accepted"
                      : appointment.status === "Rejected"
                      ? "status-rejected"
                      : "status-pending"
                  }
                >
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </td>
                <td>
                  {appointment.status === "Accepted" && (
                    <button onClick={() => handlePayment(appointment._id)} className="payment-button">
                      Pay Now
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No appointments found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Profile;


