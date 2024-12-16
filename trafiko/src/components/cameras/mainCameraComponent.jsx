import React, { useEffect, useState } from 'react';
import { apiDataClean } from './apiCallCamera';
import CameraCarousel from '../carousel/carousel';
import CameraPagination from './cameraPagination';
import CameraMapView from './cameraMapView';
import LargeImageView from './largeImageView';
import { convertUTMtoLatLng } from '../../utils/coordinates';
import './cameras.css';

function MainCameraComponent() {
    const [cameraData, setCameraData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCamera, setSelectedCamera] = useState(null);
    const [showLargeImage, setShowLargeImage] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const totalPages = 8;

    useEffect(() => {
        const fetchCameraData = async () => {
            try {
                const cleanedData = await apiDataClean(currentPage);
                setCameraData(cleanedData);
                setIsLoading(false);
            } catch (err) {
                setError(err);
                setIsLoading(false);
            }
        };
        fetchCameraData();
    }, [currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleImageClick = (camera) => {
        setSelectedCamera(camera);
        setShowLargeImage(true);
    };

    if (isLoading) {
        return <div className="orwellian-container">
            <div className="orwellian-loader">
                <div className="eye">
                    <div className="pupil"></div>
                    <div className="eyelid"></div>
                </div>
                <div className="spotlight"></div>
                <div className="text">CÁMARAS CARGANDO</div>
                <div className="scan-lines"></div>
                <div className="tv-effect"></div>
            </div>
        </div>
    }

    if (error) {
        return <div className="error">Error al cargar las cámaras: {error.message}</div>;
    }

    return (
        <div className="cameras-container">
            <CameraPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPrevious={handlePreviousPage}
                onNext={handleNextPage}
            />

            {cameraData.length > 0 ? (
                <div className="content-container">
                    <CameraCarousel
                        cameraData={cameraData}
                        onImageClick={handleImageClick}
                    />

                    {showLargeImage && selectedCamera && (
                        <LargeImageView
                            camera={selectedCamera}
                            onClose={() => setShowLargeImage(false)}
                        />
                    )}

                    <CameraMapView
                        cameraData={cameraData}
                        convertUTMtoLatLng={convertUTMtoLatLng}
                        onCameraClick={handleImageClick}
                    />
                </div>
            ) : (
                <p className="no-cameras">No hay cámaras que mostrar</p>
            )}
        </div>
    );
}

export default MainCameraComponent;