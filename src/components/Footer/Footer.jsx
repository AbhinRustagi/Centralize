import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="container">
      <p>
        Designed & Developed by{" "}
        <strong>
          <a href="https://www.abhinrustagi.xyz/">Abhin Rustagi</a>
        </strong>
        .
      </p>
      <br />
      <p className="sm">&copy; Centralize App | 2021.</p>
    </footer>
  );
};

export default Footer;
