import { useEffect } from "react";

import { Typography, Box, Grid, Grow } from "@mui/material";

import { Transition } from "@layout/Transition";
import { APP } from "@tools/constant";

import bg from "@img/pearl.jpg";

export default function About() {
  useEffect(() => {
    const gridBoxes = document.getElementsByClassName("grid-box");
    const queue = [];
    for (let i = 0; i < gridBoxes.length; i++) {
      const id = setTimeout(() => {
        gridBoxes[i]?.classList.add("show");
      }, i * 200);
      queue.push(id);
    }
    return () => {
      queue.forEach(clearTimeout);
    };
  }, []);

  return (
    <Grid container sx={{ minHeight: "inherit" }}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          minHeight: "inherit",
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)"
        }}
      >
        {Array.from({ length: 9 }, (_, i) => i + 1).map((_, index) => (
          <Box
            key={index}
            className="grid-box"
            sx={{
              border: "2px solid rgba(255, 255, 255, 0.5)",
              background: "#fff",
              transition: "background 0.5s ease",
              "&.show": {
                background: "rgba(0, 0, 0, 0.4)",
                "&:nth-of-type(5n)": {
                  background: "transparent"
                },
                "&:hover": {
                  background: "transparent"
                }
              }
            }}
          />
        ))}
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          py: 4
        }}
      >
        <Box
          sx={{
            width: "max(60%, 300px)",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 1
          }}
        >
          <Transition component={Grow} threshold={1}>
            <Typography variant="h4" color="primary.light">
              About Us
            </Typography>
          </Transition>
          <Transition delay={4} component={Grow} threshold={0.2}>
            <Typography variant="body1">
              An internationally renowned art museum and one of the most
              significant architectural icons of the 20th century, the{" "}
              {APP.NAME} is at once a vital cultural center, an educational
              institution, and the heart of an international network of museums.
              Visitors can experience special exhibitions of modern and
              contemporary art, lectures by artists and critics, performances
              and film screenings, classes for teens and adults, and daily tours
              of the galleries led by museum educators. Founded on a collection
              of early modern masterpieces, the {APP.NAME} today is an
              ever-evolving institution devoted to the art of the 20th century
              and beyond.
            </Typography>
          </Transition>
        </Box>
      </Grid>
    </Grid>
  );
}
