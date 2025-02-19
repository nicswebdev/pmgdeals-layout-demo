import { useState, useEffect } from "react";

const useResponsiveWidth = () => {
  const [width, setWidth] = useState(0);

  const screenSizes = {
    xs: 390,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    "2xl": 1400,
    "3xl": 1600,
    "4xl": 1800,
    "5xl": 2000,
  };

  useEffect(() => {
    // Set the initial width after component mount
    setWidth(window.innerWidth);

    // Update the width when the window is resized
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    width,
    screenSizes,
    // Get the screen size based on the current width
    currentScreenSize: Object.keys(screenSizes).find(
      (screen) => screenSizes[screen] < width
    ),
  };
};

export default useResponsiveWidth;
