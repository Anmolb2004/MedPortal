import React from "react";
import AppointmentForm from "../components/AppointmentForm.jsx";
import Head from "../components/head/Head.jsx";

const Appointment = () => {
  return (
    <>
      <Head
        imageUrl={"./appointment.Hero.webp"}
        heading={"Book Your Appointment with Ease"}
        desc={
          "Effortlessly schedule your appointments with our intuitive system. Select your preferred time and let us handle the rest, ensuring you get the care you need, when you need it."
        }
      />
      <AppointmentForm />
    </>
  );
};

export default Appointment;
