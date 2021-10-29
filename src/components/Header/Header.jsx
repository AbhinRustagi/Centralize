import React, { useState } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { Button } from "..";
import { FaGoogle } from "react-icons/fa";
import { CgMenuGridO } from "react-icons/cg";

const Header = () => {
  const [state, setState] = useState(false);

  const menuToggle = () => {
    setState(!state);
  };

  return (
    <header>
      <div className="container navbar">
        <p className="lg nav-brand">
          <strong>
            <Link to="/">Centralize</Link>
          </strong>
        </p>
        <CgMenuGridO onClick={menuToggle} className="menu-btn" />
        <nav>
          <ul className={`${state ? "expanded" : ""}`}>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/guest-mode">Guest Mode</Link>
            </li>
            <li className="menu-btn">
              <Link to="/login">Sign In</Link>
            </li>
            <li className="login-btn">
              <Button size="sm" btnType="light" type="anchor" href="/login">
                <FaGoogle />
                Sign In
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
