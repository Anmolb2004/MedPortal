import React from 'react';
import './Camp.css';

const Camp = () => {
  return (
    <section className="camp-section">
    <h2 className="camp-heading">Our Medical Camp</h2>
    <div className="camp-collage">
      <div className="camp-image image1" style={{ backgroundImage: `url('./camp1.jpeg')` }}></div>
      <div className="camp-row">
        <div className="camp-image image2" style={{ backgroundImage: `url('./camp2.jpeg')` }}></div>
        <div className="camp-image image3" style={{ backgroundImage: `url('./camp3.jpeg')` }}></div>
      </div>
      <div className="camp-image image4" style={{ backgroundImage: `url('./camp4.jpeg')` }}></div>
    </div>
  </section>
  );
};

export default Camp;
