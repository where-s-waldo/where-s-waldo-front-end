import App from "./pages/App";
import Map from "./pages/Map";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  { 
    path: "/maps/:id",
    element: <Map />,
  },
];

export default routes;
