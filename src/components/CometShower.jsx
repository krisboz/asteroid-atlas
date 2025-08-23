import { useEffect, useState } from "react";
import "../styles/components/CometShower.scss";
import useScrollStore from "../zustand/useScrollStore";
import { useLocation } from "react-router-dom";
import useHideCometShower from "../zustand/useHideCometShower";

//Background animation with stars, shooting stars and a parallax effect
//Stars are just text shadows of the .star div

const CometShower = () => {
  const { scrollY, setScrollY } = useScrollStore();
  const { hideCometShower, setHideCometShower } = useHideCometShower();
  const [limitHeight, setLimitHeight] = useState(false);
  const [currPage, setCurrPage] = useState(null);
  const { pathname } = useLocation();

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  let rafId;

  //Using request animation frame for capturing the scroll value
  //to hopefully make it more optimized
  //It was good fun to try to figure out an acceptable way of doing it on my own

  //Next time im probably just gonna use a library just for the fine control out of the box
  const requestRef = () => {
    rafId = requestAnimationFrame(() => {
      handleScroll();
      requestRef();
    });
  };

  useEffect(() => {
    requestRef();

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    setLimitHeight(pathname === "/");
    setCurrPage(pathname.split("/")[1]);
  }, [pathname]);

  return (
    <>
      {!hideCometShower && (
        <div
          className="meteor-shower-container"
          style={{
            willChange: "transform",
            transform: `translate3d(0px, ${-scrollY / 5}px, 0px)`,
            minHeight: "100vh",
          }}
        >
          <div className="star"></div>
          <div className="meteor-1"></div>
          <div className="meteor-2"></div>
          <div className="meteor-3"></div>
          <div className="meteor-4"></div>
          <div className="meteor-5"></div>
          <div className="meteor-6"></div>
          <div className="meteor-7"></div>
          <div className="meteor-8"></div>
          <div className="meteor-9"></div>
          <div className="meteor-10"></div>
          <div className="meteor-11"></div>
          <div className="meteor-12"></div>
          <div className="meteor-13"></div>
          <div className="meteor-14"></div>
          <div className="meteor-15"></div>
        </div>
      )}
    </>
  );
};

export default CometShower;
