import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { keyframes } from "@emotion/react";
import { Typography, Button, Container } from "@mui/material";
import { styled } from "@mui/material/styles";

const slideFromLeft = keyframes`
0% {
  opacity: 0;
  transform: translate3d(-50%,0,0);
}
100% {
  opacity: 1;
  transform: translate3d(0,0,0);
}
`;

const slideFromRight = keyframes`
0% {
  opacity: 0;
  transform: translate3d(50%,0,0);
}
100% {
  opacity: 1;
  transform: translate3d(-50%,0,0);
}
`;

const FadeBox = styled(Container)(
  ({ theme }) => `
  color: ${theme.palette.primary.contrastText};
  transition: opacity 1500ms ease-out, visibility 1500ms ease-out;
  &.hide {
    opacity: 0;
    visibility: hidden;
  }
  &.visible {
    opacity: 1;
    visibility: visible;
  }
`
);

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
    <FadeBox
      maxWidth="md"
      sx={{
        position: "relative",
        top: "50%",
        transform: "translateY(-50%)",
        border: "2.5vw solid rgba(255,255,255,.7)",
        padding: "2vw",
        overflow: "hidden"
      }}
      ref={domRef}
      className={isVisible ? "visible" : "hide"}
    >
      <Typography
        variant="overline"
        component={"p"}
        sx={{
          animation: isVisible && `${slideFromLeft} 2s ease`
        }}
      >
        Ticketed Exhibition
      </Typography>
      <Typography
        variant="h3"
        sx={{
          mt: 2,
          mb: 1,
          fontSize: "2.5rem",
          animation: isVisible && `${slideFromLeft} 1s ease`,
          color: (theme) => theme.palette.primary.main,
          textShadow: (theme) =>
            `2px 2px 2px ${theme.palette.primary.contrastText}, 0 0 1rem ${theme.palette.primary.light}`
        }}
      >
        Monet: Painting the French Landscape
      </Typography>
      <Typography
        variant="h6"
        sx={{
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
          mt: 4,
          left: "50%",
          transform: "translateX(-50%)",
          animation: isVisible && `${slideFromRight} 4s ease`
        }}
      >
        More Exhibitions
      </Button>
    </FadeBox>
  );
};

export default FadeBanner;
