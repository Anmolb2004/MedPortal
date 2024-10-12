import React, { useState, useEffect } from "react";
import "./Tools.css"; // Make sure to create this CSS file

const advancedHospitalTools = [
  {
    name: "MRI Scanner",
    image: "/Tools/MRI.jpeg",
    description:
      "Magnetic Resonance Imaging (MRI) uses strong magnetic fields and radio waves to create detailed images of organs and tissues inside the body.",
  },
  {
    name: "CT Scanner",
    image: "/Tools/CT.jpeg",
    description:
      "Computed Tomography (CT) scanning combines X-ray images taken from different angles to create cross-sectional images.",
  },
  {
    name: "Ultrasound Machine",
    image: "/Tools/Ultrasound.jpeg",
    description:
      "Ultrasound uses high-frequency sound waves to create images of organs and structures inside the body.",
  },
  {
    name: "Blood Gas Analyzer",
    image: "/Tools/Blood.jpeg",
    description:
      "This tool measures the levels of oxygen and carbon dioxide in the blood, along with blood pH.",
  },
  {
    name: "Telemedicine System",
    image: "/Tools/Telemedicine.jpeg",
    description:
      "Telemedicine technology allows healthcare providers to consult with patients remotely.",
  },
  {
    name: "Robotic Surgical System",
    image: "/Tools/Robot.jpeg",
    description:
      "These advanced systems allow surgeons to perform minimally invasive procedures with enhanced precision.",
  },
  {
    name: "Electronic Health Records (EHR)",
    image: "/Tools/EHR.jpeg",
    description:
      "EHR systems digitally store and manage patient health information.",
  },
  {
    name: "Pulse Oximeter",
    image: "/Tools/Pulse.jpeg",
    description:
      "This non-invasive device measures the oxygen saturation level in a patient's blood.",
  },
  {
    name: "Ventilator",
    image: "/Tools/ventilator.jpeg",
    description:
      "Ventilators assist or take over the breathing process for patients who cannot breathe adequately.",
  },
];
const ToolsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === advancedHospitalTools.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change card every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tools-slider">
      <div
        className="tools-card"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {advancedHospitalTools.map((tool, index) => (
          <div className="tool" key={index}>
            <img src={tool.image} alt={tool.name} className="tool-image" />
            <div className="tool-details">
              <h3>{tool.name}</h3>
              <p>{tool.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsSlider;
