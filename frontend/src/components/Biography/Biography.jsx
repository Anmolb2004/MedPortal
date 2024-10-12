import React, { useRef, useEffect } from "react";
import "./Biography.css";
import { useInView } from "react-intersection-observer";

const Biography = ({ imageUrl }) => {
  const [ref, inView] = useInView({
    threshold: 0.1, // Start the animation when 10% of the section is in view
  });
  const featuresRef = useRef(null);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (featuresRef.current) {
        const scrollWidth = featuresRef.current.scrollWidth;
        const clientWidth = featuresRef.current.clientWidth;
        const currentScroll = featuresRef.current.scrollLeft;
        const nextScrollPosition = currentScroll + clientWidth;

        if (nextScrollPosition + clientWidth >= scrollWidth) {
          featuresRef.current.scrollTo({ left: 0, behavior: "smooth" }); // Go back to the start
        } else {
          featuresRef.current.scrollTo({
            left: nextScrollPosition,
            behavior: "smooth",
          }); // Scroll to next feature
        }
      }
    }, 3000); // Change feature every 3 seconds

    return () => clearInterval(scrollInterval); // Cleanup on component unmount
  }, []);
  return (
    <div className="container biography" ref={ref}>
      <div
        className={`imagebanner ${inView ? "slide-in" : ""}`}
        style={{ backgroundImage: `url('/about.png')` }}
      ></div>

      <div className={`banner ${inView ? "slide-in" : ""}`}>
        <h2>About Us</h2>
        <p>
          Our Hospital Management Software streamlines healthcare operations,
          helping hospitals focus on patient care. With easy-to-use features for
          appointment scheduling, medical records, and administration, we aim to
          simplify healthcare management and enhance efficiency.
        </p>
        <div className="icons" ref={featuresRef}>
          <div className="icon">
            <img src="/emergency.jpeg" alt="" />
            <h4>Emergency</h4>
          </div>
          <div className="icon">
            <img src="/administration.jpeg" alt="" />
            <h4>Administration</h4>
          </div>
          <div className="icon">
            <img src="/appointment.jpeg" alt="" />
            <h4>Appointment</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Biography;
