import { useContext } from "react";

function Card({incidence}){

    return(
        <div className="card">
            <p>{incidence.incidenceType}</p>
            <p>{incidence.province}</p>
            <p>{incidence.cause}</p>
            <p>{incidence.startDate}</p>
            <p>{incidence.road}</p>
            <p>{incidence.direction}</p>
        </div>
    )
}