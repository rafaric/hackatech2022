import React from "react";
import "./CardCarrera.css";
import { Link } from "react-router-dom";

export default function CardCarrera({ carrera }) {
  return (
    <Link to={`/carrera/${carrera.id}`}>
      <div className="card">
        <p>{carrera.nombre}</p>
        <p className="uni">{carrera.universidad}</p>
      </div>
    </Link>
  );
}
