import GoogleLogin from "react-google-login";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";

// eslint-disable-next-line import/no-unresolved
import UserService from "@service/UserService";

import { config } from "../../config";

import bg from "@img/pearl.jpg";

const useStyles = makeStyles((theme) => ({
  google: {
    width: "100%"
  }
}));

export default function AuthOptionPage(props) {
  const classes = useStyles();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const responseGoogle = (response) => {
    UserService.getInstance()
      .googleLogin(response)
      .then(() => {
        // The use of navigate("...", { replace: true }) to replace the /login route in the history stack so the user doesn't return to the login page when clicking the back button after logging in
        // navigate("...", { replace: true })
        navigate(from, { replace: true });
      });
  };

  return (
    <Grid container sx={{ minHeight: "inherit" }}>
      <Grid
        item
        sm={false}
        md={6}
        sx={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(3, 1fr)"
          }}
        >
          {Array.from({ length: 9 }, (v, i) => i + 1).map((_, index) => (
            <Box
              key={index}
              sx={{
                border: "2px solid rgba(255, 255, 255, 0.5)",
                background: "rgba(0, 0, 0, 0.5)",
                "&:nth-of-type(5n)": {
                  background: "transparent"
                },
                "&:hover": {
                  background: "transparent"
                }
              }}
            />
          ))}
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex"
        }}
      >
        <Box
          sx={{
            width: "max(50%, 300px)",
            margin: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 2
          }}
        >
          <Box gridColumn="span 4">
            <GoogleLogin
              className={classes.google}
              clientId={config.googleClient}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </Box>

          <Box gridColumn="span 2">
            <Button
              fullWidth
              variant="contained"
              component={Link}
              to="/auth/signup"
            >
              signup
            </Button>
          </Box>

          <Box gridColumn="span 2">
            <Button
              fullWidth
              variant="contained"
              component={Link}
              to="/auth/login"
            >
              Login
            </Button>
          </Box>

          <Box gridColumn="span 4">
            <Typography variant="h4" color="primary.light">
              Stay connected.
            </Typography>
            <Typography variant="subtitle2">
              Sign up to receive email updates on our exhibitions, events, and
              more.
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
