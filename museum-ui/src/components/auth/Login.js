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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {
        value: "",
        isTouched: false
      },
      password: {
        value: "",
        isTouched: false
      },
      errors: {
        isEmailValid: null,
        isPasswordValid: null
      },
      open: false,
      err: ""
    };
    this.userService = UserService.getInstance();
  }

  login = () => {
    if (!this.validateEmail() || !this.validatePassword()) {
      return;
    }
    this.userService
      .login({
        email: this.state.email.value,
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
          this.props.history.push("/exhibitions");
        }
      });
  };

  handleClose = () => {
    this.setState({
      open: false
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

  validatePassword = () => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,})/;
    if (this.state.password.isTouched) {
      const isFieldValid = regex.test(this.state.password.value);
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          isPasswordValid: regex.test(this.state.password.value)
        }
      }));
      return isFieldValid;
    }
  };

  render() {
    const { errors, open, err } = this.state;
    console.log("this.props.history:", this.props.history);
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

        <Box method="post" onChange={this.handleInputChange} noValidate>
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
            autoComplete="current-password"
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.login}
            disabled={
              !(errors.isEmailValid === true && errors.isPasswordValid === true)
            }
          >
            Login
          </Button>
        </Box>
      </>
    );
  }
}

export default Login;
