import React, { useState, useEffect } from "react";
import "./Doctor.css";
import {toast} from "react-toastify"
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faGoogle,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons"; // for social icons

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "https://medportal.onrender.com/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="doctors-section">
        <h1>Our Doctors</h1>
      <div className="container">
        {doctors.map((doctor) => (
          <div className="doctor-card" key={doctor._id}>
            <img
              src={doctor.docAvatar.url}
              alt={`${doctor.firstName} ${doctor.lastName}`}
            />
            <h3>
              {doctor.firstName} {doctor.lastName}
            </h3>
            <p className="specialty">{doctor.doctorDepartment}</p>
            <p>{doctor.gender}</p>
            <div className="social-icons">
              {/* Add social links here if needed */}
              <a href="#">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faGoogle} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsPage;
