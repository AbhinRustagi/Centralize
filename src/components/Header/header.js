import React, { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "..";
import { readTokens, removeTokens } from "../../lib/tokenFunctions";

const Header = () => {
  const [state, setState] = useState(false);
  const [auth, setAuth] = useState(readTokens().ok);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setAuth(readTokens().ok);
  }, [location]);

  const toggleHeader = () => {
    setState(!state);
  };

  const proceedToLogOut = (e) => {
    e.preventDefault();
    removeTokens();
    navigate("/");
    setAuth(null);
  };

  return (
    <header className="py-3 bg-white">
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
            {!auth ? (
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
            {!auth ? (
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
            {auth ? (
              <li>
                <Button role="btn" type="red" onClick={proceedToLogOut}>
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
