import React, { useState, useEffect } from 'react';
import {CleanedDataForIncidencesFromTheApiCall} from "./incidences-apiCall"
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
    <div>
      <h1>Incidencias de Tráfico en Bizkaia</h1>
      {incidents.length === 0 ? (
        <p>No hay incidencias</p>
      ) : (
        <ul>
          {incidents.map((incident, index) => (
            <IncidentItem key={index} incident={incident} />
          ))}
        </ul>
      )}
    </div>
  );
};

// Individual Incident Item Component
const IncidentItem = ({ incident }) => {
  return (
    <li>
      <div>Tipo de Incidencia: {incident.incidenceType}</div>
      <div>Provincia: {incident.province}</div>
      <div>Causa: {incident.cause}</div>
      <div>Fecha de Inicio: {new Date(incident.startDate).toLocaleString()}</div>
      <div>Carretera: {incident.road}</div>
      <div>Dirección: {incident.direction}</div>
    </li>
  );
};

export default TrafficIncidents;