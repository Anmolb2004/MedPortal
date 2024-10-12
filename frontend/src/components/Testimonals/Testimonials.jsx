import React, { useEffect, useState } from 'react';
import './Testimonials.css'; // Import the CSS file for styles

const testimonialsData = [
    {
        quote: "I had a great experience! The staff was very attentive.",
        name: "John Doe",
        role: "PATIENT",
        img:"./Homepage_testi.png"
    },
    {
        quote: "The service was excellent. I felt cared for throughout my visit.",
        name: "Jane Smith",
        role: "PATIENT",
        img:"./team1.png"
    },
    {
        quote: "Highly recommend! The team was professional and kind.",
        name: "Michael Brown",
        role: "PATIENT",
        img:"./team2.png"
    },
    {
        quote: "Exceptional care! Every staff member was so supportive.",
        name: "Emily Johnson",
        role: "PATIENT",
        img:"./Homepage_testi.png"
    },
    {
        quote: "The facilities are top-notch, the staff is very professional.",
        name: "Chris Evans",
        role: "PATIENT",
        img:"./team1.png"
    }
];

const Testimonials = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
        }, 5000); // Change testimonial every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const currentTestimonials = [
        testimonialsData[index % testimonialsData.length],
        testimonialsData[(index + 1) % testimonialsData.length],
        testimonialsData[(index + 2) % testimonialsData.length]
    ];

    return (
        <section id="testimonials" className="testimonials-section" style={{backgroundImage: `url(./testimonial.jpeg)`}}>
            <div>
                <h2 className="testimonials-heading">What Our Patients Say</h2>
                <div className="row">
                    {currentTestimonials.map((testimonial, idx) => (
                        <div className={`testimonial-container ${idx === 0 ? 'slide-out' : ''} ${idx === 1 ? 'slide-in-active' : 'slide-in'}`} key={idx}>
                            <div className="testimonialImage">
                                <img src={testimonial.img} alt="Image" />
                            </div>
                            <div className="testimonial">
                                <p>{testimonial.quote}</p>
                                <h5>{testimonial.name}</h5>
                                <span>{testimonial.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
