import "./navbar.css";
import { Link } from "react-router-dom";
export default function NavBar() {
  return (
    <>
      <img
        src="../../assets/bannerNavbar.png"
        alt=""
      />
      <nav className="navBar">
        <ul className="navBarList">
        <li className="navBarAssets">
            <Link to="/">Home</Link>
          </li>
          <li className="navBarAssets">
            <Link to="/cameras">Cámaras</Link>
          </li>
          <li className="navBarAssets">
            <Link to="/incidences">Incidencias</Link>
          </li>
        </ul>
      </nav>
      </>
  );
}
