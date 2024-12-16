import React, { useState, useEffect } from 'react';
import {CleanedDataForIncidencesFromTheApiCall} from "./incidences-apiCall"
import "./incidence-styles.css"
// Main Component to Fetch and Display Incidents
const TrafficIncidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (isLoading) {
    return <div>Cargando incidencias...</div>;
  }

  if (error) {
    return <div>Error al cargar las incidencias: {error.message}</div>;
  }

  return (
    <section className="incidences-container">
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
  return (
    <div className="incident-card">
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