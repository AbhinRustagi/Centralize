import React from "react";
import "../styles/globals.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header, Footer } from "../components";
import routes from "./routes";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main>
          <Routes>
            {routes.map((route) => (
              <Route {...route} />
            ))}
          </Routes>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
