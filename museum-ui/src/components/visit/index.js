import { Typography, Box, Grid } from "@mui/material";

import bg from "@img/pearl.jpg";

export default function Visit() {
  return (
    <Grid container sx={{ minHeight: "inherit" }}>
      <Grid
        item
        sm={false}
        md={6}
        sx={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(3, 1fr)"
          }}
        >
          {Array.from({ length: 9 }, (v, i) => i + 1).map((_, index) => (
            <Box
              key={index}
              sx={{
                border: "2px solid rgba(255, 255, 255, 0.5)",
                background: "rgba(0, 0, 0, 0.5)",
                "&:nth-of-type(5n)": {
                  background: "transparent"
                },
                "&:hover": {
                  background: "transparent"
                }
              }}
            />
          ))}
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex"
        }}
      >
        <Box
          sx={{
            width: "max(50%, 300px)",
            margin: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 2
          }}
        >
          <Box gridColumn="span 4">
            <Typography variant="h4" color="primary.light">
              Stay connected.
            </Typography>
            <Typography variant="subtitle2">
              Sign up to receive email updates on our exhibitions, events, and
              more.
            </Typography>
          </Box>

          <Box gridColumn="span 2"></Box>

          <Box gridColumn="span 2"></Box>

          <Box gridColumn="span 4"></Box>
        </Box>
      </Grid>
    </Grid>
  );
}
