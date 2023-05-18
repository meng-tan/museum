import { useEffect, useState, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";

import { deepPurple } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// eslint-disable-next-line import/no-unresolved
import UserService from "@service/UserService";

import { HeaderContext } from "@tools/Context";

import AuthOptionPage from "./components/auth/AuthOptionPage";
import AuthPageLayout from "./components/auth/AuthPageLayout";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Checkout from "./components/checkout";
import ExhibitionContainer from "./components/exhibitions";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/home";
import Orders from "./components/orders";
import PageNotFound from "./components/PageNotFound";
import RouteLayout from "./components/RouteLayout";
import Ticket from "./components/tickets";

const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[500]
    }
  },
  typography: {
    fontFamily: ["cursive", "Georgia", "Roboto", "sans-serif"].join(",")
  },
  components: {
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        // root: {
        // Some CSS
        // }
      }
    }
  }
});

const ProtectedRoute = () => {
  const location = useLocation();

  return UserService.getInstance().isLoggedIn() ? (
    <Outlet />
  ) : (
    // The use of the useNavigate() hook and the <Navigate> component for navigating both imperatively after the login form is submitted and declaratively when a non-authenticated user visits a particular route
    // The use of location.state to preserve the previous location so you can send the user there after they authenticate
    <Navigate to="/auth" state={{ from: location }} replace />
  );
};

function App() {
  const headerRef = useRef(null);
  const [height, setHeight] = useState(null);

  const { pathname } = useLocation();

  useLayoutEffect(() => {
    setHeight(headerRef.current.offsetHeight);
  }, []);

  useEffect(() => {
    function handleResize() {
      if (height !== headerRef.current.offsetHeight) {
        setHeight(headerRef.current.offsetHeight);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [height]);

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }, [pathname]);

  return (
    <ThemeProvider theme={theme}>
      <Header ref={headerRef} />
      <HeaderContext.Provider value={height}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<RouteLayout />}>
            <Route path="auth">
              <Route index element={<AuthOptionPage />} />
              <Route element={<AuthPageLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
              </Route>
            </Route>

            <Route path="exhibitions" element={<ExhibitionContainer />} />
            <Route path="exhibitions/:id" element={<Ticket />} />

            <Route path="exhibitions/:id/checkout" element={<Checkout />} />
            <Route element={<ProtectedRoute />}>
              <Route path="orders" element={<Orders />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </HeaderContext.Provider>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
