import React, { useState, useEffect } from "react";
import { CleanedDataForIncidencesFromTheApiCall } from "./incidences-apiCall";
import "./incidence-styles.css";
// Main Component to Fetch and Display Incidents
// Main Component to Fetch and Display Incidents
const TrafficIncidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");

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

  const filteredIncidents = incidents.filter((incident) => {
    if (filter === "") return true;
    return incident.incidenceType === filter;
  });

  if (isLoading) {
    return <div>Cargando incidencias...</div>;
  }

  if (error) {
    return <div>Error al cargar las incidencias: {error.message}</div>;
  }

  return (
    <section className="incidences-container">
      <h1>Incidencias de Tráfico en Bizkaia</h1>
      <div className="boton-container">
        <button className="boton-todos" onClick={() => handleFilterChange("")}>
          Todos
        </button>
        <button
          className="boton-obras"
          onClick={() => handleFilterChange("Obras")}
        >
          Obras
        </button>
        <button
          className="boton-accidente"
          onClick={() => handleFilterChange("Accidente")}
        >
          Accidente
        </button>
        <button
          className="boton-seguridad-vial"
          onClick={() => handleFilterChange("Seguridad vial")}
        >
          Seguridad Vial
        </button>
        <button
          className="boton-otros"
          onClick={() => handleFilterChange("Otras incidencias")}
        >
          Otros
        </button>
      </div>
      {filteredIncidents.length === 0 ? (
        <p>No hay incidencias</p>
      ) : (
        <div className="incident-card-container">
          {filteredIncidents.map((incident, index) => (
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
  const className = incident.incidenceType.replace(/\s+/g, "-").toLowerCase();

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
