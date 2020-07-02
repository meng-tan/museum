import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import UserService from '../service/UserService'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

const styles = ((theme) => ({
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
}));

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errors: {
        isEmailValid: '',
        isPasswordValid: '',
      },
      open: false,
      err: ''
    }
    this.userService = UserService.getInstance()
  }

  login = () => {
    this.userService.login({
      email: this.state.email,
      password: this.state.password
    }).then(res => {
      console.log(res)
      if (res.err) {
        console.log("res.err:" + res.err)
        this.setState({
          err: res.err,
          open: true
        })
      } else {
        this.props.history.push('/exhibitions');
      }
    })
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
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
  validatePassword = event => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,})/;
    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        isPasswordValid: regex.test(this.state.password)
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
          <Typography variant="h5">Log In</Typography>
          <form
            method="post"
            className={classes.form}
            onChange={this.handleInputChange}
            noValidate>
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
              name="password"
              label="Password"
              value={this.state.password}
              onBlur={this.validatePassword}
              error={errors.isPasswordValid === false}
              helperText={errors.isPasswordValid === false ? "Minimum 6 characters, at least one letter and one number" : ""}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.login}
              disabled={errors.isEmailValid === true && errors.isPasswordValid === true ? false : true}
            >Login</Button>
          </form>

          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">Don't have an account? Sign Up</Link>
            </Grid>
          </Grid>

        </Paper>
      </Container>
    );
  }
}

export default withStyles(styles)(Login)