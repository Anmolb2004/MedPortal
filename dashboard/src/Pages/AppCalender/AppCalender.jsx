import React, { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import "./AppCalender.css";
import { Navigate } from "react-router-dom";
// import { Context } from "../..";
import PropTypes from "prop-types";

const AppCalendar = ({ appointments }) => {
  const [appointmentsByDate, setAppointmentsByDate] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize with today’s date
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    if (Array.isArray(appointments)) {
      const currentMonthAppointments = getCurrentMonthAppointments(appointments);
      const groupedByDate = groupAppointmentsByDate(currentMonthAppointments);
      setAppointmentsByDate(groupedByDate);
    }
  }, [appointments]);

  const getCurrentMonthAppointments = (appointments) => {
    const now = new Date();
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.appointment_date);
      return (
        appointmentDate.getFullYear() === now.getFullYear() &&
        appointmentDate.getMonth() === now.getMonth()
      );
    });
  };

  const groupAppointmentsByDate = (appointments) => {
    return appointments.reduce((acc, appointment) => {
      const appointmentDate = new Date(appointment.appointment_date);
      const date = appointmentDate.toLocaleDateString("en-CA"); // Format YYYY-MM-DD
      const doctorName = `${appointment.doctor.firstName} ${appointment.doctor.lastName}`;

      if (!acc[date]) acc[date] = [];
      acc[date].push(doctorName);
      return acc;
    }, {});
  };

  const renderTileContent = ({ date }) => {
    const formattedDate = date.toLocaleDateString("en-CA"); // Format YYYY-MM-DD
    const doctors = appointmentsByDate[formattedDate];

    return (
      <div style={{ position: "relative", textAlign: "center" }}>
        {doctors && doctors.length > 0 && <span className="appointment-dot" />}
      </div>
    );
  };

  const handleDateClick = (date) => {
    setSelectedDate(date); // Set the clicked date as the selectedDate
  };

  const isDateDisabled = (date) => {
    const today = new Date();
    return date < today || date.getMonth() !== today.getMonth();
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="calender">
      <Calendar
        tileContent={renderTileContent}
        view="month"
        showNeighboringMonth={false}
        onClickDay={handleDateClick}
        value={selectedDate} // Bind selectedDate to the Calendar component
        activeStartDate={selectedDate} // Focuses the Calendar on selectedDate’s month
      />
      {selectedDate && (
        <div style={{ marginTop: "20px", marginLeft: "100px" }}>
          <h3
            style={{
              color: "red",
              fontSize: "25px",
              fontWeight: "600",
              marginBottom: "10px",
            }}
          >
            Doctors on {selectedDate.toLocaleDateString("en-CA")}:
          </h3>
          <ul>
            {appointmentsByDate[selectedDate.toLocaleDateString("en-CA")]?.map(
              (doctor, idx) => (
                <li
                  key={idx}
                  style={{
                    color: "blue",
                    fontSize: "20px",
                    fontWeight: "600",
                    paddingLeft: "30px",
                  }}
                >
                  {doctor}
                </li>
              )
            ) || (
              <li
                style={{
                  color: "blue",
                  fontSize: "20px",
                  fontWeight: "600",
                  paddingLeft: "30px",
                }}
              >
                No appointments
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

AppCalendar.propTypes = {
  appointments: PropTypes.arrayOf(
    PropTypes.shape({
      appointment_date: PropTypes.string.isRequired,
      doctor: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default AppCalendar;
