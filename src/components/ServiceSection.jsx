import React, { useState, useRef, useEffect } from "react";
import "../styles/ServiceSection.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isMobileOrLowEnd } from "../utils/isMobile";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "skin",
    label: "Clinical Skin Treatments",
    description:
      "Advanced dermatological care targeting acne, texture, and rejuvenation.",
    before:
      "https://res.cloudinary.com/dirixa5no/image/upload/v1772020405/ACNE_BA_2_lg4br6.jpg",
    after:
      "https://res.cloudinary.com/dirixa5no/image/upload/v1772020403/ACNE_BA_1_led6hx.jpg",
  },
  {
    id: "hair",
    label: "Hair Restoration",
    description:
      "Follicular precision for natural-looking density and hairline restoration.",
    before:
      "https://res.cloudinary.com/dirixa5no/image/upload/v1772020576/HT-2_fakw5c.jpg",
    after:
      "https://res.cloudinary.com/dirixa5no/image/upload/v1772020574/HT-1_sms12i.jpg",
  },
  {
    id: "brightening",
    label: "Luminous Brightening",
    description:
      "IV glutathione and clinical peels for an even, radiant complexion.",
    before:
      "https://res.cloudinary.com/dirixa5no/image/upload/v1772072745/SW_2_xkhiii.png",
    after:
      "https://res.cloudinary.com/dirixa5no/image/upload/v1772072742/SW_1_g9xptc.png",
  },
  {
    id: "dental",
    label: "Smile Aesthetics",
    description:
      "Digital smile design and veneers for a flawless, natural grin.",
    before:
      "https://res.cloudinary.com/dirixa5no/image/upload/v1772073556/DT_2_bcdxhu.png",
    after:
      "https://res.cloudinary.com/dirixa5no/image/upload/v1772073552/DT_1_xkxup8.png",
  },
];

export default function ServiceSection() {
  const [activeService, setActiveService] = useState(services[0]);
  const [sliderPos, setSliderPos] = useState(50);

  const sectionRef = useRef();
  const leftRef = useRef();
  const rightRef = useRef();
  const sliderRef = useRef();
  const beforeImgRef = useRef();
  const isDragging = useRef(false);
  const isMobile = isMobileOrLowEnd();

  // Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-text", {
        y: isMobile ? 30 : 40,
        opacity: 0,
        stagger: 0.1,
        duration: isMobile ? 0.8 : 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      gsap.from(rightRef.current, {
        x: 50,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    });
    return () => ctx.revert();
  }, []);

  // Smooth slider logic
  const handleMove = (e) => {
    if (!isDragging.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let x = clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
  };

  const startDragging = () => (isDragging.current = true);
  const stopDragging = () => (isDragging.current = false);

  useEffect(() => {
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchend", stopDragging);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", stopDragging);
    };
  }, []);

  return (
    <section className="service-section" ref={sectionRef}>
      <div className="premium-container">
        {/* Left Side: Content */}
        <div className="content-left" ref={leftRef}>
          <div className="badge reveal-text">EXCEPTIONAL CARE</div>
          <h2 className="heading reveal-text">
            Precision Beauty <br /> <span>Reimagined</span>
          </h2>
          <p className="subtext reveal-text">
            Experience the intersection of medical science and aesthetic
            artistry. Our signature transformations are tailored to your unique
            anatomy.
          </p>

          <div className="service-navigation">
            {services.map((service) => (
              <button
                key={service.id}
                className={`service-btn ${activeService.id === service.id ? "active" : ""}`}
                onClick={() => setActiveService(service)}
              >
                <div className="btn-content">
                  <span className="btn-number">
                    0{services.indexOf(service) + 1}
                  </span>
                  <div className="btn-text">
                    <h4>{service.label}</h4>
                    <p>{service.description}</p>
                  </div>
                </div>
                <div className="btn-progress"></div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Visual Comparison */}
        <div className="content-right" ref={rightRef}>
          <div className="comparison-card">
            <div
              className="image-comparison-container"
              ref={sliderRef}
              onMouseDown={startDragging}
              onTouchStart={startDragging}
            >
              <img
                src={activeService.after}
                alt="After treatment"
                className="img-after"
              />
              <div
                className="img-before-wrapper"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <img
                  src={activeService.before}
                  alt="Before treatment"
                  className="img-before"
                />
              </div>

              {/* Slider Handle */}
              <div
                className="comparison-handle"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="handle-line"></div>
                <div className="handle-circle">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 8L22 12L18 16M6 8L2 12L6 16" />
                  </svg>
                </div>
              </div>

              {/* Labels */}
              <div
                className="label-tag before-tag"
                style={{ opacity: sliderPos > 10 ? 1 : 0 }}
              >
                Before
              </div>
              <div
                className="label-tag after-tag"
                style={{ opacity: sliderPos < 90 ? 1 : 0 }}
              >
                After
              </div>
            </div>

            <div className="card-footer">
              <div className="footer-info">
                <span className="status-dot"></span>
                <p>
                  Visible results after{" "}
                  {activeService.id === "hair" ? "6 months" : "3 sessions"}
                </p>
              </div>
              <button className="consultation-link">View Case Study</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
