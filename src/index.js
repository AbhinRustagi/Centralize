import React from "react";
import ReactDOM from "react-dom";
import App from "./routes/App";
import { UserProvider } from "./context/user";
import { reducer, initialState } from "./reducer/user";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

ReactDOM.render(
  <UserProvider reducer={reducer} initialState={initialState}>
    <App />
    <ToastContainer />
  </UserProvider>,
  document.getElementById("root")
);
