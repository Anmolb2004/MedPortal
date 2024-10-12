import React from "react";
import Biography from "../components/Biography/Biography.jsx";
import HeadAbout from "../components/HeadAbout/HeadAbout.jsx";
import Testimonials from "../components/Testimonals/Testimonials.jsx";
import Services from "../components/Services/Services.jsx";

const AboutUs = () => {
  return (
    <>
      <HeadAbout
        heading={"Compassionate Care, Exceptional Service"}
        desc={
          "At our hospital, we are dedicated to providing the highest quality of care to our patients. Our experienced team of healthcare professionals is committed to creating a welcoming and supportive environment, ensuring every patient feels valued and heard. With state-of-the-art facilities and innovative treatments, we strive to exceed expectations and promote well-being. Join us in our mission to make healthcare a compassionate experience for all."
        }
        imageUrl={'/aboutUs.png'}
      />
      <Biography imageUrl={"/whoweare.png"} />
      <Services />
      <Testimonials/>
    </>
  );
};

export default AboutUs;
