import React from "react";
import { Link } from "react-router-dom";
import "./Button.scss";

const Button = ({ type, href, ext, onClick, children, size, btnType }) => {
  const classes = `btn border-rounded ${size} ${btnType}`;

  if (type === "anchor") {
    return ext ? (
      <a className={classes} href={href}>
        {children}
      </a>
    ) : (
      <Link className={classes} to={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
