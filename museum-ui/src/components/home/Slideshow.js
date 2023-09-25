import { useEffect, useState } from "react";

import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import classNames from "classnames";

const FlipTypography = styled(Typography)(
  ({ theme }) => `
  color: ${theme.palette.primary.main};
  font-size: 2rem;
  text-align: center;
  text-shadow: 1px 1px 2px ${theme.palette.primary.contrastText},
   0 0 1rem ${theme.palette.primary.light};
  padding: ${theme.spacing(2)} 0;
  border: 1.5px solid ${theme.palette.primary.contrastText};
  border-radius: 2rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 1rem 1rem;
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
  transition: opacity 1.5s ease-in;
  opacity: 0;
  p {
    transform: rotateX(90deg);
  }
  &.fade-in {
    opacity: 1;
    p {
      transform: rotateX(0deg);
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
  }, [current, slides]);

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
          className={classNames("fixed-bg-img", {
            "fade-in": index === current
          })}
        >
          <Container
            maxWidth="xs"
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
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
