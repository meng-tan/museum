import { Box, Typography, Grow } from "@mui/material";

const arr = [
  {
    p: "explore",
    t: 1000
  },
  {
    p: "the beauty of",
    t: 2000
  },
  {
    p: "5000 years",
    t: 3000
  }
];

export default function GrowText() {
  return (
    <Typography
      component="div"
      sx={{
        height: "100vh",
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
        fontSize: "2.5rem",
        textTransform: "capitalize",
        color: (theme) => theme.palette.primary.contrastText
      }}
    >
      {arr.map((item, index) => (
        <Grow in timeout={item.t} key={index}>
          <Box>{item.p}</Box>
        </Grow>
      ))}
    </Typography>
  );
}
