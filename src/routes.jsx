import App from "./pages/App";
import Map from "./pages/Map";
import Leaderboard from "./pages/Leaderboard";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/maps/:id/leaderboard",
    element: <Leaderboard />,
  },
  {
    path: "/maps/:id",
    element: <Map />,
  },
];

export default routes;
