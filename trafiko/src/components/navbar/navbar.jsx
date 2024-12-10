import "./navbar.css";
export default function NavBar() {
  return (
    <div className="navBarContainer">
      <h1 className="titleIMG">IMG goes here</h1>
      <nav className="navBar">
        <ul className="navBarList">
          <li className="navBarAssets">
            <a href="#">Home</a>
          </li>
          <li className="navBarAssets">
            <a href="#">Incidencias</a>
          </li>
          <li className="navBarAssets">
            <a href="#">Contacto</a>
          </li>
          <li className="navBarAssets">
            <a href="#">Acerca de</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
