import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import UserService from '../service/UserService'
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';


const styles = theme => ({
  root: {
  },
  paper: {
    marginTop: '12vh',
    padding: '6vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0),
  },
});

class Signup extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      errors: {
        isEmailValid: '',
        isUsernameValid: '',
        isPasswordValid: '',
        isConfirmPasswordValid: ''
      },
      open: false,
      err: ''
    }
    this.userService = UserService.getInstance()
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  signup = () => {
    this.userService
      .register({
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        console.log(res)
        if (res.err) {
          console.log("res.err:" + res.err)
          this.setState({
            err: res.err,
            open: true
          })
        } else {
          this.props.history.push('/login');
        }
      })
  }

  handleInputChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  validateEmail = event => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        isEmailValid: regex.test(this.state.email)
      }
    }))
  }

  validateUsername = event => {
    const regex = /^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/
    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        isUsernameValid: regex.test(this.state.username)
      }
    }))

  }

  validatePassword = event => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,})/;
    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        isPasswordValid: regex.test(this.state.password)
      }
    }), () => {
      if (this.state.confirmPassword) {
        this.validateConfirmPassword()
      }
    })
  }

  validateConfirmPassword = event => {
    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        isConfirmPasswordValid: this.state.password === this.state.confirmPassword
      }
    }))
  }


  render() {

    const { classes } = this.props
    const { errors, open, err } = this.state

    return (
      <Container maxWidth="sm" className={classes.root}>
        <CssBaseline />

        <Dialog onClose={this.handleClose} open={open}>
          <DialogTitle id="dialog-title" onClose={this.handleClose}>
            Response Error
            </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              {err}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Paper elevation={6} className={classes.paper}>
          <Typography variant="h5">Sign Up</Typography>
          <form
            method="post"
            className={classes.form}
            noValidate
            onChange={this.handleInputChange}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              value={this.state.email}
              onBlur={this.validateEmail}
              error={errors.isEmailValid === false}
              helperText={errors.isEmailValid === false ? "Invalid email" : ""}
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              onBlur={this.validateUsername}
              value={this.state.username}
              error={errors.isUsernameValid === false}
              helperText={errors.isUsernameValid === false ? "Invalid username" : ""}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              value={this.state.password}
              onBlur={this.validatePassword}
              error={errors.isPasswordValid === false}
              helperText={errors.isPasswordValid === false ? "Minimum 6 characters, at least one letter and one number" : ""}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              value={this.state.confirmPassword}
              onBlur={this.validateConfirmPassword}
              error={errors.isConfirmPasswordValid === false}
              helperText={errors.isConfirmPasswordValid === false ? "Inconsistent password" : ""}
              label="Confirm Password"
              type="password"
              id="confirmPassword"
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.signup}
              disabled={Object.values(errors).every(isValid => isValid === true) ? false : true}
            >Signup</Button>
          </form>

          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
              <Link href="/login" variant="body2">Already have an account? Login</Link>
            </Grid>
          </Grid>

        </Paper>
      </Container>
    );
  }
}

export default withStyles(styles)(Signup)