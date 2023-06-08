import { useDispatch } from "react-redux";
import { Outlet, useLocation, Link } from "react-router-dom";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { thunkedLogIn } from "../../features/userSlice";

function AuthPageLayout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isSignupPage = location.pathname.includes("signup");

  const onSuccess = (res) => dispatch(thunkedLogIn(res));

  return (
    <Container
      maxWidth="xs"
      sx={{
        py: 2
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: {
            xs: 2,
            sm: 3
          }
        }}
      >
        <Typography variant="h5" textAlign="center" gutterBottom>
          {isSignupPage ? "Sign Up" : "Log In"}
        </Typography>
        <Outlet context={[onSuccess]} />
        <Typography
          align="right"
          variant="body2"
          sx={{
            display: "block",
            my: 2,
            color: (theme) => `${theme.palette.primary.light} !important`
          }}
          component={Link}
          to={isSignupPage ? "/login" : "/signup"}
        >
          {isSignupPage
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </Typography>

        {/* <GoogleAuth /> */}
      </Paper>
    </Container>
  );
}

export default AuthPageLayout;
