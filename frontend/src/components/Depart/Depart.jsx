import React, { useState } from "react";
import "./Depart.css"; // External CSS

const departmentsArray = [
  {
    name: "Pediatrics",
    logo: "./pediaIcon.jpeg",
    imageUrl: "/departments/pedia.jpg",
    details:
      "The Pediatrics department specializes in the medical care of infants, children, and adolescents. Our experienced pediatricians provide comprehensive health services, including preventive care, diagnosis, and treatment of childhood illnesses.",
  },
  {
    name: "Orthopedics",
    logo: "./orthoIcon.jpeg",
    imageUrl: "/departments/ortho.jpg",
    details:
      "The Orthopedics department focuses on the diagnosis and treatment of musculoskeletal disorders, including bones, joints, ligaments, tendons, and muscles. Our orthopedic surgeons are experts in both surgical and non-surgical treatments.",
  },
  {
    name: "Cardiology",
    logo: "./cardioIcon.jpeg",
    imageUrl: "/departments/cardio.jpg",
    details:
      "The Cardiology department is dedicated to diagnosing and treating heart conditions. Our cardiologists offer advanced cardiac imaging, interventional procedures, and personalized care plans to ensure optimal heart health.",
  },
  {
    name: "Neurology",
    logo: "./neuroIcon.jpeg",
    imageUrl: "/departments/neuro.jpg",
    details:
      "The Neurology department specializes in disorders of the nervous system, including the brain and spinal cord. Our neurologists provide comprehensive evaluations and innovative treatments for conditions such as epilepsy, stroke, and neurodegenerative diseases.",
  },
  {
    name: "Oncology",
    logo: "./oncoIcon.jpeg",
    imageUrl: "/departments/onco.jpg",
    details:
      "The Oncology department offers comprehensive cancer care, including diagnosis, treatment, and supportive services. Our oncologists work closely with patients to develop individualized treatment plans, utilizing the latest advancements in cancer therapy.",
  },
  {
    name: "Radiology",
    logo: "./radioIcon.jpeg",
    imageUrl: "/departments/radio.jpg",
    details:
      "The Radiology department provides advanced imaging services, including X-rays, MRI, CT scans, and ultrasounds. Our radiologists interpret imaging studies to aid in diagnosis and treatment planning for various medical conditions.",
  },
  {
    name: "Physiotherapy",
    logo: "./physiIcon.jpeg",
    imageUrl: "/departments/therapy.jpg",
    details:
      "The Physical Therapy department focuses on rehabilitation and recovery through personalized therapy programs. Our licensed physical therapists help patients regain strength, mobility, and function after injury or surgery.",
  },
  {
    name: "Ear Nose Th",
    logo: "./entIcon.jpeg",
    imageUrl: "/departments/ent.jpg",
    details:
      "The ENT (Ear, Nose, and Throat) department specializes in diagnosing and treating conditions related to the ears, nose, and throat. Our ENT specialists offer comprehensive care for hearing loss, sinus issues, allergies, and more.",
  },
  {
    name: "Dermatology",
    logo: "./dermaIcon.jpeg",
    imageUrl: "/departments/derma.jpg",
    details:
      "The Dermatology department provides expert care for skin, hair, and nail conditions. Our dermatologists diagnose and treat a variety of skin issues, including acne, eczema, psoriasis, and skin cancer.",
  },
];

const Depart = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(departmentsArray[0]);

  const selectDepartment = (department) => {
    setSelectedDepartment(department);
  };

  return (
    <div className="departContainer">
      <div className="departments-header">
        <h2>Our Medical Services</h2>
      </div>

      <div className="departments-row">
        {departmentsArray.map((dept) => (
          <div
            key={dept.name}
            className={`department-card ${selectedDepartment.name === dept.name ? "active" : ""}`}
            onClick={() => selectDepartment(dept)}
          >
            <img src={dept.logo} alt={dept.name} className="department-icon" />
            <p>{dept.name}</p>
          </div>
        ))}
      </div>

      <div className="department-info">
        <div className="info-text">
          <h3>{selectedDepartment.name}</h3>
          <p>{selectedDepartment.details}</p>
          <a href="/appointment" className="appointment-btn">
            Appointment
          </a>
        </div>
        <div className="info-image" style={{backgroundImage: `url(${selectedDepartment.imageUrl})`}}>
        </div>
      </div>
    </div>
  );
};

export default Depart;
