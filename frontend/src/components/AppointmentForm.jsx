import React, { useContext, useEffect, useState, useRef } from "react";
import { Context } from "../main.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AppointmentForm = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNice] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [hasVisited, setHasVisited] = useState("");
  const [address, setAddress] = useState("");

  const formRef = useRef(null); // Create a ref to track the AppointmentForm
  const [scaleEffect, setScaleEffect] = useState(false);

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "ENT",
    "Dermatology",
  ];

  const navigateTo = useNavigate();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        "https://medportal.onrender.com/api/v1/user/doctors",
        { withCredentials: true }
      );
      setDoctors(data.doctors);
    };
    fetchDoctors();

    // Using IntersectionObserver for scroll detection and scaling effect
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setScaleEffect(true); // Trigger the scale-up effect
          } else {
            setScaleEffect(false); // Remove the scale-up effect
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the component is visible
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    // Cleanup the observer when component unmounts
    return () => {
      if (formRef.current) observer.unobserve(formRef.current);
    };
  }, []);

  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const hasVisitedBool = Boolean(hasVisited);
      const { data } = await axios.post(
        "https://medportal.onrender.com/api/v1/appointment/post",
        {
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          appointment_date: appointmentDate,
          department,
          address,
          hasVisited: hasVisitedBool,
          doctor_firstName: doctorFirstName,
          doctor_lastName: doctorLastName,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div
      className={`form-component appointment-form ${
        scaleEffect ? "scale-up" : ""
      }`}
      ref={formRef} // Attach the ref to the form container
    >
      <div className="imageContain">
        <img src={"./appointmentForm.jpg"} alt="" />
      </div>
      <form onSubmit={handleAppointment}>
        <div>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <input
            type="number"
            placeholder="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></input>
          <input
            type="number"
            placeholder="NIC"
            value={nic}
            onChange={(e) => setNice(e.target.value)}
          ></input>
          <input
            type="date"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          ></input>
        </div>
        <div>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="date"
            placeholder="Appointment Date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
        </div>
        <div>
          <select
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setDoctorFirstName("");
              setDoctorLastName("");
            }}
          >
            <option value="">Select Department</option>
            {departmentsArray.map((depart, index) => (
              <option value={depart} key={index}>
                {depart}
              </option>
            ))}
          </select>

          <select
            value={`${doctorFirstName} ${doctorLastName}`}
            onChange={(e) => {
              const [firstName, lastName] = e.target.value.split(" ");
              setDoctorFirstName(firstName);
              setDoctorLastName(lastName);
            }}
            disabled={!department}
          >
            <option value="">Select Doctor</option>
            {doctors
              .filter((doctor) => doctor.doctorDepartment === department)
              .map((doctor, index) => (
                <option
                  value={`${doctor.firstName} ${doctor.lastName}`}
                  key={index}
                >
                  {doctor.firstName} {doctor.lastName}
                </option>
              ))}
          </select>
        </div>
        <textarea
          rows={10}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        ></textarea>
        <div
          style={{
            gap: "10px",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 0 }}>Have you Visited Before?</p>
          <input
            type="checkbox"
            checked={hasVisited}
            onChange={(e) => setHasVisited(e.target.checked)}
            style={{ flex: "none", width: "25px" }}
          />
        </div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Book Appointment</button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
