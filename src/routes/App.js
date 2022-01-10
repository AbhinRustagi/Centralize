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
        <main className="dark:bg-stone-900 dark:text-neutral-200">
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
