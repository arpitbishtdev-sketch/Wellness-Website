import React, { useEffect, useRef } from "react";
import "../styles/Footer.css";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  FaInstagram,
  FaFacebookF,
  FaMapMarkerAlt,
  FaUserMd,
  FaClinicMedical,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-animate", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        },
      });
    });

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <footer className="premium-footer" ref={footerRef}>
      <div className="footer-container">
        {/* LEFT SIDE */}
        <div className="footer-left footer-animate">
          <h2 className="footer-logo">WELLNESS CARE</h2>

          <p className="footer-speciality">
            Cosmetologist Skin, Hair & Dental Clinic
          </p>

          <p className="footer-description">
            Advanced clinical treatments led by{" "}
            <span className="highlight">Dr. Monika Baisoya</span>. Delivering
            precision dermatology, hair restoration, and cosmetic dental care
            using modern medical technology.
          </p>

          {/* SOCIAL */}
          <div className="footer-social-section">
            <p className="footer-follow-label">Follow Us</p>

            <div className="footer-social-icons">
              {/* INSTAGRAM */}
              <a
                href="https://www.instagram.com/wellness_care1717/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon instagram"
              >
                <FaInstagram />

                <span className="social-text">Instagram</span>
              </a>

              {/* FACEBOOK */}
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon facebook"
              >
                <FaFacebookF />

                <span className="social-text">Facebook</span>
              </a>
            </div>
          </div>
        </div>

        {/* CENTER */}
        <div className="footer-center footer-animate">
          <h3 className="footer-heading">Clinic Services</h3>

          <ul className="footer-links">
            <li>Clinical Skin Treatments</li>

            <li>Hair Restoration Solutions</li>

            <li>Skin Brightening Treatments</li>

            <li>Dental & Smile Enhancement</li>

            <li>Advanced Cosmetic Procedures</li>
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="footer-right footer-animate">
          <h3 className="footer-heading">Visit Our Clinic</h3>

          <div className="footer-info">
            <div className="footer-info-item">
              <FaClinicMedical className="footer-icon" />

              <span>Wellness Care Clinic</span>
            </div>

            <div className="footer-info-item">
              <FaUserMd className="footer-icon" />

              <span>Dr. Monika Baisoya</span>
            </div>

            <div className="footer-info-item">
              <FaMapMarkerAlt className="footer-icon" />

              <span>B-1/7, Dayalpur Karawal Nagar Road, Delhi, India</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <div className="footer-divider"></div>

        <div className="footer-bottom-content">
          <p>
            © {new Date().getFullYear()} WELLNESS CARE. All Rights Reserved.
          </p>

          <div className="footer-bottom-links">
            <span>Privacy Policy</span>

            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
