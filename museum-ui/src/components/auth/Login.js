import { useReducer } from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";

import { Box, Button, TextField } from "@mui/material";

import axiosInstance from "@service/axiosInstance";
import urlConfig from "@service/urlConfig";

import { PATTERN } from "@tools/constant";

import { reducer } from "./Signup";

const Login = () => {
  const navigate = useNavigate();
  const [onSuccess] = useOutletContext();
  const { state: locationState } = useLocation();

  const [state, dispatch] = useReducer(reducer, {
    email: {
      value: "",
      isTouched: false,
      regex: PATTERN.EMAIL,
      isValid: null
    },
    password: {
      value: "",
      isTouched: false,
      regex: PATTERN.PASSWORD,
      isValid: null
    }
  });

  const handleInputChange = (evt) => {
    if (!state[evt.target.name].isTouched && !evt.target.value) {
      return;
    }
    dispatch({
      type: "input_change",
      evt
    });
  };

  const validateField = (field) => {
    if (state[field].isTouched) {
      const isFieldValid = state[field].regex.test(state[field].value);
      dispatch({ type: "validate_field", field, isFieldValid });
    }
  };

  const login = () => {
    if (!state.email.isValid || !state.password.isValid) {
      return;
    }

    axiosInstance
      .post(urlConfig.login, {
        email: state.email.value,
        password: state.password.value
      })
      .then((res) => {
        onSuccess(res);
        if (locationState) {
          navigate(locationState.from.pathname, { replace: true });
        } else {
          navigate("/dashboard");
        }
      });
  };

  return (
    <Box method="post" component="form" onChange={handleInputChange} noValidate>
      <TextField
        variant="outlined"
        margin="dense"
        size="small"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        value={state.email.value}
        onBlur={(evt) => validateField(evt.target.name)}
        error={state.email.isValid === false}
        helperText={state.email.isValid === false ? "Invalid email" : " "}
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="dense"
        size="small"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="off"
        value={state.password.value}
        onBlur={(evt) => validateField(evt.target.name)}
        error={state.password.isValid === false}
        helperText={
          state.password.isValid === false
            ? "Minimum 6 characters, at least one letter and one number"
            : " "
        }
      />
      <Button
        type="button"
        size="small"
        fullWidth
        variant="contained"
        color="primary"
        onClick={login}
        disabled={
          !(state.email.isValid === true && state.password.isValid === true)
        }
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
