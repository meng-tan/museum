import { useEffect, useState } from "react";

import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const FlipTypography = styled(Typography)(
  ({ theme }) => `
  color: ${theme.palette.primary.main};
  font-size: 2rem;
  text-align: center;
  padding: ${theme.spacing(2)} 0;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(2px);
  transform-style: preserve-3d;
  transform-origin: bottom center;
  transition: transform 1.5s ease-out;
`
);

const FadeBox = styled(Box)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  transition: opacity 1.5s ease-in;
  &.fade-in {
    opacity: 1;
    p {
      transform: rotateX(0deg);
    }
  }
  &.fade-out {
    opacity: 0;
    p {
      transform: rotateX(90deg);
    }
  }
`;

function Slideshow({ slides, ...rest }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      if (current === slides.length - 1) {
        setCurrent(0);
      } else {
        setCurrent((cur) => cur + 1);
      }
    }, 4000);

    return () => {
      clearInterval(id);
    };
  }, [current, slides.length]);

  return (
    <Box
      sx={{
        height: "100%",
        position: "relative"
      }}
      {...rest}
    >
      {slides.map((item, index) => (
        <FadeBox
          key={index}
          sx={{
            backgroundImage: `url(${item.url})`
          }}
          className={index === current ? "fade-in" : "fade-out"}
        >
          <Container
            maxWidth="sm"
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              placeContent: "center"
            }}
          >
            <FlipTypography>{item.alt}</FlipTypography>
          </Container>
        </FadeBox>
      ))}
    </Box>
  );
}

export default Slideshow;
