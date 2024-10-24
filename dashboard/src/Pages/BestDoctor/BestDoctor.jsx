import React from 'react'
import "./BestDoctor.css"

const BestDoctor = ({ doctor }) => {
    
    return (
        <div className="doctor-profile">
          {/* Banner */}
          <div className="Banner">
            
          <h1>Our Best Doctor</h1>
            <img
              src={doctor.docAvatar && doctor.docAvatar.url} // Placeholder image, replace with actual doctor's photo
              alt="Doctor"
              className="doctor-image"
            />
          </div>
    
          {/* Doctor Info Section */}
          <div className="doctor-info">
            <h2>{doctor.firstName} {doctor.lastName}</h2>
            <p><strong>Email:</strong> <em>{doctor.email}</em></p>
            <p><strong>Phone:</strong> <em> {doctor.phone}</em></p>
            <p><strong>Date of Birth:</strong> <em>{doctor.dob}</em> </p>
            <p><strong>Department:</strong> <em>{doctor.doctorDepartment}</em></p>
            <p><strong>NIC:</strong> <em>{doctor.nic}</em></p>
            <p><strong>Gender:</strong> <em>{doctor.gender}</em></p>
          </div>
        </div>
      );
}

export default BestDoctor
