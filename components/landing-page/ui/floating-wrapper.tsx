"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";

export default function FloatingWrapper({ children }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
  });

  const rectRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const handleMouseEnter = (e) => {
    rectRef.current = e.currentTarget.getBoundingClientRect();
    setHovered(true);
  };

  const handleMouseMove = (e) => {
    if (!rectRef.current) return;

    const { left, top, width, height } = rectRef.current;

    if (!width || !height) return;

    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setTilt({
      rotateX: (0.5 - y) * 12,
      rotateY: (x - 0.5) * 12,
    });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
    rectRef.current = null;
  };

  return (
    <motion.div
      animate={{
        y: reduceMotion || hovered ? 0 : [0, -6, 0],
        rotateX: hovered ? tilt.rotateX : 0,
        rotateY: hovered ? tilt.rotateY : 0,
        scale: hovered ? 1.01 : 1,
      }}
      transition={
        hovered
          ? { duration: 0.15, ease: "easeOut" }
          : reduceMotion
            ? { duration: 0 }
            : {
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotateX: { duration: 0.2 },
                rotateY: { duration: 0.2 },
                scale: { duration: 0.2 },
              }
      }
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        boxShadow: hovered
          ? "0 16px 32px rgba(0,0,0,0.3)"
          : "0 4px 10px rgba(0,0,0,0.12)",
      }}
      className="relative w-full min-w-0 rounded-2xl"
    >
      {children}
    </motion.div>
  );
}