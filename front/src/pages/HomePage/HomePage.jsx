import LayoutGeneral from "../../components/LayoutGeneral/LayoutGeneral";
import ListadoCarreras from "../../components/ListadoCarreras/ListadoCarreras";
import "./HomePage.css";

function HomePage() {
  return (
    <LayoutGeneral>
      <h1 className="main-title">
        Una comunidad de estudiantes te ayuda a decidir qué carrera es la indicada para vos.
      </h1>
      <h2 className="sub-title">
        Leé que opinan de estas carreras los estudiantes que las cursan:
      </h2>
      <ListadoCarreras />
    </LayoutGeneral>
  );
}

export default HomePage;
