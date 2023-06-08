import { useReducer } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import { Box, Button, TextField } from "@mui/material";

import axiosInstance from "@service/axiosInstance";
import urlConfig from "@service/urlConfig";

import { PATTERN } from "@tools/constant";

export function reducer(state, action) {
  switch (action.type) {
    case "input_change": {
      return {
        ...state,
        [action.evt.target.name]: {
          ...state[action.evt.target.name],
          isTouched: true,
          value: action.evt.target.value
        }
      };
    }
    case "validate_field": {
      return {
        ...state,
        [action.field]: {
          ...state[action.field],
          isValid: action.isFieldValid
        }
      };
    }
  }
  throw Error("Unknown action: " + action.type);
}

const Signup = () => {
  const navigate = useNavigate();
  const [onSuccess] = useOutletContext();

  const [state, dispatch] = useReducer(reducer, {
    email: {
      value: "",
      isTouched: false,
      regex: PATTERN.EMAIL,
      isValid: null
    },
    username: {
      value: "",
      isTouched: false,
      regex: PATTERN.NAME,
      isValid: null
    },
    password: {
      value: "",
      isTouched: false,
      regex: PATTERN.PASSWORD,
      isValid: null
    },
    confirmPassword: {
      value: "",
      isTouched: false,
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

  const validateConfirmPassword = () => {
    if (state.confirmPassword.isTouched) {
      const isFieldValid = state.confirmPassword.value === state.password.value;
      dispatch({
        type: "validate_field",
        field: "confirmPassword",
        isFieldValid
      });
    }
  };

  const isFormValid = () => {
    return Object.values(state).every(({ isValid }) => isValid === true);
  };

  const signup = () => {
    if (!isFormValid()) {
      return;
    }

    axiosInstance
      .post(urlConfig.register, {
        email: state.email.value,
        username: state.username.value,
        password: state.password.value
      })
      .then((res) => {
        onSuccess(res);
        navigate("/dashboard");
      });
  };

  return (
    <Box method="post" component="form" noValidate onChange={handleInputChange}>
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
        id="username"
        label="Username"
        name="username"
        autoComplete="off"
        onBlur={(evt) => validateField(evt.target.name)}
        value={state.username.value}
        error={state.username.isValid === false}
        helperText={
          state.username.isValid === false
            ? "Only alphabet characters are allowed"
            : " "
        }
      />
      <TextField
        variant="outlined"
        margin="dense"
        size="small"
        required
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        autoComplete="off"
        value={state.password.value}
        onBlur={(evt) => {
          validateField(evt.target.name);
          if (state.confirmPassword.isTouched) {
            validateConfirmPassword();
          }
        }}
        error={state.password.isValid === false}
        helperText={
          state.password.isValid === false
            ? "Minimum 6 characters, at least one letter and one number"
            : " "
        }
      />
      <TextField
        variant="outlined"
        margin="dense"
        size="small"
        required
        fullWidth
        label="Confirm Password"
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        autoComplete="off"
        value={state.confirmPassword.value}
        onBlur={validateConfirmPassword}
        error={state.confirmPassword.isValid === false}
        helperText={
          state.confirmPassword.isValid === false
            ? "Inconsistent password"
            : " "
        }
      />
      <Button
        type="button"
        size="small"
        fullWidth
        variant="contained"
        color="primary"
        onClick={signup}
        disabled={!isFormValid()}
        sx={{
          mt: 1
        }}
      >
        Signup
      </Button>
    </Box>
  );
};

export default Signup;
