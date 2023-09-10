// import { StrictMode } from "react";
import { Provider } from "react-redux";

import { deepPurple } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.less";
import * as serviceWorker from "./serviceWorker";
import store from "./store";

const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[500]
    }
  },
  typography: {
    fontFamily: ["Georgia", "serif", "Roboto", "sans-serif"].join(",")
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

const root = createRoot(document.getElementById("root"));
root.render(
  // <StrictMode>
  <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </LocalizationProvider>
  </Provider>
  // </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
