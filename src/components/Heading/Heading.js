import PropTypes from "prop-types";
import React from "react";

const sizing = [
  "xs",
  "sm",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
  "6xl",
  "7xl",
  "8xl",
  "9xl",
];

const w8ts = ["light", "normal", "bold", "semibold", "medium"];

const makeStyles = (size, w8t, overrideCSS) =>
  [`text-${size}`, `font-${w8t}`, overrideCSS].join(" ");

const H1 = ({ children, size, w8t = "bold", overrideCSS, ...rest }) => {
  const classes = makeStyles(size || "6xl", w8t, overrideCSS || "");
  return (
    <h1 className={classes} {...rest}>
      {children}
    </h1>
  );
};

const H2 = ({ children, size, w8t = "bold", overrideCSS, ...rest }) => {
  const classes = makeStyles(size || "4xl", w8t, overrideCSS);
  return (
    <h2 className={classes} {...rest}>
      {children}
    </h2>
  );
};

const H3 = ({ children, size, w8t = "bold", overrideCSS, ...rest }) => {
  const classes = makeStyles(size || "3xl", w8t, overrideCSS);
  return (
    <h3 className={classes} {...rest}>
      {children}
    </h3>
  );
};

const H4 = ({ children, size, w8t = "bold", overrideCSS, ...rest }) => {
  const classes = makeStyles(size || "xl", w8t, overrideCSS);
  return (
    <h4 className={classes} {...rest}>
      {children}
    </h4>
  );
};

const H5 = ({ children, size, w8t = "bold", overrideCSS, ...rest }) => {
  const classes = makeStyles(size || "lg", w8t, overrideCSS);
  return (
    <h5 className={classes} {...rest}>
      {children}
    </h5>
  );
};

const H6 = ({ children, size, w8t = "bold", overrideCSS, ...rest }) => {
  const classes = makeStyles(size || "sm", w8t, overrideCSS);
  return (
    <h6 className={classes} {...rest}>
      {children}
    </h6>
  );
};

const props = {
  children: PropTypes.node,
  size: PropTypes.oneOf(sizing),
  w8t: PropTypes.oneOf(w8ts),
  overrideCSS: PropTypes.string,
};

H1.propTypes = {
  ...props,
};
H2.propTypes = {
  ...props,
};
H3.propTypes = {
  ...props,
};
H4.propTypes = {
  ...props,
};
H5.propTypes = {
  ...props,
};
H6.propTypes = {
  ...props,
};

const Heading = { H1, H2, H3, H4, H5, H6 };

export default Heading;
