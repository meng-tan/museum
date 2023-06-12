import { useEffect, useState } from "react";

import { keyframes } from "@emotion/react";
import { Box, Typography } from "@mui/material";

const caret = keyframes`
  50% {
    border-right-color: transparent;
  }
`;

const p = "Explore the beauty of 5000 years.";

export default function Typing() {
  const [text, setText] = useState("");

  useEffect(() => {
    let i = 1;
    const id = setInterval(() => {
      if (i > p.length) {
        clearInterval(id);
      } else {
        setText(p.substring(0, i++));
      }
    }, 200);

    return () => clearInterval(id);
  }, []);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex"
      }}
    >
      <Typography
        sx={{
          margin: "auto",
          fontSize: "2.5rem",
          textTransform: "capitalize",
          color: (theme) => theme.palette.primary.contrastText,
          borderRight: (theme) =>
            `1px solid ${theme.palette.primary.contrastText}`,
          animation: `${caret} 1s steps(1) infinite`
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}
