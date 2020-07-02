import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { makeStyles } from '@material-ui/core/styles';
import GoogleLogin from 'react-google-login';
import { config } from '../config'
import UserService from '../service/UserService'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(/img/pearl.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: '15vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  google: {
    width: '100%',
    cursor: 'pointer'
  },
}));


const responseGoogle = response => {
  console.log("response google:")
  console.log(response)

  UserService.getInstance()
    .googleLogin(response)
    .then(() => {
      console.log("after userservice:")
      this.props.history.push('/exhibitions');
    })
}


export default function Auth() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={5} md={6} className={classes.image} />
      <Grid item xs={12} sm={7} md={6} component={Paper} elevation={6} square>

        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircleOutlinedIcon />
          </Avatar>

          <Grid container spacing={1}>
            <Grid item xs={12}>
              <GoogleLogin
                className={classes.google}
                clientId={config.googleClient}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                href="/signup"
                color="primary">signup</Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                href="/login"
                color="primary">Login</Button>
            </Grid>

          </Grid>
        </div>

      </Grid>
    </Grid>
  );
}