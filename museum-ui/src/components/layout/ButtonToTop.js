import { useEffect } from "react";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Button } from "@mui/material";
import debounce from "lodash/debounce";

export default function ButtonToTop() {
  useEffect(() => {
    const handleTopBtn = debounce(() => {
      const scrollToTopBtn = document.getElementById("top");
      const rootElement = document.documentElement;
      // const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
      if (rootElement.scrollTop / rootElement.clientHeight > 1) {
        scrollToTopBtn.classList.add("show");
      } else {
        scrollToTopBtn.classList.remove("show");
      }
    }, 500);
    document.addEventListener("scroll", handleTopBtn);

    return () => {
      document.removeEventListener("scroll", handleTopBtn);
    };
  }, []);

  return (
    <Button
      href="#bg1"
      id="top"
      variant="contained"
      sx={{
        position: "fixed",
        bottom: {
          md: "10vh",
          xs: "50px"
        },
        right: {
          md: "10vh",
          xs: "50px"
        },
        minWidth: "min-content",
        p: 1,
        borderRadius: "50%",
        opacity: 0,
        transform: "translateY(10vh)",
        transition: "all .5s ease",
        "&.show": {
          opacity: 1,
          transform: "none"
        }
      }}
    >
      <ArrowUpwardIcon />
    </Button>
  );
}
