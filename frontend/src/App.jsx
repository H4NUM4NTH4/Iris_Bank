import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Login from "./Login";
import AppRoutes from "./Routes";
import HowItWorks from "./HowItWorks";
import ContactUs from "./ContactUs";
import "./Auth.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/contact" element={<ContactUs />} />
        {/* Include AppRoutes as a nested route if needed */}
        <Route path="/*" element={<AppRoutes />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
