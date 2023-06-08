import { useState, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Navigate } from "react-router-dom";

import { selectUser } from "../features/userSlice";

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

  const handleResize = () => {
    setDeviceDimensions(getDeviceDimensions());
  };

  useLayoutEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceDimensions;
}

// import { useTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";
// export function useWidth() {
//   const theme = useTheme();
//   const keys = [...theme.breakpoints.keys].reverse();
//   return (
//     keys.reduce((output, key) => {
//       // eslint-disable-next-line react-hooks/rules-of-hooks
//       const matches = useMediaQuery(theme.breakpoints.up(key));
//       return !output && matches ? key : output;
//     }, null) || "xs"
//   );
// }

export const withAuth = (WrappedComponent) => {
  const HocComponent = (props) => {
    const location = useLocation();
    const user = useSelector(selectUser);
    // The use of the useNavigate() hook and the <Navigate> component for navigating both imperatively after the login form is submitted and declaratively when a non-authenticated user visits a particular route
    // The use of location.state to preserve the previous location so you can send the user there after they authenticate
    return user.isLoggedIn ? (
      <WrappedComponent {...props} />
    ) : (
      <Navigate to="/login" state={{ from: location }} />
    );
  };

  return HocComponent;
};
