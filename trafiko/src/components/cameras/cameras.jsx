import React, { useState } from 'react'
import { apiDataClean } from './apiCallCamera'


function CameraList() {
    const [cameraData, setCameraData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 8;
    const handleFetchData = async () => {
        const data = await apiDataClean(currentPage);
        setCameraData(data);
    }
    const handleNextPage = async () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        const data = await apiDataClean(nextPage);
        setCameraData(data);
    };

    const handlePreviousPage = async () => {
        if (currentPage > 1) {
            const previousPage = currentPage - 1;
            setCurrentPage(previousPage);
            const data = await apiDataClean(previousPage);
            setCameraData(data);
        }
    };
    return (
        <>
            <button onClick={handleFetchData}>Mostrar cámaras de Bizkaia</button>
            <div>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Página anterior
                </button>
                <span>Página: {currentPage}/{totalPages}</span>
                {currentPage < totalPages && (<button onClick={handleNextPage}>Siguiente página</button>
                )}

            </div>
            <div>
                {cameraData.length > 0 ? (
                    <>
                        <ul>
                            {cameraData.map((camera, index) => (
                                <li key={index}>
                                    <p> <strong>Nombre:</strong> {camera.cameraName}</p>
                                    <p><strong>Carretera:</strong> {camera.road} </p>
                                    <p><strong>Dirección:</strong> {camera.address}</p>
                                    <p><strong></strong></p> <img src={camera.urlImage} alt={camera.cameraName} />
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <p>No hay cámaras que mostrar</p>
                )}
            </div>
        </>
    );
}


export default CameraList