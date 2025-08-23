import { useEffect, useState, useRef } from "react";
import useScrollStore from "../zustand/useScrollStore";
import { useLocation } from "react-router-dom";
import useHideCometShower from "../zustand/useHideCometShower";

const CometShower = () => {
  const { scrollY, setScrollY } = useScrollStore();
  const { hideCometShower } = useHideCometShower();
  const [containerHeight, setContainerHeight] = useState(0);
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);
  const containerRef = useRef(null);
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  // Generate stars with random positions
  const generateStars = (count, width, height) => {
    return Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1, // Stars between 1-3px
    }));
  };

  // Generate meteors with random properties
  const generateMeteors = (count, width, height) => {
    return Array.from({ length: count }, () => ({
      left: Math.random() * 100, // Percentage from left
      top: Math.random() * 50, // Percentage from top
      duration: Math.random() * 5 + 3, // 3-8 seconds
      angle: Math.random() * 30 - 45, // -45 to -15 degrees
      length: Math.random() * 200 + 100, // 100-300px
    }));
  };

  // Update container height and generate elements when page changes
  useEffect(() => {
    const updateContainerHeight = () => {
      const height = isHomePage
        ? window.innerHeight
        : document.documentElement.scrollHeight;
      setContainerHeight(height);

      // Generate stars and meteors based on viewport size
      const width = window.innerWidth;
      setStars(generateStars(130, width, height));
      setMeteors(generateMeteors(15, width, height));
    };

    updateContainerHeight();

    // Update on resize
    window.addEventListener("resize", updateContainerHeight);
    return () => window.removeEventListener("resize", updateContainerHeight);
  }, [pathname, isHomePage]);

  // Handle scroll with requestAnimationFrame for performance
  useEffect(() => {
    let rafId;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const requestRef = () => {
      rafId = requestAnimationFrame(() => {
        handleScroll();
        requestRef();
      });
    };

    requestRef();
    return () => cancelAnimationFrame(rafId);
  }, [setScrollY]);

  if (hideCometShower) return null;

  return (
    <div
      ref={containerRef}
      className="comet-shower-container"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: `${containerHeight}px`,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
        transform: `translate3d(0px, ${-scrollY / 5}px, 0px)`,
        willChange: "transform",
      }}
    >
      {/* Render stars */}
      {stars.map((star, index) => (
        <div
          key={`star-${index}`}
          style={{
            position: "absolute",
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: "#fff",
            borderRadius: "50%",
            boxShadow: `0 0 ${star.size * 2}px ${
              star.size
            }px rgba(255, 255, 255, 0.8)`,
          }}
        />
      ))}

      {/* Render meteors */}
      {meteors.map((meteor, index) => (
        <div
          key={`meteor-${index}`}
          style={{
            position: "absolute",
            left: `${meteor.left}%`,
            top: `${meteor.top}%`,
            width: `${meteor.length}px`,
            height: "1px",
            transform: `rotate(${meteor.angle}deg)`,
            backgroundImage:
              "linear-gradient(to right, #fff, rgba(255, 255, 255, 0))",
            animation: `meteor ${meteor.duration}s linear infinite`,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "4px",
              height: "5px",
              borderRadius: "50%",
              marginTop: "-2px",
              background: "rgba(255, 255, 255, 0.7)",
              boxShadow: "0 0 15px 3px #fff",
            }}
          />
        </div>
      ))}

      {/* Add animation styles */}
      <style>
        {`
          @keyframes meteor {
            0% {
              opacity: 1;
              margin-top: -300px;
              margin-right: -300px;
            }
            12% {
              opacity: 0;
            }
            15% {
              margin-top: 300px;
              margin-left: -600px;
              opacity: 0;
            }
            100% {
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default CometShower;
