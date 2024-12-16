import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, {useEffect } from 'react';
import './modal.css';

const Modal = ({ incident, onClose }) => {
    const mapRef = React.useRef(null);
    const mapInstanceRef = React.useRef(null);
  
    useEffect(() => {
      // Destroy existing map if it exists
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
  
      if (mapRef.current) {
        // Create new map instance
        const map = L.map(mapRef.current).setView([incident.latitude, incident.longitude], 13);
        
        // Add tile layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);
  
        // Add marker
        const marker = L.marker([incident.latitude, incident.longitude]).addTo(map);
        marker.bindPopup(`<b>${incident.incidenceType}</b><br>${incident.province}`).openPopup();
  
        // Store map instance for potential cleanup
        mapInstanceRef.current = map;
      }
  
      // Cleanup function
      return () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
      };
    }, [incident]);
  
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div 
          className="modal-content" 
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        >
          <button className="modal-close-btn" onClick={onClose}>×</button>
          <h2>{incident.incidenceType}</h2>
          <p>Provincia: {incident.province}</p>
          <p>Causa: {incident.cause}</p>
          <div 
            ref={mapRef} 
            style={{ 
              width: '100%', 
              height: '300px', 
              marginTop: '20px' 
            }}
          ></div>
        </div>
      </div>
    );
  };

  export default Modal;