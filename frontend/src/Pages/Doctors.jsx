import React from "react";
import Camp from "../components/Camp/Camp";
import DoctorsPage from "../components/Doctor/Doctor";
import HeadAbout from "../components/HeadAbout/HeadAbout";

const Doctors = () => {
  return (
    <div>
      <HeadAbout
        imageUrl={"./doctorHero.jpeg"}
        heading={"Meet Our Expert Medical Team"}
        desc={
          "Our dedicated team of experienced doctors is here to provide top-notch healthcare with personalized attention. From specialists in orthopedics to pediatricians, each of our experts is committed to ensuring your well-being with compassion and cutting-edge treatments. Trust us with your health, and we'll guide you every step of the way!"
        }
      />
      <DoctorsPage />
      <Camp />
    </div>
  );
};

export default Doctors;
