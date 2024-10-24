import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { Context } from "../../index.js";
import axios from "axios";
import { Navigate } from "react-router-dom";
import "./Doctors.css";

const Doctors = ({doctors}) => {
  const { isAuthenticated } = useContext(Context);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="doctors-page page">
      <h1>Our Doctors</h1>
      <div className="doctors-grid">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            <img
              src={doctor.docAvatar && doctor.docAvatar.url}
              className="doctor-img"
              alt="Doctor Avatar"
            />
            <h2 className="doctor-name">{doctor.name}</h2>
            <div className="doctor-details">
              <p>
                <strong>Email:</strong> {doctor.email}
              </p>
              <p>
                <strong>Phone:</strong> {doctor.phone}
              </p>
              <p>
                <strong>Date of Birth:</strong> {doctor.dob.substr(0, 10)}
              </p>
              <p>
                <strong>Department:</strong> {doctor.doctorDepartment}
              </p>
              <p>
                <strong>NIC:</strong> {doctor.nic}
              </p>
              <p>
                <strong>Gender:</strong> {doctor.gender}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
