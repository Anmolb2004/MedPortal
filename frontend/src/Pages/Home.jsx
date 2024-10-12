import React from "react";
import Hero from "../components/Hero/Hero";
import Biography from "../components/Biography/Biography";
import Departments from "../components/Departments/Departments";
import MessageForm from "../components/Message/MessageForm";
import Testimonials from "../components/Testimonals/Testimonials";
import Camp from "../components/Camp/Camp";

const Home = () => {
  return (
    <>
      <Hero
        title={
          "Welcome to the ZeeCare Medical Institue | Your trusted HealthCare Provider"
        }
        imageUrl={"/hero.png"}
      />
      <Biography imageUrl={"/about.png"} />
      <Departments />
      <MessageForm />
      <Testimonials/>
    </>
  );
};

export default Home;