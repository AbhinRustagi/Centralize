import "@fontsource/plus-jakarta-sans";
import ErrorBoundary from "components/ErrorBoundary";
import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import App from "routes/App";
import "utils/i18n";

ReactDOM.render(
  <>
    <ErrorBoundary>
      <App />
      <ToastContainer />
    </ErrorBoundary>
  </>,
  document.getElementById("root")
);
