import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { keyframes } from "@emotion/react";
import { Typography, Button, Box } from "@mui/material";

const slideFromLeft = keyframes`
0% {
  opacity: 0;
  transform: translate3d(-100%,0,0);
}
100% {
  opacity: 1;
  transform: translate3d(0,0,0);
}
`;

const slideFromRight = keyframes`
0% {
  opacity: 0;
  transform: translate3d(100%,0,0);
}
100% {
  opacity: 1;
  transform: translate3d(0,0,0);
}
`;

const FadeBanner = () => {
  const domRef = useRef();
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const ele = domRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.5
      }
    );

    observer.observe(ele);

    return () => observer.unobserve(ele);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        top: "50%",
        transform: "translateY(-50%)",
        width: {
          md: "75%"
        },
        m: {
          xs: 1,
          md: "auto"
        },
        border: "2vw solid rgba(255,255,255,.7)",
        padding: "2vw",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        color: "primary.contrastText",
        transition: "opacity 1.5s ease-in, visibility 1.5s ease-in",
        "&.hide": {
          opacity: 0,
          visibility: "hidden"
        },
        "&.visible": {
          opacity: 1,
          visibility: "visible"
        }
      }}
      ref={domRef}
      className={isVisible ? "visible" : "hide"}
    >
      <Typography
        variant="h6"
        textTransform="uppercase"
        sx={{
          animation: isVisible && `${slideFromLeft} 2s ease`
        }}
      >
        Highlight
      </Typography>
      <Typography
        variant="h4"
        sx={{
          mt: 2,
          mb: 1,
          animation: isVisible && `${slideFromLeft} 1s ease`,
          color: "primary.main",
          textShadow: (theme) =>
            `2px 2px 2px ${theme.palette.primary.contrastText}, 0 0 1rem ${theme.palette.primary.light}`
        }}
      >
        Monet: Painting the French Landscape
      </Typography>
      <Typography
        variant="body1"
        sx={{
          mb: 4,
          color: "primary.contrastText",
          animation: isVisible && `${slideFromLeft} 3s ease`
        }}
      >
        Through Dec 23, 2023
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to="/exhibitions"
        sx={{
          m: "auto",
          animation: isVisible && `${slideFromRight} 4s ease`
        }}
      >
        More Exhibitions
      </Button>
    </Box>
  );
};

export default FadeBanner;
