import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import "../styles/Navbar.css";

const Navbar = () => {
  const pillRef = useRef(null);
  const logoRef = useRef(null);
  const hamRef = useRef(null);
  const itemsRef = useRef(null);

  const overlayRef = useRef(null);
  const menuItemsRef = useRef([]);

  const [menuOpen, setMenuOpen] = useState(false);

  // 1. INITIAL ENTRANCE ANIMATION
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    gsap.set([logoRef.current, hamRef.current, itemsRef.current], {
      opacity: 0,
      y: 10,
    });

    tl.fromTo(
      pillRef.current,
      {
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        opacity: 0,
      },
      {
        width: "920px",
        height: "72px",
        borderRadius: "100px",
        opacity: 1,
        duration: 1.4,
        delay: 0.3,
      },
    )
      .to(
        [logoRef.current, hamRef.current],
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.6",
      )
      .to(
        itemsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        "-=0.4",
      );
  }, []);

  // 2. PREMIUM HAMBURGER & OVERLAY ANIMATION
  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 0.4, ease: "power2.inOut" },
    });

    if (menuOpen) {
      // Open Overlay
      gsap.to(overlayRef.current, {
        x: 0,
        duration: 0.7,
        ease: "expo.out",
      });

      // Stagger Menu Items
      gsap.fromTo(
        menuItemsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.3,
          ease: "power3.out",
        },
      );

      // Morph Hamburger to "X"
      tl.to(".line-mid", { scaleX: 0, opacity: 0 }, 0)
        .to(".line-top", { y: 7, rotate: 45 }, 0)
        .to(".line-bot", { y: -7, rotate: -45 }, 0)
        .to(".ham-pill", { backgroundColor: "#111" }, 0) // Dark background when open
        .to(".line", { backgroundColor: "#fff" }, 0); // White lines when open
    } else {
      // Close Overlay
      gsap.to(overlayRef.current, {
        x: "100%",
        duration: 0.6,
        ease: "expo.inOut",
      });

      // Morph "X" back to Hamburger
      tl.to(".line-mid", { scaleX: 1, opacity: 1 }, 0)
        .to(".line-top", { y: 0, rotate: 0 }, 0)
        .to(".line-bot", { y: 0, rotate: 0 }, 0)
        .to(".ham-pill", { backgroundColor: "#fff" }, 0)
        .to(".line", { backgroundColor: "#111" }, 0);
    }
  }, [menuOpen]);

  const menuLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About Us", path: "/about" },
    { name: "Book Appointment", path: "/appointment" },
    { name: "Your Booking", path: "/your-booking" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header className="nav-container">
        <Link to="/" className="nav-logo" ref={logoRef}>
          Wellness<span className="logo-dot">.</span>
        </Link>

        <div className="nav-pill" ref={pillRef}>
          <ul className="nav-menu" ref={itemsRef}>
            <li className="nav-link active">
              <Link to="/" className="nav-link-text">
                Home
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/services" className="nav-link-text">
                Services
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/about" className="nav-link-text">
                About Us
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/appointment" className="nav-link-text">
                Book Appointment
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/contact" className="nav-link-text">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* HAMBURGER - Wrapper stays high z-index */}
        <div
          className={`nav-ham ${menuOpen ? "is-open" : ""}`}
          ref={hamRef}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="ham-pill">
            <div className="line line-top"></div>
            <div className="line line-mid"></div>
            <div className="line line-bot"></div>
          </div>
        </div>
      </header>

      {/* OVERLAY MENU */}
      <div className="menu-overlay" ref={overlayRef}>
        <div className="menu-content">
          {menuLinks.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              ref={(el) => (menuItemsRef.current[i] = el)}
              className="menu-link"
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
