import React, { useState, useEffect, useRef } from 'react';
import './Head.css';

const Head = ({ imageUrl, heading, desc }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isback, setIsBack] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setIsBack(true);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true); // Set visible when in view
      } else {
        setIsVisible(false); // Reset when out of view
      }
    }, {
      threshold: 0.1, // Trigger when 10% of the component is visible
    });

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
    <div className={`top ${isback ? 'slide-in-background' : ''}`} ref={ref}>
      {/* Toggle fade-in/out based on isVisible */}
      <div className={`para ${isVisible ? 'fade-in' : 'fade-out'}`}>
        <h3>{heading}</h3>
        <p>{desc}</p>
      </div>
      {/* Toggle slide-in/out for image */}
      <img
        src={imageUrl}
        alt=""
        className={`image ${isVisible ? 'slide-in' : 'slide-out'}`}
      />
    </div>
  );
};

export default Head;
