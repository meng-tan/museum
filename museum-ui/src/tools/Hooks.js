import { useState, useLayoutEffect } from "react";

import { throttle } from "lodash";
// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px
function getDeviceDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  let mediaSize = null;
  if (width < 600) {
    mediaSize = "xs";
  } else if (width >= 600 && width < 900) {
    mediaSize = "sm";
  } else if (width >= 900 && width < 1200) {
    mediaSize = "md";
  } else if (width >= 1200 && width < 1536) {
    mediaSize = "lg";
  } else {
    mediaSize = "xl";
  }
  return {
    width,
    height,
    mediaSize
  };
}

export function useDeviceDimensions() {
  const [deviceDimensions, setDeviceDimensions] = useState(
    getDeviceDimensions()
  );

  const handleResize = () => setDeviceDimensions(getDeviceDimensions());

  useLayoutEffect(() => {
    window.addEventListener("resize", throttle(handleResize, 500));
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceDimensions;
}
