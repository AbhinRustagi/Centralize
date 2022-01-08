import React from "react";
import ReactDOM from "react-dom";
import App from "./routes/App";
import { UserProvider } from "./context/user";
import { reducer, initialState } from "./reducer/user";

ReactDOM.render(
  <UserProvider reducer={reducer} initialState={initialState}>
    <App />
  </UserProvider>,
  document.getElementById("root")
);
