import Profile from "./Profile";
import Home from "./Home";
import GuestMode from "./GuestMode";
import Login from "./Login";
import Register from "./Register";

const routes = [
  { index: true, element: <Home /> },
  {
    path: "/cp/:username",
    element: <Profile />,
  },
  { path: "/guest-mode", element: <GuestMode /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
];

export default routes;
