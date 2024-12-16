import React from 'react';

const CameraPagination = ({ currentPage, totalPages, onPrevious, onNext }) => {
    return (
        <div className="pagination-container">
            <button
                onClick={onPrevious}
                disabled={currentPage === 1}
                className="pagination-button"
            >
                Página anterior
            </button>
            <span className="page-indicator"><b>Página: {currentPage}/{totalPages}</b></span>
            <button 
                onClick={onNext} 
                disabled={currentPage >= totalPages}
                className="pagination-button"
            >
                Siguiente página
            </button>
        </div>
    );
};

export default CameraPagination;