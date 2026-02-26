import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Loader.css";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const slides = [
  {
    image: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1772017141/PL-1_wm3gpn.jpg`,
    tag: "Youthful Radiance",
    position: "top-left",
  },
  {
    image: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1772017209/PL-2_mviua8.jpg`,
    tag: "Clinical Precision",
    position: "mid-right",
  },
  {
    image: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1772017313/PL-3_ye1kcl.jpg`,
    tag: "Clear Complexion",
    position: "bottom-left",
  },
];

const marquee =
  "SCIENCE-DRIVEN SKINCARE / CLINICAL BEAUTY / PREMIUM FORMULATION / MADE FOR YOU / ";

const IMAGE_DURATION = 2600;
const TOTAL_IMAGES = slides.length;
const MIN_LOADER_TIME = IMAGE_DURATION * TOTAL_IMAGES;

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);
  const [startAnim, setStartAnim] = useState(false);
  const [revealedTags, setRevealedTags] = useState([]);

  useEffect(() => {
    // Initial entrance delay
    const entranceTimeout = setTimeout(() => {
      setStartAnim(true);
      // Reveal the first tag slightly after the circle appears
      setTimeout(() => setRevealedTags([0]), 800);
    }, 300);

    const startTime = Date.now();

    // Progress percentage logic
    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percent = Math.min((elapsed / MIN_LOADER_TIME) * 100, 100);
      setProgress(Math.floor(percent));

      if (percent >= 100) {
        clearInterval(progressTimer);
        setTimeout(() => onComplete(), 800);
      }
    }, 16);

    // Slide and Tag Sync logic
    const imageTimer = setInterval(() => {
      setImgIndex((prev) => {
        const next = (prev + 1) % slides.length;

        // Sync Tag: Delay the tag appearance so it reveals AFTER the image starts fading in
        setTimeout(() => {
          setRevealedTags((old) => {
            if (old.includes(next)) return old;
            return [...old, next];
          });
        }, 600); // 600ms delay ensures image is visible before tag pops

        return next;
      });
    }, IMAGE_DURATION);

    return () => {
      clearTimeout(entranceTimeout);
      clearInterval(progressTimer);
      clearInterval(imageTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="loader"
      exit={{
        y: "-100%",
        transition: {
          duration: 1.2,
          ease: [0.76, 0, 0.24, 1],
        },
      }}
    >
      <div className="grain"></div>

      <div className="marquee">
        <motion.div
          className="marquee-track"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {marquee.repeat(12)}
        </motion.div>
      </div>

      <div className="center">
        <motion.div
          className="circle"
          initial={{
            scale: 0.15,
            opacity: 0,
            rotate: -8,
          }}
          animate={{
            scale: startAnim ? 1 : 0.15,
            opacity: 1,
            rotate: 0,
          }}
          transition={{
            duration: 1.8,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <motion.div
            className="light-sweep"
            animate={{ x: ["-150%", "150%"] }}
            transition={{
              duration: 2.8,
              ease: [0.45, 0, 0.25, 1],
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />

          <AnimatePresence mode="wait">
            <motion.img
              key={imgIndex}
              src={slides[imgIndex].image}
              className="circle-img"
              initial={{
                opacity: 0,
                scale: 1.06,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 1.02,
              }}
              transition={{
                duration: 1.2,
                ease: "easeInOut",
              }}
            />
          </AnimatePresence>
        </motion.div>

        {/* PREMIUM TAGS */}
        <div className="persistent-tags">
          <AnimatePresence>
            {revealedTags.map((index) => (
              <motion.div
                key={index}
                className={`tag persistent ${slides[index].position}`}
                initial={{
                  opacity: 0,
                  y: 20,
                  scale: 0.8,
                  filter: "blur(8px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                  // Gentle spring-like entrance for premium feel
                  type: "spring",
                  stiffness: 80,
                  damping: 15,
                }}
              >
                <span className="tag-dot"></span>
                {slides[index].tag}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="title-mask">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{
              y: startAnim ? 0 : 100,
              opacity: 1,
            }}
            transition={{
              duration: 1.4,
              delay: 0.4,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            Science-Driven Skincare
          </motion.h1>
        </div>

        <motion.div
          className="progress"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {progress}%
        </motion.div>
      </div>
    </motion.div>
  );
}
