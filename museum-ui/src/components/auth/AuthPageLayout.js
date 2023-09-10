import { useDispatch } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  Divider,
  Chip,
  Container,
  Paper,
  Typography
} from "@mui/material";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

import { openAlert } from "@features/alertSlice";
import { thunkedLogIn } from "@features/userSlice";
import axiosInstance from "@service/axiosInstance";
import urlConfig from "@service/urlConfig";

import { config } from "../../config";

function AuthPageLayout() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { pathname, state } = useLocation();

  const isSignupPage = pathname.includes("signup");

  const onSuccess = (res) => {
    dispatch(thunkedLogIn(res));
    navigate(state?.from?.pathname || "/dashboard", { replace: true });
  };

  const handleCredentialResponse = (credentialResponse) => {
    axiosInstance
      .post(urlConfig.googleAuth, {
        idToken: credentialResponse.credential
      })
      .then((res) => {
        onSuccess(res);
      });
  };

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

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            my: 2
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: (theme) => `${theme.palette.primary.light} !important`
            }}
            component={Link}
            to={isSignupPage ? "/login" : "/signup"}
          >
            {isSignupPage
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </Typography>
        </Box>

        <GoogleOAuthProvider clientId={config.oauthClientId}>
          <Divider sx={{ mb: 2 }}>
            <Chip label="OR" />
          </Divider>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <GoogleLogin
              theme="outline"
              text="continue_with"
              shape="pill"
              onSuccess={handleCredentialResponse}
              onError={() => {
                dispatch(
                  openAlert({
                    severity: "error",
                    err: "Google Login failed, please try again"
                  })
                );
              }}
            />
          </Box>
        </GoogleOAuthProvider>
      </Paper>
    </Container>
  );
}

export default AuthPageLayout;
