import { useState, useEffect } from "react";

const useMobileView = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 820);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 820);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isMobile };
};

export default useMobileView;
