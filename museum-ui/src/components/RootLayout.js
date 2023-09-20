import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import {
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress,
  Typography
} from "@mui/material";

import { closeAlert, selectAlert } from "@features/alertSlice";
import { selectMask } from "@features/maskSlice";

import Footer from "./Footer";
import Header from "./Header";
import ScrollToTop from "./ScrollToTop";

export default function RouteLayout() {
  const alert = useSelector(selectAlert);
  const mask = useSelector(selectMask);

  const dispatch = useDispatch();

  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(null);

  useLayoutEffect(() => {
    setHeaderHeight(headerRef.current.offsetHeight);
  }, []);

  useEffect(() => {
    function handleResize() {
      if (headerHeight !== headerRef.current.offsetHeight) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [headerHeight]);

  const handleClose = () => dispatch(closeAlert());

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alert.open}
        autoHideDuration={2000}
        onClose={handleClose}
        sx={{ bottom: "50%" }}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={alert.severity}
        >
          {alert.err}
        </Alert>
      </Snackbar>

      <Backdrop
        open={mask.loading}
        sx={{
          zIndex: 1000,
          backdropFilter: "blur(2px)",
          color: "white",
          display: "flex",
          flexFlow: "column"
        }}
      >
        <CircularProgress color="inherit" />
        <Typography variant="subtitle2">{mask.msg}</Typography>
      </Backdrop>

      <Header ref={headerRef} />
      <Outlet context={headerHeight} />
      <Footer />
      <ScrollToTop />
    </>
  );
}
