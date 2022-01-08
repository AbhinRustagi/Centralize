import React from "react";
import logo from "../../static/logo.svg";

const Header = () => {
  return (
    <header className="container py-3 flex justify-between items-center">
      <div>
        <a className="block flex items-center gap-3" href="/">
          <img
            src={logo}
            alt="Centralize - Logo"
            className="w-10 object-contain"
          />
          <span className="font-bold text-2xl">Centralize</span>
        </a>
      </div>
      <button className="py-1 px-5 font-medium text-sm text-teal-700 hover:bg-teal-700/10 border-solid border border-teal-700 rounded">
        Login
      </button>
    </header>
  );
};

export default Header;
