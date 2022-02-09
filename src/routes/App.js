import Footer from "components/Common/Footer";
import Header from "components/Common/Header";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GuestMode from "routes/GuestMode";
import Home from "routes/Home";
import Login from "routes/Login";
import Profile from "routes/Profile";
import Register from "routes/Register";
import "styles/globals.scss";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main>
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
