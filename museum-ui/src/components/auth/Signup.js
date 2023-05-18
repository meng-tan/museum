import { Component } from "react";

import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import UserService from "@service/UserService";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: {
        value: "",
        isTouched: false
      },
      username: {
        value: "",
        isTouched: false
      },
      password: {
        value: "",
        isTouched: false
      },
      confirmPassword: {
        value: "",
        isTouched: false
      },
      errors: {
        isEmailValid: null,
        isUsernameValid: null,
        isPasswordValid: null,
        isConfirmPasswordValid: null
      },
      open: false,
      err: ""
    };
    this.userService = UserService.getInstance();
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  signup = () => {
    if (!this.validateForm()) {
      return;
    }
    this.userService
      .register({
        email: this.state.email.value,
        username: this.state.username.value,
        password: this.state.password.value
      })
      .then((res) => {
        console.log(res);
        if (res.err) {
          console.log("res.err:" + res.err);
          this.setState({
            err: res.err,
            open: true
          });
        } else {
          this.props.history.push("/auth/login");
        }
      });
  };

  handleInputChange = (evt) => {
    if (!this.state[evt.target.name].isTouched && !evt.target.value) {
      return;
    }
    this.setState((prevState) => ({
      ...prevState,
      [evt.target.name]: {
        isTouched: true,
        value: evt.target.value
      }
    }));
  };

  validateEmail = () => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (this.state.email.isTouched) {
      const isFieldValid = regex.test(this.state.email.value);
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          isEmailValid: isFieldValid
        }
      }));
      return isFieldValid;
    }
  };

  validateUsername = () => {
    const regex = /^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/;
    if (this.state.username.isTouched) {
      const isFieldValid = regex.test(this.state.username.value);
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          isUsernameValid: regex.test(this.state.username.value)
        }
      }));
      return isFieldValid;
    }
  };

  validatePassword = () => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,})/;
    if (this.state.password.isTouched) {
      const isFieldValid = regex.test(this.state.password.value);
      this.setState(
        (prevState) => ({
          errors: {
            ...prevState.errors,
            isPasswordValid: regex.test(this.state.password.value)
          }
        }),
        () => {
          if (this.state.confirmPassword.value) {
            this.validateConfirmPassword();
          }
        }
      );
      return isFieldValid;
    }
  };

  validateConfirmPassword = () => {
    if (
      this.state.confirmPassword.isTouched &&
      this.state.password.value &&
      this.state.confirmPassword.value
    ) {
      const isFieldValid =
        this.state.confirmPassword.value === this.state.password.value;
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          isConfirmPasswordValid: isFieldValid
        }
      }));
      return isFieldValid;
    }
  };

  validateForm = () => {
    const {
      validateEmail,
      validateUsername,
      validatePassword,
      validateConfirmPassword
    } = this;
    return (
      validateEmail() &&
      validateUsername() &&
      validatePassword() &&
      validateConfirmPassword()
    );
  };

  render() {
    const { errors, open, err } = this.state;
    return (
      <>
        <Dialog onClose={this.handleClose} open={open}>
          <DialogTitle id="dialog-title" onClose={this.handleClose}>
            Response Error
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>{err}</Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Box
          method="post"
          component="form"
          noValidate
          onChange={this.handleInputChange}
        >
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={this.state.email.value}
            onBlur={this.validateEmail}
            error={errors.isEmailValid === false}
            helperText={errors.isEmailValid === false ? "Invalid email" : " "}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            onBlur={this.validateUsername}
            value={this.state.username.value}
            error={errors.isUsernameValid === false}
            helperText={
              errors.isUsernameValid === false
                ? "Only alphabet characters are allowed"
                : " "
            }
          />
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            name="password"
            label="Password"
            value={this.state.password.value}
            onBlur={this.validatePassword}
            error={errors.isPasswordValid === false}
            helperText={
              errors.isPasswordValid === false
                ? "Minimum 6 characters, at least one letter and one number"
                : " "
            }
            type="password"
            id="password"
            autoComplete="new-password"
          />
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            name="confirmPassword"
            autoComplete="current-password"
            value={this.state.confirmPassword.value}
            onBlur={this.validateConfirmPassword}
            error={errors.isConfirmPasswordValid === false}
            helperText={
              errors.isConfirmPasswordValid === false
                ? "Inconsistent password"
                : " "
            }
            label="Confirm Password"
            type="password"
            id="confirmPassword"
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.signup}
            disabled={Object.values(errors).some(
              (isFieldValid) => isFieldValid !== true
            )}
            sx={{
              mt: 1
            }}
          >
            Signup
          </Button>
        </Box>
      </>
    );
  }
}

export default Signup;
