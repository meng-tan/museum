import { useEffect, useRef } from "react";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { debounce } from "@mui/material/utils";

import BackgroundContainer from "./BackgroundContainer";
import Carousel from "./Carousel";
import FadeBanner from "./FadeBanner";
import Slideshow from "./Slideshow";
import Typing from "./Typing";

import bg4 from "@img/archer.jpg";
import bg3 from "@img/cube/cube2.jpg";
import bg2 from "@img/cube/cube3.jpg";
import bg0 from "@img/cube/cube5.jpg";
import bg5 from "@img/dance.jpg";
import bg1 from "@img/gallery2.jpg";
import look from "@img/look.jpg";
import mist from "@img/mist.jpg";
import bg6 from "@img/sculpture.jpg";

const slides = [
  {
    url: bg6,
    alt: "Just Imagine"
  },
  {
    url: bg1,
    alt: "Live Presentations"
  },
  {
    url: bg2,
    alt: "Public Events"
  },
  {
    url: bg3,
    alt: "Lifelong Learning"
  },
  {
    url: bg5,
    alt: "Gifts and Souvenirs"
  },
  {
    url: bg0,
    alt: "Explore the Museum"
  },
  {
    url: bg4,
    alt: "And More"
  }
];

const TopButton = styled(Button)(
  ({ theme }) => `
  position: fixed;
  bottom: 3vw;
  right: 3vw;
  min-width: min-content;
  padding: ${theme.spacing(1)};
  border-radius: 50%;
  opacity: 0;
  transform: translateY(3vw);
  transition: all .5s ease;
  &.show {
    opacity: 1;
    transform: none;
  }
`
);

export default function Home() {
  const homeRef = useRef();
  // const navigate = useNavigate();

  useEffect(() => {
    const handleTopBtn = () => {
      const scrollToTopBtn = document.getElementById("top");
      const rootElement = document.documentElement;
      // const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
      if (rootElement.scrollTop / rootElement.clientHeight > 1) {
        scrollToTopBtn.classList.add("show");
      } else {
        scrollToTopBtn.classList.remove("show");
      }
    };
    document.addEventListener("scroll", handleTopBtn);

    return () => {
      document.removeEventListener("scroll", handleTopBtn);
    };
  }, []);

  const handleHashSegment = () => {
    const homeElement = homeRef.current;
    const rootElement = document.documentElement;
    const ratio = rootElement.scrollTop / homeElement.clientHeight;
    if (ratio <= 0.125) {
      if (location.hash !== "#bg1") {
        history.replaceState({}, undefined, "/#bg1");
        // navigate("/#bg1");
      }
    } else if (ratio > 0.125 && ratio <= 0.375) {
      if (location.hash !== "#bg2") {
        history.replaceState({}, undefined, "/#bg2");
      }
    } else if (ratio > 0.375 && ratio <= 0.625) {
      if (location.hash !== "#bg3") {
        history.replaceState({}, undefined, "/#bg3");
      }
    } else {
      if (location.hash !== "#bg4") {
        history.replaceState({}, undefined, "/#bg4");
      }
    }
  };

  useEffect(() => {
    const debouncedHandleHashSegment = debounce(handleHashSegment, 500);
    document.addEventListener("scroll", debouncedHandleHashSegment);
    return () => {
      document.removeEventListener("scroll", debouncedHandleHashSegment);
    };
  }, []);

  return (
    <Box component="main" ref={homeRef}>
      <BackgroundContainer
        bgImg={look}
        id="bg1"
        nextAnchor={"#bg2"}
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.15)",
          backgroundBlendMode: "multiply"
        }}
      >
        <Typing />
      </BackgroundContainer>

      <BackgroundContainer bgImg={mist} id="bg2" nextAnchor={"#bg3"}>
        <FadeBanner />
      </BackgroundContainer>

      <BackgroundContainer id="bg3" nextAnchor={"#bg4"}>
        <Slideshow slides={slides} />
      </BackgroundContainer>

      <BackgroundContainer
        sx={{
          backgroundImage: `linear-gradient(-225deg, #5271C4 0%, #B19FFF 48%, #ECA1FE 100%)`
        }}
        id="bg4"
      >
        <Box
          sx={{
            height: "100%",
            p: "0 2vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            rowGap: "0.5rem",
            color: "primary.main"
          }}
        >
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              textTransform: "uppercase",
              color: (theme) => theme.palette.primary.contrastText
            }}
          >
            Featured
          </Typography>
          <Carousel />
        </Box>
      </BackgroundContainer>

      <TopButton href="#bg1" id="top" variant="contained">
        <ArrowUpwardIcon />
      </TopButton>
    </Box>
  );
}
