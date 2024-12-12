import "./navbar.css";
export default function NavBar() {
  return (
    <div className="navBarContainer">
      <img src="https://opendata.euskadi.eus/AVComun/images/r01ClaimH_white_es.jpg" alt="" />
      <nav className="navBar">
        <ul className="navBarList">
          <li className="navBarAssets">
            <a href="#">Home</a>
          </li>
          <li className="navBarAssets">
            <a href="#">Incidencias</a>
          </li>
          <li className="navBarAssets">
            <a href="#">Cámaras de tráfico</a>
          </li>
          <li className="navBarAssets">
            <a href="#">Acerca de</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
