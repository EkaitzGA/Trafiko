import "./footer.css"
function Footer(){
    return (
        <>
  <div className="footer-container">
    <div className="footer-section">
      <h4>Contacto</h4>
      <p>Dirección: Calle Ejemplo 123, Ciudad</p>
      <p>Teléfono: +34 123 456 789</p>
      <p>Email: contacto@ejemplo.com</p>
    </div>
    
    <div className="footer-section">
      <h4>Enlaces Rápidos</h4>
      <ul>
        <li><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">Sobre nosotros</a></li>
        <li><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">Servicios</a></li>
        <li><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">Política de privacidad</a></li>
        <li><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">Contacto</a></li>
      </ul>
    </div>

    <div className="footer-section">
      <h4>Síguenos</h4>
      <div className="social-icons">
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"><img src="facebook-icon.png" alt="Facebook"/></a>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"><img src="twitter-icon.png" alt="Twitter"/></a>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"><img src="instagram-icon.png" alt="Instagram"/></a>
      </div>
    </div>
  </div>

  <div className="footer-bottom">
    <p>© 2024 Nombre de tu Sitio. Todos los derechos reservados.</p>
  </div>
        </>
    )}

    export default Footer