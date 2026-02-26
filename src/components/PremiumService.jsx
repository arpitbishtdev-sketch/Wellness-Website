import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import "../styles/PremiumService.css";

gsap.registerPlugin(ScrollTrigger);

const PremiumService = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const navigate = useNavigate(); // for redirect

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ps-title-reveal", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.2,
      });

      cardsRef.current.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      title: "Laser Skin Therapy",
      img: "https://res.cloudinary.com/dirixa5no/image/upload/v1772016521/home_qv4cma.jpg",
      tag: "Dermatology",
    },

    {
      title: "Hair Restoration",
      img: "https://res.cloudinary.com/dirixa5no/image/upload/v1772016515/bald_wrbpgn.jpg",
      tag: "Trichology",
    },

    {
      title: "Cosmetic Dentistry",
      img: "https://res.cloudinary.com/dirixa5no/image/upload/v1772016502/dental_ju6hsz.jpg",
      tag: "Aesthetics",
    },
  ];

  // REDIRECT FUNCTION
  const handleBookingRedirect = (serviceTitle) => {
    navigate("/appointment", {
      state: {
        service: serviceTitle,
      },
    });
  };

  return (
    <div ref={sectionRef} className="ps-wrapper">
      <section className="ps-section">
        <div className="ps-header">
          <div className="ps-badge">EXCLUSIVITY DEFINED</div>

          <h1 className="ps-title-reveal">Experience</h1>

          <h1 className="ps-title-reveal ps-accent-text">Transformation</h1>

          <p className="ps-description">
            Tailored aesthetic solutions for the discerning individual.
          </p>
        </div>

        <div className="ps-grid">
          {services.map((service, i) => (
            <div
              key={i}
              className="ps-card"
              ref={(el) => (cardsRef.current[i] = el)}
            >
              <div className="ps-img-container">
                <img
                  src={service.img}
                  alt={service.title}
                  className="ps-card-img"
                />

                <div className="ps-img-overlay"></div>
              </div>

              <div className="ps-card-content">
                <span className="ps-card-tag">{service.tag}</span>

                <h3>{service.title}</h3>

                <button
                  className="ps-card-link"
                  onClick={() => handleBookingRedirect(service.title)}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PremiumService;
