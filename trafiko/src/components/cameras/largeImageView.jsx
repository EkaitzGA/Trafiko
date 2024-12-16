import React from 'react';

const LargeImageView = ({ camera, onClose }) => {
    if (!camera) return null;

    return (
        <div className="large-image-container">
            <button onClick={onClose} className="close-button">
                ✕
            </button>
            <img
                src={camera.urlImage}
                alt={camera.cameraName}
                className="large-camera-image"
            />
            <div className="camera-info">
                <h3>{camera.cameraName}</h3>
                <p><strong>Carretera:</strong> {camera.road}</p>
                <p><strong>Dirección:</strong> {camera.address}</p>
            </div>
        </div>
    );
};

export default LargeImageView;
