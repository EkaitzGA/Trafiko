import React from "react";
import { Link } from "react-router-dom";
import "./landing-page.css";

const LandingPage = () => {
  return (
    <>
      <h1>Bienvenidos a Trafiko</h1>
      <section className="main-page-section">
        <Link to="/cameras" className="image-container">
          <img
            className="camera-img"
            src="../../assets/camera-card-section.jpeg"
            alt="Cameras"
          />
          <div className="image-text">Cámaras</div>
        </Link>
        <Link to="/incidences" className="image-container">
          <img
            className="incidence-img"
            src="../../assets/incidence-card-section.jpeg"
            alt="Incidencias"
          />
          <div className="image-text">Incidencias</div>
        </Link>
      </section>
    </>
  );
};

export default LandingPage;
