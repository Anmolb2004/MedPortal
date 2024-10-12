import React from "react";
import "./Services.css";
import ServiceItem from "../ServiceItem/ServiceItem";

const services = [
    {
      icon: "./tooth.jpeg",
      title: 'Dental Care',
      description: 'Our dental care services focus on preventive and restorative care to ensure the health of your teeth and gums. From cleanings to advanced procedures, we’ve got you covered.',
    },
    {
      icon: "./eye.jpeg",
      title: 'Vision Care',
      description: 'Our experienced eye care professionals provide comprehensive exams and treatments to keep your vision sharp and your eyes healthy.',
    },
    {
      icon: "./surgery.jpeg",
      title: 'Oral Surgery',
      description: 'We provide specialized oral surgery services to address complex dental issues, ensuring a comfortable and effective treatment process.',
    },
    {
      icon: "./pediatrician.jpeg",
      title: 'Pediatric Care',
      description: 'We offer specialized care for children’s health, from dental check-ups to eye exams, ensuring their well-being at every stage.',
    },
  ];
const Services = () => {
  return (
    <div className="services">
      <h2>Our Services</h2>
      <div className="services-wrapper">
        <div className="render">
          {services.slice(0, 2).map((service, index) => (
            <ServiceItem key={index} {...service} />
          ))}
        </div>
        <div className="doctor-image">
          <img src="./Services.webp" alt="Doctor" />
        </div>
        <div className="render">
          {services.slice(2).map((service, index) => (
            <ServiceItem key={index} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
