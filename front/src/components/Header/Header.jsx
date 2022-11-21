import { Link } from "react-router-dom";
import "./Header.css";

const InvitadoLinks = ({ links, page }) => {
  return links.map(
    ([link, title], idx) =>
      page !== link && (
        <Link key={idx} to={link} className="btn btn-secundario btn-xs">
          {title}
        </Link>
      )
  );
};

function Header({ page }) {
  
  const linksDeInvitado = [
    ["/registro", "Crear cuenta"],
    ["/login", "Iniciar sesión"],
    ["/crear-review", "Crear Review"]
  ];
  
  return (
    <header className="main-header">
      <Link className="logo" to="/">UniReview</Link>

      <nav className="main-header__navbar">
        <InvitadoLinks links={linksDeInvitado} page={page} />
      </nav>
    </header>
  );
}

export default Header;
