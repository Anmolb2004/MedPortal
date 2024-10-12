import React, { useState, useRef, useEffect } from "react";
import "./Departments.css";
// import { useInView } from "react-intersection-observer";

const Departments = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("Orthopedics");
  const [isVisible, setIsVisible] = useState(true);
  const departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl: "/departments/pedia.jpg",
      details:
        "The Pediatrics department specializes in the medical care of infants, children, and adolescents. Our experienced pediatricians provide comprehensive health services, including preventive care, diagnosis, and treatment of childhood illnesses.",
    },
    {
      name: "Orthopedics",
      imageUrl: "/departments/ortho.jpg",
      details:
        "The Orthopedics department focuses on the diagnosis and treatment of musculoskeletal disorders, including bones, joints, ligaments, tendons, and muscles. Our orthopedic surgeons are experts in both surgical and non-surgical treatments.",
    },
    {
      name: "Cardiology",
      imageUrl: "/departments/cardio.jpg",
      details:
        "The Cardiology department is dedicated to diagnosing and treating heart conditions. Our cardiologists offer advanced cardiac imaging, interventional procedures, and personalized care plans to ensure optimal heart health.",
    },
    {
      name: "Neurology",
      imageUrl: "/departments/neuro.jpg",
      details:
        "The Neurology department specializes in disorders of the nervous system, including the brain and spinal cord. Our neurologists provide comprehensive evaluations and innovative treatments for conditions such as epilepsy, stroke, and neurodegenerative diseases.",
    },
    {
      name: "Oncology",
      imageUrl: "/departments/onco.jpg",
      details:
        "The Oncology department offers comprehensive cancer care, including diagnosis, treatment, and supportive services. Our oncologists work closely with patients to develop individualized treatment plans, utilizing the latest advancements in cancer therapy.",
    },
    {
      name: "Radiology",
      imageUrl: "/departments/radio.jpg",
      details:
        "The Radiology department provides advanced imaging services, including X-rays, MRI, CT scans, and ultrasounds. Our radiologists interpret imaging studies to aid in diagnosis and treatment planning for various medical conditions.",
    },
    {
      name: "Physical Therapy",
      imageUrl: "/departments/therapy.jpg",
      details:
        "The Physical Therapy department focuses on rehabilitation and recovery through personalized therapy programs. Our licensed physical therapists help patients regain strength, mobility, and function after injury or surgery.",
    },
    {
      name: "ENT",
      imageUrl: "/departments/ent.jpg",
      details:
        "The ENT (Ear, Nose, and Throat) department specializes in diagnosing and treating conditions related to the ears, nose, and throat. Our ENT specialists offer comprehensive care for hearing loss, sinus issues, allergies, and more.",
    },
    {
      name: "Dermatology",
      imageUrl: "/departments/derma.jpg",
      details:
        "The Dermatology department provides expert care for skin, hair, and nail conditions. Our dermatologists diagnose and treat a variety of skin issues, including acne, eczema, psoriasis, and skin cancer.",
    },
  ];
  const handleDepartmentClick = (departmentName) => {
    setSelectedDepartment(departmentName);
    setIsVisible(false); // Hide details when a new department is selected
    setTimeout(() => {
      setIsVisible(true); // Show details after a short delay
    }, 50); // Adjust timing if necessary
  };

  return (
    <div className={`departments-container`}>
      <div className="sidebar">
        {departmentsArray.map((department, index) => (
          <div
            key={index}
            className={`department-item ${
              selectedDepartment === department.name ? "active" : ""
            }`}
            onClick={() => handleDepartmentClick(department.name)}
          >
            <span>+</span> {department.name}
          </div>
        ))}
      </div>
      <div className={`department-details ${isVisible ? "slide-in" : "slide-out"}`}>
        {selectedDepartment && (
          <div className="details-content">
            <h2>{selectedDepartment}</h2>
            <img
              src={
                departmentsArray.find((dep) => dep.name === selectedDepartment)
                  ?.imageUrl
              }
              alt={selectedDepartment}
            />
            <p>
              {
                departmentsArray.find((dep) => dep.name === selectedDepartment)
                  ?.details
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Departments;
