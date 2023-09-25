import { useEffect, useState } from "react";

import { keyframes, css } from "@emotion/react";
import { Box, Typography } from "@mui/material";

const caret = keyframes`
  from {
    border-right: 1px solid #fff;
  }
  to {
    border-right-color: transparent;
  }
`;

const CharSpan = ({ children, ...rest }) => (
  <span
    {...rest}
    css={css`
      visibility: hidden;
      transition: visibility 0.2s ease;
      &.show {
        visibility: visible;
        animation: ${caret} 0.4s ease 1;
      }
    `}
  >
    {children}
  </span>
);

const p = "Explore the beauty of 5000 years.";

export default function Typing() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (i === p.length) {
        clearInterval(id);
      } else {
        setCurrent(i++);
      }
    }, 200);

    return () => clearInterval(id);
  }, []);

  return (
    <Box
      sx={{
        height: "100%",
        width: {
          xs: "75%",
          md: "100%"
        },
        m: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Typography
        sx={{
          fontSize: "2.5rem",
          textTransform: "capitalize",
          color: (theme) => theme.palette.primary.contrastText,
          textShadow: "var(--text-shadow-gray)"
        }}
      >
        {[...p].map((char, index) => (
          <CharSpan key={index} className={current >= index ? "show" : ""}>
            {char}
          </CharSpan>
        ))}
      </Typography>
    </Box>
  );
}
