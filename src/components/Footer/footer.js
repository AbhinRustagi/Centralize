import React from "react";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { Button } from "..";

const Footer = () => {
  const { i18n, t } = useTranslation();

  return (
    <footer className="pb-10 pt-6 border-t border-solid border-t-gray-300">
      <div className="container">
        <div className="flex flex-wrap justify-between gap-2 mb-5 items-center">
          <div className="flex gap-1">
            <Button
              type="teal"
              sm
              onClick={() => {
                i18n.changeLanguage("en");
              }}
              role="btn"
              _css={
                i18n.resolvedLanguage === "en"
                  ? "bg-gradient-to-b from-teal-600 to-teal-700 hover:from-teal-600/60 hover:to-teal-700/60"
                  : ""
              }
            >
              EN
            </Button>
            <Button
              type="teal"
              sm
              onClick={() => {
                i18n.changeLanguage("fr");
              }}
              role="btn"
              _css={
                i18n.resolvedLanguage === "fr"
                  ? "bg-gradient-to-b from-teal-600 to-teal-700 hover:from-teal-600/60 hover:to-teal-700/60"
                  : ""
              }
            >
              FR
            </Button>
          </div>
          <p>
            {t("footer")}{" "}
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
