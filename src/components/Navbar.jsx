import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import "../styles/Navbar.css";

const Navbar = () => {
  const pillRef = useRef(null);
  const logoRef = useRef(null);
  const hamRef = useRef(null);
  const itemsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    gsap.set([logoRef.current, hamRef.current, itemsRef.current], {
      opacity: 0,
      y: 10,
    });

    // Expansion animation: adjusted width for premium feel
    tl.fromTo(
      pillRef.current,
      { width: "60px", height: "60px", borderRadius: "50%", opacity: 0 },
      {
        width: "920px", // Increased width for larger text
        height: "72px", // Slightly taller for better vertical centering
        borderRadius: "100px",
        opacity: 1,
        duration: 1.4,
        delay: 0.3,
      },
    )
      .to(
        [logoRef.current, hamRef.current],
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
        "-=0.6",
      )
      .to(itemsRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.4");
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About Us", path: "/about" },
    { name: "Book Appointment", path: "/appointment" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <header className="nav-container">
      <Link to="/" className="nav-logo" ref={logoRef}>
        Wellness<span className="logo-dot">.</span>
      </Link>

      <div className="nav-pill" ref={pillRef}>
        <ul className="nav-menu" ref={itemsRef}>
          {navLinks.map((item, i) => (
            <motion.li
              key={i}
              className={item.name === "Home" ? "nav-link active" : "nav-link"}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to={item.path} className="nav-link-text">
                {item.name}
              </Link>

              {item.name === "Services" && (
                <span className="dropdown-arrow"></span>
              )}
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="nav-ham" ref={hamRef}>
        <div className="ham-pill">
          <div className="line"></div>
          <div className="line half"></div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
