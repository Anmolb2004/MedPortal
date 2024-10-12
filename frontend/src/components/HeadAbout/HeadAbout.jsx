import React , { useState, useEffect, useRef } from "react";
import "./HeadAbout.css";

const HeadAbout = ({heading, desc, imageUrl}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isback, setIsBack] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setIsBack(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Set visible when in view
        } else {
          setIsVisible(false); // Reset when out of view
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the component is visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  return (
    <div
      className={`AboutTop ${isback ? "slide-in-background" : ""}`}
      ref={ref}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {/* Toggle fade-in/out based on isVisible */}
      <div className={`AboutPara ${isVisible ? "fade-in" : "fade-out"}`}>
        <h3>{heading}</h3>
        <p>{desc}</p>
      </div>
      {/* Toggle slide-in/out for image */}
    </div>
  );
};

export default HeadAbout;
