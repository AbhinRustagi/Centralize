import React from "react";
import "../styles/globals.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import GuestMode from "./GuestMode";
import { Header } from "../components";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/guest-mode" element={<GuestMode />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
