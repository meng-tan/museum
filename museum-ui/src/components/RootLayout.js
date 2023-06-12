import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";

import { Snackbar, Alert } from "@mui/material";

import { closeAlert, selectAlert } from "@features/alertSlice";

import Footer from "./Footer";
import Header from "./Header";

export default function RouteLayout() {
  const { pathname } = useLocation();
  const alert = useSelector(selectAlert);
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

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }, [pathname]);

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

      <Header ref={headerRef} />
      <Outlet context={headerHeight} />
      <Footer />
    </>
  );
}
