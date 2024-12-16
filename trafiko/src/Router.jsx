import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root/Root";
import Cameras from "./components/cameras/mainCameraComponent";
import Incidences from "./components/incidences/Incidences";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "cameras",
        element: <Cameras />,
      },
      {
        path: "incidences",
        element: <Incidences />,
      },
    ],
  },
]);

export default router;
