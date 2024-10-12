import React from "react";
import HeadAbout from "../components/HeadAbout/HeadAbout";
import Depart from "../components/Depart/Depart";
import Tools from "../components/Tools/Tools";

const Department = () => {
  return (
    <div>
      <HeadAbout
        imageUrl={"./departmentsHero.jpeg"}
        heading={"Our Specialized Departments"}
        desc={
          "At the heart of our healthcare services are our expert-led departments, each dedicated to providing comprehensive and personalized care. From diagnosis to treatment, our multidisciplinary teams work together to ensure the best outcomes for every patient."
        }
      />
      <Depart/>
      <Tools/>
    </div>
  );
};

export default Department;
