import React  from "react";
import CardReview from "../CardReview/CardReview";
import { useParams } from "react-router-dom";
import { getCarreraByID, getReviewsByCarrera } from "../../api";

export default function ListadoReviews() {
  const { id_carrera } = useParams();
  console.log(id_carrera)
  const carrera = getCarreraByID(parseInt(id_carrera))
  const reviews = getReviewsByCarrera(carrera.nombre)
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          color: "var(--colorUno)",
          margin: "30px 0",
        }}
      >
        {carrera.universidad }
      </h1>
      <h2 style={{ fontSize: "2rem", color: "var(--colorUno)" }}>{carrera.nombre}</h2>
      
      {reviews.map((review, idx) => (
        <CardReview key={idx} review={review} />
      ))}
    </div>
  );
}
