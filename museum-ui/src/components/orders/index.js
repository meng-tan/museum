import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import UserService from '../service/UserService'
import CssBaseline from '@material-ui/core/CssBaseline';
import Moment from 'moment';
import Divider from '@material-ui/core/Divider';
import throttle from "lodash/throttle";

const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },

}));

function Orders() {
    const classes = useStyles();

    let [page, setPage] = useState(0);

    let [totalPage, setTotalPage] = useState(0);

    let [hasNext, setHasNext] = useState(true);

    let [exhibitionOrders, updateOrders] = useState([]);

    useEffect(() => {
        if (hasNext) {
            UserService.getInstance()
                .listExhibitionOrders(page)
                .then(res => {
                    if (res.totalPage === 0) {
                        setHasNext(false)
                        console.log("no orders")
                    } else if (res.exhibitionOrders && res.exhibitionOrders.length) {
                        setTotalPage(res.totalPage)
                        updateOrders(exhibitionOrders.concat(res.exhibitionOrders))
                        console.log("update orders")

                        if (page + 1 === totalPage) {
                            setHasNext(false)
                            console.log("effect set has no next")
                        }
                    }
                })
        } else {
            window.removeEventListener('scroll', handleScroll)
            console.log("effect remove1")
        }
    }, [page, hasNext]);



    var handleScroll = useCallback(throttle(() => {
        let scrollHeight = document.documentElement.scrollHeight
        let scrollTop = document.documentElement.scrollTop
        let clientHeight = document.body.clientHeight
        let marginBottom = scrollHeight - scrollTop - clientHeight
        console.log(marginBottom)
        if (marginBottom <= 10) {
            setPage(page => page + 1)
            console.log("add page")
        }
    }, 1000), [])

    window.addEventListener('scroll', handleScroll)

    return (
        <main className={classes.layout}>

            {exhibitionOrders.length
                ?
                <React.Fragment>

                    {exhibitionOrders.map(order => (
                        <Paper className={classes.paper} key={order._id}>
                            <Typography variant="h6" gutterBottom>Order Number: #{order._id}</Typography>
                            <Typography variant="body2" gutterBottom>Placed Time: {Moment(order.placedTime).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
                            <Divider />
                            <List disablePadding>
                                <ListItem className={classes.listItem}>
                                    <ListItemText primary={order.exhibitionTitle} />
                                </ListItem>
                                {Object.keys(order.tickets).map(key => (
                                    <ListItem className={classes.listItem} key={key}>
                                        <ListItemText secondary={key} />
                                        <Typography variant="body2">${order.tickets[key].price}*{order.tickets[key].amount}</Typography>
                                    </ListItem>
                                ))}
                                <ListItem className={classes.listItem}>
                                    <ListItemText primary="Total" />
                                    <Typography variant="subtitle1" className={classes.total}>${order.total}</Typography>
                                </ListItem>
                            </List>
                        </Paper>))}
                    {!hasNext &&
                        <Paper className={classes.paper}>
                            <Typography variant="h6" gutterBottom>No more orders.</Typography>
                        </Paper>
                    }
                </React.Fragment>
                :
                <Paper className={classes.paper}>
                    <Typography variant="h6" gutterBottom>You haven't placed any orders yet.</Typography>
                </Paper>}

        </main>
    )
}

export default Orders
