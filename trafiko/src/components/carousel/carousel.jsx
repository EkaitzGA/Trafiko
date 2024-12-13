import React, { useState, useEffect } from 'react';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './carousel.css';

const CameraCarousel = ({ cameraData, onImageClick}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Actualizar itemsPerView basado en el ancho de la ventana
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // Asegurarse de que currentIndex es válido cuando cambia itemsPerView
  useEffect(() => {
    const maxIndex = Math.max(0, cameraData.length - itemsPerView);
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [itemsPerView, cameraData.length, currentIndex]);

  const nextSlide = () => {
    const maxIndex = Math.max(0, cameraData.length - itemsPerView);
    setCurrentIndex(current => Math.min(current + itemsPerView, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(current => Math.max(0, current - itemsPerView));
  };

  if (!cameraData || cameraData.length === 0) {
    return null;
  }

  // Mostrar flechas solo si hay más items que los visibles
  const canGoNext = currentIndex < cameraData.length - itemsPerView;
  const canGoPrev = currentIndex > 0;
  const showNavigation = cameraData.length > itemsPerView;

  const handleImageClick = (camera, e) => {
    e.preventDefault();
    if (onImageClick) {
      onImageClick(camera);
    }
  };

  return (
    <div className="carousel-container">
      <div className="carousel-inner">
        {showNavigation && canGoPrev && (
          <button
            onClick={prevSlide}
            className="carousel-button carousel-button-prev"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <div className="carousel-slides-container">
          <div 
            className="carousel-slides-wrapper"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              width: `${(100 * cameraData.length) / itemsPerView}%`,
            }}
          >
            {cameraData.map((camera, index) => (
              <div
                key={camera.cameraId}
                className="carousel-slide"
                style={{
                  flex: `0 0 calc(${100 / itemsPerView}% - 0.67rem)`,
                  marginRight: index === cameraData.length - 1 ? '0' : undefined
                }}
              >
                <div 
                className="camera-card"
                onClick={(e) => handleImageClick(camera, e)}
                >
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

        {showNavigation && canGoNext && (
          <button
            onClick={nextSlide}
            className="carousel-button carousel-button-next"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CameraCarousel;