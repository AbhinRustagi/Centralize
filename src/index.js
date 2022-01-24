import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import App from "./routes/App";
import "./utils/i18n";

ReactDOM.render(
  <>
    <App />
    <ToastContainer />
  </>,
  document.getElementById("root")
);
