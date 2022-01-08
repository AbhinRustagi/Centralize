import React from "react";
import { FiExternalLink } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="my-10 pt-6 border-t border-solid border-t-gray-600">
      <div className="container">
        <p className="mb-3">
          Developed and maintained by{" "}
          <a href="https://www.abhinrustagi.xyz">
            <span className="underline">Abhin Rustagi</span>{" "}
            <FiExternalLink className="inline-block w-3" />
          </a>
          .
        </p>
        <small className="font-medium text-gray-500">&copy; Abhin Rustagi | 2022.</small>
      </div>
    </footer>
  );
};

export default Footer;
