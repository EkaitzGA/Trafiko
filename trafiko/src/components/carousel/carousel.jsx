import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './carousel.css';

const CameraCarousel = ({ cameraData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + itemsPerView >= cameraData.length ? 0 : prevIndex + itemsPerView
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - itemsPerView < 0 ? Math.max(cameraData.length - itemsPerView, 0) : prevIndex - itemsPerView
    );
  };

  if (!cameraData || cameraData.length === 0) {
    return null;
  }

  return (
    <div className="carousel-container">
      <div className="carousel-inner">
        <button
          onClick={prevSlide}
          className="carousel-button carousel-button-prev"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="carousel-slides-container">
          <div 
            className="carousel-slides-wrapper"
            style={{
              transform: `translateX(-${(currentIndex * (100 / itemsPerView))}%)`,
              width: `${(cameraData.length / itemsPerView) * 100}%`
            }}
          >
            {cameraData.map((camera) => (
              <div
                key={camera.cameraId}
                className="carousel-slide"
              >
                <div className="camera-card">
                  <div className="camera-image-container">
                    <img
                      src={camera.urlImage}
                      alt={camera.cameraName}
                      className="camera-image"
                    />
                  </div>
                  <div className="camera-info">
                    <h3 className="camera-title">
                      {camera.cameraName}
                    </h3>
                    <p className="camera-road">
                      {camera.road}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          className="carousel-button carousel-button-next"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default CameraCarousel;