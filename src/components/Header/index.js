import React from "react";
import useUserInfo from "../../context/user";
import { Link } from "react-router-dom";

const Header = () => {
  const [{ user }, dispatch] = useUserInfo();

  return (
    <header className="bg-sky-200 py-3 border-b border-b-gray-800">
      <div className="container flex-wrap flex justify-between items-center">
        <div>
          <a className="block flex items-center gap-3" href="/">
            <span className="font-medium text-2xl">Centralize</span>
          </a>
        </div>
        <nav>
          <ul className="flex flex-wrap items-center gap-3">
            {!user && (
              <li>
                <Link
                  className="px-3 py-2 font-medium inline-block hover:underline"
                  to="/guest-mode"
                >
                  Guest Mode
                </Link>
              </li>
            )}
            {!user && (
              <li>
                <Link
                  className="px-3 py-2 font-medium inline-block hover:underline"
                  to="/register"
                >
                  Register
                </Link>
              </li>
            )}
            {user ? (
              <li>
                <button
                  className="py-2 px-10 font-bold text-sm text-red-600 hover:bg-red-600/5 border-solid border border-red-600"
                  onClick={() => dispatch({ type: "SET_USER", user: "null" })}
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link to="/login">
                  <button className="py-2 px-10 font-bold text-sm text-blue-800 hover:bg-blue-800/5 border-solid border border-blue-800">
                    Login
                  </button>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
