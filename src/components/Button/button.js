import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  children,
  role,
  type,
  href,
  onClick,
  extHref,
  sm,
  jumbo,
  wFull,
  _css,
}) => {
  const base =
    "flex items-center justify-center gap-3 text-sm font-medium rounded-md text-white block " +
    (sm ? "py-2 px-3 text-xs " : "") +
    (jumbo ? "py-4 px-9 text-lg " : "") +
    (!sm && !jumbo ? "py-3 px-7 " : "") +
    (wFull ? "w-full " : "w-max ");
  const variants = {
    primary:
      "bg-gradient-to-b from-blue-400 to-blue-500 hover:from-blue-400/60 hover:to-blue-500/60 ",
    red: "bg-gradient-to-b from-red-400 to-red-500 hover:from-red-400/60 hover:to-red-500/60 ",
    green:
      "bg-gradient-to-b from-green-400 to-green-500 hover:from-green-400/60 hover:to-green-500/60 ",
    teal: "bg-gradient-to-b from-teal-400 to-teal-500 hover:from-teal-400/60 hover:to-teal-500/60 ",
  };

  if (role === "btn") {
    if (!onClick) {
      throw new Error("onClick function not set.");
    }

    return (
      <button onClick={onClick} className={base + variants[type] + _css}>
        {children}
      </button>
    );
  }

  if (!href || href === "") {
    throw new Error("Href not provided.");
  }

  return extHref ? (
    <a href={href} className={base + variants[type] + _css}>
      {children}
    </a>
  ) : (
    <Link
      to={href}
      onClick={onClick ? onClick : null}
      className={base + variants[type] + _css}
    >
      {children}
    </Link>
  );
};

export default Button;
