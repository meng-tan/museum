import { Outlet, useLocation, Link } from "react-router-dom";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

function AuthPageLayout() {
  const { pathname } = useLocation();
  const isSignupPage = pathname.includes("signup");
  return (
    <Container
      maxWidth="xs"
      sx={{
        pt: {
          xs: 2,
          sm: 3
        }
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: {
            xs: 2,
            sm: 3,
            md: 4
          }
        }}
      >
        <Typography variant="h5" textAlign="center" mb={1}>
          {isSignupPage ? "Sign Up" : "Log In"}
        </Typography>
        <Outlet />
        <Typography
          align="right"
          variant="body2"
          sx={{
            display: "block",
            mt: 2,
            color: (theme) => `${theme.palette.primary.light} !important`
          }}
          component={Link}
          to={`/auth/${isSignupPage ? "login" : "signup"}`}
        >
          {isSignupPage
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </Typography>
      </Paper>
    </Container>
  );
}

export default AuthPageLayout;
