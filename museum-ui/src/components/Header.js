import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MuseumIcon from '@material-ui/icons/Museum';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import UserService from './service/UserService'
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    nav: {
        flexGrow: 1,
        justifyContent: 'center',
        textTransform: 'uppercase'
    },

}));

export default function Header() {
    const classes = useStyles();

    const AuthButton = withRouter(
        ({ history }) =>
            UserService.getInstance().isLoggedIn()
                ? <React.Fragment className={classes.wrapper}>
                    <Button variant="contained"onClick={() => UserService.getInstance().logout()}>
                        Logout
                    </Button>
                    <IconButton color="inherit" onClick={() => history.push("/orders")}>
                        <AccountCircle />
                    </IconButton>
                </React.Fragment>
                :
                <Button 
                variant="contained" 
                href="/auth">Login/Signup</Button>
    );

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Link href="/home" color="inherit">
                    <IconButton color="inherit">
                        <MuseumIcon />
                    </IconButton>
                </Link>

                <Grid container spacing={4} className={classes.nav}>
                    <Grid item>
                        <Link href="/exhibitions" color="inherit">Exhibitions</Link>
                    </Grid>
                </Grid>

                <AuthButton />

            </Toolbar>
        </AppBar>
    );
}


