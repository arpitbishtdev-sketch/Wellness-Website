import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/Hero.css";

import Mission from "./Mission";
import ServiceSection from "./ServiceSection";
import Doctors from "./Doctors";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const slides = [
  {
    image: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1772016521/home_qv4cma.jpg`,
    tag: "Cosmetologist Skin, Hair & Dental Clinic",
    title: (
      <>
        Advanced Aesthetic Care <br />
        <em>Rooted in Medical Excellence</em>
      </>
    ),
    desc: "Experience world-class skin, hair, and dental treatments led by Dr. Monika Baisoya. Where clinical precision meets luxury care for transformative, natural-looking results.",
  },
  {
    image: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1772016515/bald_wrbpgn.jpg`,
    tag: "Hair Restoration & Scalp Science",
    title: (
      <>
        Restore Your Hair. <br />
        <em>Reclaim Your Confidence.</em>
      </>
    ),
    desc: "Personalized hair restoration solutions designed to revive density, strengthen follicles, and deliver long-lasting, scientifically proven results.",
  },
  {
    image: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1772016502/dental_ju6hsz.jpg`,
    tag: "Advanced Cosmetic Dentistry",
    title: (
      <>
        Precision Dentistry. <br />
        <em>Signature Smiles.</em>
      </>
    ),
    desc: "Elevate your smile with advanced cosmetic dental treatments combining modern technology, artistic expertise, and premium clinical care.",
  },
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="hero-container">
        {/* IMAGE CROSSFADE */}
        <div className="hero-bg-stack">
          {slides.map((slide, i) => (
            <motion.img
              key={i}
              src={slide.image}
              className="hero-img"
              initial={{ opacity: 0 }}
              animate={{
                opacity: i === index ? 1 : 0,
                scale: i === index ? 1 : 1.05,
              }}
              transition={{
                opacity: { duration: 1.8, ease: "easeInOut" },
                scale: { duration: 6, ease: "linear" },
              }}
            />
          ))}

          <div className="hero-overlay" />
        </div>

        {/* CONTENT */}
        <div className="hero-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1,
                  delay: 0.5, // ensures image appears first
                },
              }}
              exit={{
                opacity: 0,
                y: -20,
                transition: { duration: 0.5 },
              }}
            >
              <span className="hero-tag">{slides[index].tag}</span>

              <h1 className="hero-title">{slides[index].title}</h1>

              <p className="hero-desc">{slides[index].desc}</p>

              <div className="hero-buttons">
                <button
                  className="btn-primary"
                  onClick={() => navigate("/appointment")}
                >
                  Book Consultation →
                </button>

                <button
                  className="btn-secondary"
                  onClick={() => navigate("/services")}
                >
                  Explore Treatments
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* INDICATORS */}
        <div className="hero-indicators">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`indicator-dot ${i === index ? "active" : ""}`}
            />
          ))}
        </div>
      </section>

      <Mission />
      <ServiceSection />
      <Doctors />
    </>
  );
};

export default Hero;
