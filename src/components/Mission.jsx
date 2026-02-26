import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Mission.css";

gsap.registerPlugin(ScrollTrigger);

const Mission = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;

    // Split text into words for premium reveal
    const words = el.querySelectorAll(".mission-word");

    gsap.fromTo(
      words,
      {
        opacity: 0.15,
        y: 40,
        filter: "blur(6px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "top 20%",
          scrub: 1,
        },
      },
    );

    // Premium circle image animation
    const images = el.querySelectorAll(".mission-img-circle");

    images.forEach((img, index) => {
      gsap.fromTo(
        img,
        {
          scale: 0,
          opacity: 0,
          rotate: -15,
        },
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          duration: 1,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: img,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });
  }, []);

  return (
    <section className="mission-container" ref={sectionRef}>
      <span className="mission-label">WELLNESS CARE</span>

      <h2 className="mission-text" ref={textRef}>
        <span className="mission-word">Redefining</span>{" "}
        <span className="mission-word">beauty,</span>{" "}
        <span className="mission-word">cosmetic</span>{" "}
        <span className="mission-word">&</span>{" "}
        <span className="mission-word">personal</span>{" "}
        <span className="mission-word">care</span>
        <div className="mission-img-circle">
          <img
            src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200"
            alt=""
          />
        </div>
        <br />
        <span className="mission-word">through</span>{" "}
        <span className="mission-word">advanced</span>{" "}
        <span className="mission-word">cosmetology,</span>{" "}
        <span className="mission-word">skin,</span>{" "}
        <span className="mission-word">hair</span>{" "}
        <span className="mission-word">and</span>{" "}
        <span className="mission-word">dental</span>{" "}
        <span className="mission-word">care</span>
        <div className="mission-img-circle">
          <img
            src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=200"
            alt=""
          />
        </div>
        <br />
        <span className="mission-word">delivered</span>{" "}
        <span className="mission-word">with</span>{" "}
        <span className="mission-word">precision,</span>{" "}
        <span className="mission-word">care</span>{" "}
        <span className="mission-word">and</span>{" "}
        <span className="mission-word">clinical</span>{" "}
        <span className="mission-word">excellence.</span>
        <div className="mission-img-circle">
          <img
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200"
            alt=""
          />
        </div>
      </h2>
    </section>
  );
};

export default Mission;
