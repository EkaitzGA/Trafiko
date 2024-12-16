import React, { useState, useEffect } from 'react';
import {CleanedDataForIncidencesFromTheApiCall} from "./incidences-apiCall"
import { Link } from 'react-router-dom'
import "./incidence-styles.css"
// Main Component to Fetch and Display Incidents
const TrafficIncidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchIncidentsData = async () => {
      try {
        const finalResponse = await CleanedDataForIncidencesFromTheApiCall();
        setIncidents(finalResponse);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchIncidentsData();
  }, []);
  const handleFilterChange = (filter) => {
    setFilter(filter);
  };
  const filteredIncidents = incidents-filter((incident) => {
    if(filter === "") return true;
  return incident-incidenceType === filter;
  });

  if (isLoading) {
    return <div>Cargando incidencias...</div>;
  }

  if (error) {
    return <div>Error al cargar las incidencias: {error.message}</div>;
  }

  return (
    <section className="incidences-container">
       <div className="button-container">
                <button /* onClick={handleFetchData}  */className="fetch-button">
                    Filtros de incidencias
                </button>           
        </div>
      <h1>Incidencias de Tráfico en Bizkaia</h1>
      {incidents.length === 0 ? (
        <p>No hay incidencias</p>
      ) : (
        <div>
          {incidents.map((incident, index) => (
            <IncidentItem key={index} incident={incident} />
          ))}
        </div>
      )}
    </section>
  );
};

// Individual Incident Item Component
const IncidentItem = ({ incident }) => {
//Take thhe incidenceType of the incident and save it in a const
const className = incident.incidenceType.replace(/\s+/g, '-').toLowerCase(); 

  return (
    <div className={`incident-card ${className}`}>
      <h3>{incident.incidenceType}</h3>
      <p>Provincia: {incident.province}</p>
      <p>Causa: {incident.cause}</p>
      <p>Fecha de Inicio: {new Date(incident.startDate).toLocaleString()}</p>
      <p>Carretera: {incident.road}</p>
      <p>Dirección: {incident.direction}</p>
    </div>
  );
};

export default TrafficIncidents;