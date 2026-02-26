import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Loader from "./components/Loader";
import Footer from "./components/Footer";
import PremiumService from "./components/PremiumService";
import AppointmentPage from "./components/BookingPage";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Loader key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <ScrollToTop />
          <Navbar />

          <Routes>
            {/* Home page */}
            <Route path="/" element={<Hero />} />

            {/* Services page */}
            <Route path="/services" element={<PremiumService />} />
            <Route path="/appointment" element={<AppointmentPage />} />
          </Routes>

          <Footer />
        </>
      )}
    </BrowserRouter>
  );
}
