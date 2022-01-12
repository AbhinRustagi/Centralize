import { GuestMode } from "./GuestMode";
import { Home } from "./Home";
import { Login } from "./Login";
import { Profile } from "./Profile";
import { Register } from "./Register";
import { ForgetPassword } from "./ForgetPassword";

const routes = [
  { index: true, element: <Home /> },
  {
    path: "/cp/:username",
    element: <Profile />,
  },
  { path: "/guest-mode", element: <GuestMode /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/reset-password", element: <ForgetPassword /> },
];

export default routes;
