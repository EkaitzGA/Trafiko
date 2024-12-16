import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const CameraMapView = ({ cameraData, convertUTMtoLatLng, onCameraClick }) => {
    return (
        <div className="map-container">
            <h2>Haz click sobre los marcadores del mapa para visualizar una cámara</h2>
            <MapContainer
                center={[43.26271, -2.92528]}
                zoom={10}
                className="map"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {cameraData
                    .filter(camera => camera.latitude && camera.longitude)
                    .map(camera => {
                        const latLng = convertUTMtoLatLng(camera.latitude, camera.longitude);
                        return latLng ? (
                            <Marker
                                key={camera.cameraId}
                                position={latLng}
                                eventHandlers={{
                                    click: () => onCameraClick(camera)
                                }}
                            >
                                <Popup>
                                    <div className="popup-content">
                                        <strong>{camera.cameraName}</strong>
                                        <br />
                                        {camera.road}
                                        <br />
                                        {camera.address}
                                    </div>
                                </Popup>
                            </Marker>
                        ) : null;
                    })}
            </MapContainer>
        </div>
    );
};

export default CameraMapView;
