import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Footer, Header } from "../components";
import "../styles/globals.scss";
import { GuestMode } from "./GuestMode";
import { Home } from "./Home";
import { Login } from "./Login";
import { Profile } from "./Profile";
import { Register } from "./Register";

function App() {
  return (
    <>
      <Router>
        <main>
          <Header />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/guest-mode" element={<GuestMode />} />
            <Route path="/cp/:username" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
