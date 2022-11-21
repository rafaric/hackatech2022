import "./CardReview.css";


export default function CardReview({ review}) {
  const fecha =new Date(review.fecha)
  return (
    <div className="review">
      <p>Fecha de creación - { fecha.getDate() + '/'+ (fecha.getMonth()+1) + '/' + fecha.getFullYear()}</p>
      <div><p>
        Estudiante: 
      </p><span>{review.username}</span></div>
      <div><p>Año que cursa:</p>
      <span>{review.nivelCurso}</span></div>
      <div><p>Dificultad (del 1 al 5):</p>
      <span>{review.dificultad}</span></div>
      <div><p>Comentario:</p>
      <p>{review.descripcion}</p></div>
    </div>
  );
}
