import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const base =
  "flex items-center justify-center gap-3 text-sm font-medium rounded-md text-white block ";

const variants = {
  primary:
    "bg-gradient-to-b from-blue-400 to-blue-500 hover:from-blue-400/60 hover:to-blue-500/60 ",
  red: "bg-gradient-to-b from-red-400 to-red-500 hover:from-red-400/60 hover:to-red-500/60 ",
  green:
    "bg-gradient-to-b from-green-400 to-green-500 hover:from-green-400/60 hover:to-green-500/60 ",
  teal: "bg-gradient-to-b from-teal-400 to-teal-500 hover:from-teal-400/60 hover:to-teal-500/60 ",
};

const sizing = {
  sm: "py-2 px-3 text-xs ",
  jumbo: "py-4 px-9 text-lg",
  md: "py-3 px-7",
};

const Button = ({
  children,
  role = "btn",
  variant = "primary",
  anchorProps,
  onClick,
  size = "md",
  overrideCSS,
  width = "max",
  ...rest
}) => {
  const classes = [
    base,
    sizing[size],
    variants[variant],
    `w-${width}`,
    overrideCSS,
  ].join(" ");

  if (role === "btn") {
    if (!onClick) {
      throw new Error("onClick function not set.");
    }

    return (
      <button onClick={onClick} className={classes} {...rest}>
        {children}
      </button>
    );
  }

  return anchorProps.ext ? (
    <a href={anchorProps.href} className={classes} {...rest}>
      {children}
    </a>
  ) : (
    <Link
      to={anchorProps.href}
      onClick={onClick ? onClick : null}
      className={classes}
      {...rest}
    >
      {children}
    </Link>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  role: PropTypes.oneOf(["btn", "anchor"]),
  variant: PropTypes.oneOf(Object.keys(variants)),
  anchorProps: PropTypes.shape({
    href: PropTypes.string.isRequired,
    ext: PropTypes.bool,
  }),
  size: PropTypes.oneOf(Object.keys(sizing)),
  overrideCSS: PropTypes.string,
  width: PropTypes.oneOf(["full", "max"]),
};

export default Button;
