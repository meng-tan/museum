import GoogleLogin from "react-google-login";
import { useNavigate, useLocation } from "react-router-dom";

import { Chip, Divider, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

import UserService from "@service/UserService";

import { config } from "../../config";
const useStyles = makeStyles((theme) => ({
  google: {
    width: "100%"
  }
}));

export const GoogleAuth = ({ gap = 2, ...rest }) => {
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
    <Box {...rest}>
      <Divider sx={{ mb: gap }}>
        <Chip label="OR" />
      </Divider>

      <GoogleLogin
        className={classes.google}
        clientId={config.googleClient}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </Box>
  );
};
