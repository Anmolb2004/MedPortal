import React, { useContext } from "react";
import { Context } from "../../main.jsx";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import "./Dashboard.css";
import LineChartAppointments from "../LineChart/LineChart.jsx";
import DoughnutChartAppointments from "../Doughnut/Doughnut.jsx";
import BestDoctor from "../BestDoctor/BestDoctor.jsx";

const Dashboard = ({ appointments, users, doctors, doctor, setAppointments }) => {
  const { isAuthenticated, user } = useContext(Context);

  const handleStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `https://medportal.onrender.com/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );

      // Send email notification for appointment status update
      await axios.post("https://medportal.onrender.com/api/v1/notification/send", {
        email: data.appointment.email, // Adjust this if the email is in a different location
        subject: "Appointment Status Update",
        message: `Your appointment request has been "${status}".`,
      });

      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId ? { ...appointment, status } : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      console.log(error.response);
      toast.error("Failed to update status.");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <section className="dashboard">
        <div className="banner">
          <div className="firstBox">
            <img src="/doc.png" alt="docImg" />
            <div className="content">
              <div>
                <p>Hello, </p>
                <h5>{user && `${user.firstName} ${user.lastName}`}</h5>
              </div>
            </div>
          </div>
          <div className="secondBox">
            <p>Total Appointments</p>
            <h3>{appointments ? appointments.length : 0}</h3>
          </div>
          <div className="thirdBox">
            <p>Registered Users</p>
            <h3>{users ? users.length : 0}</h3>
          </div>
          <div className="fourthBox">
            <p>Registered Doctors</p>
            <h3>{doctors ? doctors.length : 0}</h3>
          </div>
        </div>
        <div className="charts">
          <h2>Hospital Appointments Statistics</h2>
          <div>
            <LineChartAppointments appointments={appointments} />
            <DoughnutChartAppointments appointments={appointments} />
          </div>
        </div>
        <BestDoctor doctor={doctor} />
        <div className="banner">
          <h2>Appointments</h2>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {appointments && appointments.length > 0 ? (
                appointments.map((appointment) => {
                  return (
                    <tr key={appointment._id}>
                      <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                      <td>{`${appointment.appointment_date.substring(0, 16)}`}</td>
                      <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                      <td>{`${appointment.department}`}</td>
                      <td>
                        <select
                          className={
                            appointment.status === "Pending"
                              ? "value-pending"
                              : appointment.status === "Rejected"
                              ? "value-rejected"
                              : appointment.status === "Accepted"
                              ? "value-accepted"
                              : appointment.status === "Completed"
                              ? "value-completed"
                              : "value-notVisited"
                          }
                          value={appointment.status}
                          onChange={(e) =>
                            handleStatus(appointment._id, e.target.value)
                          }
                        >
                          <option value="Pending" className="value-pending">Pending</option>
                          <option value="Accepted" className="value-accepted">Accepted</option>
                          <option value="Rejected" className="value-rejected">Rejected</option>
                          <option value="Completed" className="value-completed">Completed</option>
                          <option value="NotVisited" className="value-notVisited">Not Visited</option>
                        </select>
                      </td>
                      <td>
                        {appointment.hasVisited === true ? (
                          <GoCheckCircleFill className="green" />
                        ) : (
                          <AiFillCloseCircle className="red" />
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <h1>No Appointments</h1>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Dashboard;

