import Profile from "./Profile";
import Home from "./Home";
import GuestMode from "./GuestMode";

const routes = [
  {
    index: true,
    element: <Home />,
  },
  { path: "/cp/:username", element: <Profile /> },
  { path: "/guest-mode", element: <GuestMode /> },
];

export default routes;
