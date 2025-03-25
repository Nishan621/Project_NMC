import React from 'react';
import '../styles/HomePage.css';
import carouselImage1 from '../assets/carousel-image1.png';
import carouselImage2 from '../assets/carousel-image2.png';
import carouselImage3 from '../assets/carousel-image3.png';
import doctor1 from '../assets/doctor1.png';
import doctor2 from '../assets/doctor2.png';
import doctor3 from '../assets/doctor3.png';

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="carousel">
        <img src={carouselImage1} alt="Medical Clinic" />
        <img src={carouselImage2} alt="Doctors" />
        <img src={carouselImage3} alt="Patients" />
      </div>
      <div className="summary">
        <h1>Welcome to Northern Medical Clinic</h1>
        <p>Your health is our priority. We provide top-notch medical services with a team of experienced doctors and staff.</p>
      </div>
      <div className="clinic-photos">
        <h2>Our Team</h2>
        <img src={doctor1} alt="Doctor 1" />
        <img src={doctor2} alt="Doctor 2" />
        <img src={doctor3} alt="Doctor 3" />
      </div>
    </div>
  );
};

export default HomePage;