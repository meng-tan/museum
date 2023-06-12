import { keyframes } from "@emotion/react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

const halo = (theme) => keyframes`
50% {
  box-shadow: inset 0px 0px 10px 10px ${theme.palette.primary.light},
  0px 0px 5px 2px ${theme.palette.primary.main},
  0px 0px 10px 5px rgba(255,255,255,0.7);
}
`;
const BackgroundContainer = ({ bgImg, nextAnchor, children, sx, ...rest }) => {
  return (
    <Box
      component="section"
      sx={{
        height: "100vh",
        minHeight: 500,
        position: "relative",
        backgroundAttachment: "fixed",
        backgroundImage: bgImg && `url(${bgImg})`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        ...sx
      }}
      {...rest}
    >
      {children}
      {nextAnchor && (
        <IconButton
          href={nextAnchor}
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: "3vw",
            color: (theme) => theme.palette.primary.contrastText,
            border: "1px dashed #fff",
            animation: (theme) => `${halo(theme)} 4s ease-in-out infinite`
          }}
        >
          <ArrowDownwardIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default BackgroundContainer;
