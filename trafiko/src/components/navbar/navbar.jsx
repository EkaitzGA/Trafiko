import "./navbar.css";
import { Link } from "react-router-dom";
export default function NavBar() {
  return (
    <>
      <img
        src="https://opendata.euskadi.eus/AVComun/images/r01ClaimH_white_es.jpg"
        alt=""
      />
      <nav className="navBar">
        <ul className="navBarList">
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
