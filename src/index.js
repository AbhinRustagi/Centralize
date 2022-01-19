import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { UserProvider } from "./context/user";
import { initialState, reducer } from "./reducer/user";
import App from "./routes/App";
import "./utils/i18n";

ReactDOM.render(
  <UserProvider reducer={reducer} initialState={initialState}>
    <App />
    <ToastContainer />
  </UserProvider>,
  document.getElementById("root")
);
