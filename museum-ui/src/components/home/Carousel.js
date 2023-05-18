import { useState, useLayoutEffect } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

// eslint-disable-next-line import/no-unresolved
import { useDeviceDimensions } from "@tools/Hooks";

const imgArr = [
  {
    img: "img/slider/online.jpg",
    alt: "Publications"
  },
  {
    img: "img/slider/timeline.jpg",
    alt: "Timeline of Art History"
  },
  {
    img: "img/slider/primers.jpg",
    alt: "Primers"
  },
  {
    img: "img/slider/art.jpg",
    alt: "Art at Home"
  },
  {
    img: "img/slider/blogs.jpg",
    alt: "Blogs"
  },
  {
    img: "img/slider/openaccess.jpg",
    alt: "Open Access"
  },
  {
    img: "img/slider/ceramicist.jpg",
    alt: "From the Vaults"
  },
  {
    img: "img/slider/educators.jpg",
    alt: "Resources for Educators"
  },
  {
    img: "img/slider/curatorial.jpg",
    alt: "Collection Areas"
  },
  {
    img: "img/slider/audioguide.jpg",
    alt: "Audio Guide"
  },
  {
    img: "img/slider/150th.jpg",
    alt: "Celebrate 150 years"
  },
  {
    img: "img/slider/project.jpg",
    alt: "The Artist Project"
  }
];

const CardItem = styled(Grid)(
  ({ theme }) => `
  flex-shrink: 0;
  padding: 1vw;
  &:hover > img {
    padding: 0.5rem;
    background: #fff;
    box-shadow: 0.3rem 0.3rem 0.2rem 0.2rem rgba(0, 0, 0, 0.3);
  }
  &:hover > p {
    text-shadow: 0.3rem 0.2rem 0.2rem ${theme.palette.primary.dark}
  }
`
);

const Img = styled("img")(
  ({ theme }) => `
  width: 100%;
  height: 100%;
  object-fit: cover;
  padding: 1.2rem;
  transition: ${theme.transitions.create(["all"], {
    duration: theme.transitions.duration.enteringScreen
  })};
`
);

const ArrowButton = styled(IconButton)(
  ({ theme }) => `
  color:${theme.palette.primary.main};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background:${theme.palette.common.white};
  box-shadow: 0 0.3rem 0.2rem rgba(0, 0, 0, 0.3);
  :hover {
    color: ${theme.palette.primary.contrastText};
    background:${theme.palette.primary.light};
  };
`
);

// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px
const mediaOffset = {
  xs: {
    pageSize: 1
  },
  sm: {
    pageSize: 2
  },
  md: {
    pageSize: 3
  },
  lg: {
    pageSize: 4
  },
  xl: {
    pageSize: 4
  }
};

export default function Carousel() {
  const { mediaSize } = useDeviceDimensions();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(mediaOffset[mediaSize].pageSize);

  useLayoutEffect(() => {
    setPage(0);
    setPageSize(mediaOffset[mediaSize].pageSize);
  }, [mediaSize]);

  const prev = () => {
    if (page > 0) {
      setPage((page) => page - 1);
    }
  };

  const next = () => {
    if (page < imgArr.length / pageSize - 1) {
      setPage((page) => page + 1);
    }
  };

  return (
    <Box
      sx={{
        height: "45vh",
        width: "100%",
        overflow: "hidden",
        position: "relative"
      }}
    >
      <Grid
        container
        wrap="nowrap"
        sx={{
          height: "100%",
          position: "absolute",
          left: `-${100 * page}%`,
          transition: "all 0.4s"
        }}
      >
        {imgArr.map((item) => (
          <CardItem item key={item.img} xs={12} sm={6} md={4} lg={3}>
            <Img src={require(`../../assets/${item.img}`)} alt={item.alt} />
            <Typography
              sx={{
                fontSize: "2rem",
                transform: "translateY(-100%)",
                padding: "2rem",
                color: (theme) => theme.palette.primary.contrastText
              }}
            >
              {item.alt}
            </Typography>
          </CardItem>
        ))}
      </Grid>

      <ArrowButton onClick={prev} sx={{ left: 0 }} disabled={page === 0}>
        <ArrowBackIcon />
      </ArrowButton>

      <ArrowButton
        onClick={next}
        sx={{ right: 0 }}
        disabled={page === imgArr.length / pageSize - 1}
      >
        <ArrowForwardIcon />
      </ArrowButton>
    </Box>
  );
}
