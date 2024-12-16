import React, { useState } from 'react';
import { apiDataClean } from './apiCallCamera';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import CameraCarousel from '../carousel/carousel';
import { Link } from 'react-router-dom';
import './cameras.css';

function CameraMap() {
    const [cameraData, setCameraData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCamera, setSelectedCamera] = useState(null);
    const [showLargeImage, setShowLargeImage] = useState(false);
    const totalPages = 8;

    const convertUTMtoLatLng = (northing, easting) => {
        try {
            const north = parseFloat(northing);
            const east = parseFloat(easting);

            if (isNaN(north) || isNaN(east)) {
                console.error('Coordenadas UTM inválidas');
                return null;
            }

            const a = 6378137.0;
            const f = 1 / 298.257223563;
            const k0 = 0.9996;
            const FE = 500000.0;

            const e2 = 2 * f - f * f;
            const n = f / (2 - f);
            const n2 = n * n;
            const n3 = n2 * n;
            const n4 = n3 * n;

            const x = east - FE;
            const y = north;
            const lambda0 = -3 * Math.PI / 180.0;
            const M = y / k0;
            const mu = M / (a * (1 - e2 / 4 - 3 * e2 * e2 / 64 - 5 * e2 * e2 * e2 / 256));

            const phi1 = mu + (3 * n / 2 - 27 * n3 / 32) * Math.sin(2 * mu) +
                (21 * n2 / 16 - 55 * n4 / 32) * Math.sin(4 * mu) +
                (151 * n3 / 96) * Math.sin(6 * mu) +
                (1097 * n4 / 512) * Math.sin(8 * mu);

            const sin_phi = Math.sin(phi1);
            const cos_phi = Math.cos(phi1);
            const tan_phi = sin_phi / cos_phi;

            const ep2 = e2 / (1 - e2);
            const N = a / Math.sqrt(1 - e2 * sin_phi * sin_phi);
            const R = N * (1 - e2) / (1 - e2 * sin_phi * sin_phi);

            const dd = x / (N * k0);
            const d2 = dd * dd;
            const d3 = d2 * dd;
            const d4 = d3 * dd;
            const d5 = d4 * dd;
            const d6 = d5 * dd;

            let lat = phi1 - (tan_phi * d2 / (2 * R * N)) *
                (1 - d2 / 12 * (5 + 3 * tan_phi * tan_phi + ep2 * (1 - 9 * tan_phi * tan_phi)));

            let lon = lambda0 + (dd - d3 / 6 * (1 + 2 * tan_phi * tan_phi) +
                d5 / 120 * (5 - 28 * tan_phi * tan_phi + 24 * Math.pow(tan_phi, 4))) / cos_phi;

            lat = lat * 180 / Math.PI;
            lon = lon * 180 / Math.PI;

            return [lat, lon];
        } catch (error) {
            console.error('Error en la conversión UTM:', error);
            return null;
        }
    };

    const handleFetchData = async () => {
        const data = await apiDataClean(currentPage);
        setCameraData(data);
        setSelectedCamera(null); // Limpiar la cámara seleccionada
    };

    const handleNextPage = async () => {
        if (currentPage < totalPages) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            const data = await apiDataClean(nextPage);
            setCameraData(data);
            setSelectedCamera(null); // Limpiar la cámara seleccionada
        }
    };

    const handlePreviousPage = async () => {
        if (currentPage > 1) {
            const previousPage = currentPage - 1;
            setCurrentPage(previousPage);
            const data = await apiDataClean(previousPage);
            setCameraData(data);
            setSelectedCamera(null); // Limpiar la cámara seleccionada
        }
    };
    const handleImageClick = (camera) => {
        setSelectedCamera(camera);
        setShowLargeImage(true);
    };
    return (
        <div className="cameras-container">
            <div className="button-container">
                <button onClick={handleFetchData} className="fetch-button">
                    Mostrar cámaras de Bizkaia
                </button>                
            </div>

            <div className="pagination-container">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="pagination-button"
                >
                    Página anterior
                </button>
                <span className="page-indicator">Página: {currentPage}/{totalPages}</span>
                {currentPage < totalPages && (
                    <button onClick={handleNextPage} className="pagination-button">
                        Siguiente página
                    </button>
                )}
            </div>

            {cameraData.length > 0 ? (
                <div className="content-container">
                    <CameraCarousel
                        cameraData={cameraData}
                        onImageClick={handleImageClick}
                    />

                    {showLargeImage && selectedCamera && (
                        <div className="large-image-container">
                            <button
                                onClick={() => setShowLargeImage(false)}
                                className="close-button"
                            >
                                ✕
                            </button>
                            <img
                                src={selectedCamera.urlImage}
                                alt={selectedCamera.cameraName}
                                className="large-camera-image"
                            />
                            <div className="camera-info">
                                <h3>{selectedCamera.cameraName}</h3>
                                <p><strong>Carretera:</strong> {selectedCamera.road}</p>
                                <p><strong>Dirección:</strong> {selectedCamera.address}</p>
                            </div>
                        </div>
                    )}
                    <div className="map-container">
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
                                                click: () => handleImageClick(camera)
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
                </div>
            ) : (
                <p className="no-cameras">No hay cámaras que mostrar</p>
            )}
        </div>
    );
}

export default CameraMap;