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
    "flex items-center justify-center gap-3 text-sm font-medium rounded-md text-white block " +
    (!sm ? "py-3 px-7 " : "py-2 px-3 text-xs ") +
    (wFull ? "w-full " : "w-max ");
  const variants = {
    primary:
      "bg-gradient-to-b from-blue-400 to-blue-500 hover:from-blue-400/60 hover:to-blue-500/60",
    outline:
      "text-blue-600 hover:bg-blue-600/5 border-solid border border-blue-600",
    primaryRed:
      "bg-gradient-to-b from-red-400 to-red-500 hover:from-red-400/60 hover:to-red-500/60",
    primaryGreen:
      "bg-gradient-to-b from-green-400 to-green-500 hover:from-green-400/60 hover:to-green-500/60",
    outlineRed:
      "text-red-600 hover:bg-red-600/5 border-solid border border-red-600",
    outlineGreen:
      "text-green-600 hover:bg-green-600/5 border-solid border border-green-600",
    outlineWhite: "text-sm hover:bg-white/5 border-solid border border-white",
    outlineGray:
      "text-gray-700 hover:bg-gray-700/5 border-solid border border-gray-700",
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
