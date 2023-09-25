import { useEffect, useRef } from "react";

import { Typography, Box } from "@mui/material";
import debounce from "lodash/debounce";

import ButtonToTop from "@layout/ButtonToTop";

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

export default function Home() {
  const homeRef = useRef();
  // const navigate = useNavigate();

  useEffect(() => {
    const iOS = /(iPad|iPhone)/i.test(navigator.userAgent);
    if (iOS) {
      const collection = document.getElementsByClassName("fixed-bg-img");
      for (let i = 0; i < collection.length; i++) {
        collection[i].classList.add("ios-fixed-fallback");
      }
    }
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
    <Box ref={homeRef}>
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
            variant="h4"
            sx={{
              textAlign: "center",
              textTransform: "uppercase",
              color: "primary.contrastText"
            }}
          >
            Featured
          </Typography>
          <Carousel />
        </Box>
      </BackgroundContainer>

      <ButtonToTop />
    </Box>
  );
}
