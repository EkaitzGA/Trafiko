import "./navbar.css";
import { Link } from "react-router-dom";
export default function NavBar() {
  return (
    <>
      <img
        src="../../assets/bannerNavbar.png" alt="banner" />
      <nav className="navBar">
        <ul className="navBarList">
          <li className="navBarAssets">
            <Link to="/"
            className={location.pathname === '/' ? 'active' : ''}
            >Home</Link>
          </li>
          <li className="navBarAssets">
            <Link to="/cameras"
            className={location.pathname === '/cameras' ? 'active' : ''}
            >Cámaras</Link>
          </li>
          <li className="navBarAssets">
            <Link to="/incidences"
            className={location.pathname === '/incidences' ? 'active' : ''}
            >Incidencias</Link>
          </li>
        </ul>
      </nav>
      </>
  );
}
