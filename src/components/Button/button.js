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
  wFull,
}) => {
  const base =
    "flex items-center justify-center gap-3 rounded " +
    (!sm ? "py-3 px-7 " : "py-2 px-3 ") +
    (wFull ? "w-full " : "w-max ");
  const variants = {
    primary:
      "block font-medium text-base bg-blue-800 text-white hover:bg-blue-800/30 hover:text-blue-800 rounded border-solid border border-blue-800",
    outline:
      "block font-bold text-sm text-blue-800 hover:bg-blue-800/5 border-solid border border-blue-800",
    primaryRed: "bg-red-400 hover:bg-red-400/60 hover:text-black",
    primaryGreen: "bg-lime-400 hover:bg-lime-400/60",
    outlineRed:
      "font-bold text-sm text-red-600 hover:bg-red-600/5 border-solid border border-red-600",
    outlineGreen:
      "font-bold text-sm text-green-800 hover:bg-green-800/5 border-solid border border-green-800",
  };

  if (role === "btn") {
    if (!onClick) {
      throw new Error("onClick function not set.");
    }

    return (
      <button onClick={onClick} className={base + variants[type]}>
        {children}
      </button>
    );
  }

  if (!href || href === "") {
    throw new Error("Href not provided.");
  }

  return extHref ? (
    <a href={href} className={base + variants[type]}>
      {children}
    </a>
  ) : (
    <Link
      to={href}
      onClick={onClick ? onClick : null}
      className={base + variants[type]}
    >
      {children}
    </Link>
  );
};

export default Button;
