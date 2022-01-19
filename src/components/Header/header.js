import React, { useState } from "react";
import useUserInfo from "../../context/user";
import { FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { fb } from "../../lib";
import { Button, showToast } from "..";

const Header = () => {
  const [{ user }, dispatch] = useUserInfo();
  const [state, setState] = useState(false);
  const navigate = useNavigate();

  const toggleHeader = () => {
    setState(!state);
  };

  const proceedToLogOut = (e) => {
    e.preventDefault();
    fb.logOut().then((res) => {
      if (res.success) {
        showToast("Logged out", "success");
        dispatch({ type: "SET_USER", user: null });
        navigate("/", { replace: true });
      } else {
        showToast("There was an error.", "danger");
      }
    });
  };

  return (
    <header className="py-3">
      <div className="container flex-wrap flex justify-between items-center">
        <div>
          <a className="block flex items-center gap-3" href="/">
            <span className="font-medium text-2xl">Centralize</span>
          </a>
        </div>
        <FiMenu className="md:hidden block w-6 h-6" onClick={toggleHeader} />
        <nav
          className={`md:w-auto w-full md:overflow-auto overflow-hidden md:max-h-max ${
            state ? "max-h-screen" : "max-h-0"
          }`}
        >
          <ul className="flex flex-wrap gap-3 md:pt-0 pt-2 md:w-auto w-full md:items-center items-start md:flex-row flex-col">
            {user === null ? (
              <li>
                <Link
                  className="px-3 py-2 font-medium inline-block hover:underline"
                  to="/guest-mode"
                  onClick={toggleHeader}
                >
                  Guest Mode
                </Link>
              </li>
            ) : null}
            {user === null ? (
              <li>
                <Link
                  className="px-3 py-2 font-medium inline-block hover:underline"
                  to="/register"
                  onClick={toggleHeader}
                >
                  Register
                </Link>
              </li>
            ) : null}
            {user !== null ? (
              <li>
                <Button role="btn" type="primaryRed" onClick={proceedToLogOut}>
                  Logout
                </Button>
              </li>
            ) : (
              <li>
                <Button
                  type="primary"
                  wFull
                  href="/login"
                  onClick={toggleHeader}
                >
                  Login
                </Button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
