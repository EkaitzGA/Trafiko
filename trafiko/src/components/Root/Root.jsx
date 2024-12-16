import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../navbar/navbar";
import Footer from "../footer/footer";
import LandingPage from "../LandingPage/LandingPage";
import CanvasIndex from "../textSlider/canvasIndex";

function Root() {
    const location = useLocation();
  return (
    <>
    {location.pathname === "/" && <CanvasIndex />}
      <header>
        <NavBar />
      </header>
      <main>
        {location.pathname === "/" && <LandingPage />}
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
export default Root;
