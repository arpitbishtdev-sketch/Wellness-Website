import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Doctors.css";

gsap.registerPlugin(ScrollTrigger);

const founders = [
  {
    id: 1,
    name: "Dr. Luke Maxfield",
    title: "Board-Certified Dermatologist",
    image:
      "https://res.cloudinary.com/dirixa5no/image/upload/v1772084886/DOC-1_tow7qa.jpg",
    bio: "Dr. Luke Maxfield is a board-certified dermatologist and fellowship-trained Mohs surgeon known for his clinical skill and patient-first approach.",
  },
  {
    id: 2,
    name: "Dr. Jarett Casale",
    title: "Board-Certified Dermatologist",
    image:
      "https://res.cloudinary.com/dirixa5no/image/upload/v1772084898/DOC-2_y8mgts.jpg",
    bio: "Dr. Jarett Casale is a board-certified dermatologist committed to redefining accessible skincare through science.",
  },
];

const FoundersSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const textRef = useRef(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Text Reveal
      gsap.from(".reveal-item", {
        x: -50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Cards Entrance
      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          x: 50,
          opacity: 0,
          duration: 1.2,
          delay: i * 0.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="premium-founders-section" ref={sectionRef}>
      <div className="founders-container">
        <div className="text-content-side" ref={textRef}>
          <span className="overline reveal-item">THE EXPERTISE</span>
          <h2 className="section-title reveal-item">
            Our <span>Founders</span>
          </h2>
          <p className="section-description reveal-item">
            ScriptDerm was founded by world-class dermatologists to bridge the
            gap between prescription results and daily care.
          </p>
          <button className="premium-btn reveal-item">
            Find Your Treatment <span className="arrow">→</span>
          </button>
        </div>

        <div className="cards-wrapper">
          {founders.map((founder, index) => (
            <div
              key={founder.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="founder-minimal-card"
            >
              <div className="img-box">
                <img src={founder.image} alt={founder.name} />
                <div
                  className={`bio-slide ${expandedId === founder.id ? "show" : ""}`}
                >
                  <p>{founder.bio}</p>
                </div>
              </div>

              <div className="card-details">
                <div className="info">
                  <h3>{founder.name}</h3>
                  <p>{founder.title}</p>
                </div>
                <button
                  className={`toggle-icon ${expandedId === founder.id ? "active" : ""}`}
                  onClick={() =>
                    setExpandedId(expandedId === founder.id ? null : founder.id)
                  }
                >
                  {expandedId === founder.id ? "−" : "+"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;
