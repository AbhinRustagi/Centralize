import React from "react";
import { FiExternalLink, FiGithub } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="mb-10 pt-6 border-t border-solid border-t-gray-600">
      <div className="container">
        <div className="flex flex-wrap justify-between gap-2 mb-5 items-center">
          <p>
            Developed and maintained by{" "}
            <a href="https://www.abhinrustagi.xyz">
              <span className="underline hover:text-blue-500">
                Abhin Rustagi
              </span>{" "}
              <FiExternalLink className="inline-block w-3" />
            </a>
            .
          </p>
          <a
            href="https://www.github.com/abhinrustagi/centralize"
            className="underline flex gap-3 items-center hover:text-blue-500"
          >
            View Github <FiGithub className="inline-block w-5 h-5" />
          </a>
        </div>
        <small className="font-medium text-gray-500">
          &copy; Abhin Rustagi | 2022.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
