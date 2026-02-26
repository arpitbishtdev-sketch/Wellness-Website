import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import "../styles/BookingPage.css";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useLocation } from "react-router-dom";

const BookingPage = () => {
  const pageRef = useRef();
  const formRef = useRef();

  const location = useLocation();
  const selectedService = location.state?.service || "";

  const today = new Date();
  const maxDateObj = new Date();
  maxDateObj.setDate(today.getDate() + 2);

  const formatDate = (date) => date.toISOString().split("T")[0];

  const minDate = formatDate(today);
  const maxDate = formatDate(maxDateObj);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: selectedService,
    date: "",
    time: "",
  });

  const [success, setSuccess] = useState(false);

  // PAGE ENTRY ANIMATION
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".booking-left", {
        opacity: 0,
        x: -60,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".booking-card", {
        opacity: 0,
        y: 80,
        duration: 1.2,
        delay: 0.2,
        ease: "power4.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // AUTO SCROLL TO FORM
  useEffect(() => {
    if (location.state?.service) {
      gsap.to(window, {
        scrollTo: formRef.current,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, [location]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // SUCCESS ANIMATION TRIGGER
    setSuccess(true);

    gsap.fromTo(
      ".success-card",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
    );
  };

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
  ];

  return (
    <motion.div
      ref={pageRef}
      className="booking-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="booking-container">
        {/* LEFT */}
        <div className="booking-left">
          <h1 className="booking-title">
            Book Your <span>Wellness Session</span>
          </h1>

          <p className="booking-desc">
            Experience elite healthcare with our premium specialists.
          </p>

          <div className="booking-points">
            <div>● Certified Premium Doctors</div>
            <div>● Instant Confirmation</div>
            <div>● Private & Secure Booking</div>
          </div>
        </div>

        {/* FORM */}
        <motion.form
          ref={formRef}
          className="booking-card"
          onSubmit={handleSubmit}
        >
          <input
            name="name"
            placeholder="Full Name"
            required
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="Email Address"
            required
            onChange={handleChange}
          />
          <input
            name="phone"
            placeholder="Phone Number"
            required
            onChange={handleChange}
          />

          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            required
          >
            <option value="">Select Service</option>
            <option>Laser Skin Therapy</option>
            <option>Hair Restoration</option>
            <option>Cosmetic Dentistry</option>
          </select>

          <input
            type="date"
            name="date"
            min={minDate}
            max={maxDate}
            required
            onChange={handleChange}
          />

          <select name="time" required onChange={handleChange}>
            <option value="">Select Time</option>
            {timeSlots.map((t, i) => (
              <option key={i}>{t}</option>
            ))}
          </select>

          <div className="booking-note">Pre-booking charge ₹50 applies</div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
          >
            Confirm Booking
          </motion.button>
        </motion.form>
      </div>

      {/* SUCCESS POPUP */}
      <AnimatePresence>
        {success && (
          <motion.div
            className="success-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="success-card">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="success-icon"
              >
                ✓
              </motion.div>

              <h2>Booking Confirmed</h2>

              <p>Your appointment has been scheduled.</p>

              <button onClick={() => setSuccess(false)}>Close</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BookingPage;
