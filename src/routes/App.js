import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Footer, Header } from "../components";
import "../styles/globals.scss";
import routes from "./routes";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main>
          <Routes>
            {routes.map((route, _) => (
              <Route key={_} {...route} />
            ))}
          </Routes>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
