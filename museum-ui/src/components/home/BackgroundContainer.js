import { keyframes } from "@emotion/react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import classNames from "classnames";

import { Transition } from "@layout/Transition";

const halo = (theme) => keyframes`
50% {
  box-shadow: inset 0px 0px 10px 10px ${theme.palette.primary.light},
  0px 0px 5px 2px ${theme.palette.primary.main},
  0px 0px 10px 5px rgba(255,255,255,0.7);
}
`;
const BackgroundContainer = ({
  bgImg,
  nextAnchor,
  children,
  sx,
  className,
  ...rest
}) => {
  return (
    <Box
      component="section"
      className={classNames(className, "fixed-bg-img")}
      sx={{
        height: "100vh",
        minHeight: 500,
        position: "relative",
        backgroundImage: bgImg && `url(${bgImg})`,
        ...sx
      }}
      {...rest}
    >
      {children}
      {nextAnchor && (
        <Transition loop={true}>
          <IconButton
            href={nextAnchor}
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              bottom: "15vh",
              color: "primary.contrastText",
              border: "2px dashed #fff",
              animation: (theme) => `${halo(theme)} 4s ease-in-out infinite`
            }}
          >
            <ArrowDownwardIcon />
          </IconButton>
        </Transition>
      )}
    </Box>
  );
};

export default BackgroundContainer;
