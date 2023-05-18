import { useCallback, useEffect, useState } from "react";

import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import dayjs from "dayjs";
import throttle from "lodash/throttle";

import UserService from "../../service/UserService";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  listItem: {
    padding: theme.spacing(1, 0)
  },
  total: {
    fontWeight: 700
  },
  title: {
    marginTop: theme.spacing(2)
  }
}));

function Orders() {
  const classes = useStyles();

  const [page, setPage] = useState(0);

  const [totalPage, setTotalPage] = useState(0);

  const [hasNext, setHasNext] = useState(true);

  const [exhibitionOrders, updateOrders] = useState([]);

  useEffect(() => {
    if (hasNext) {
      UserService.getInstance()
        .listExhibitionOrders(page)
        .then((res) => {
          if (res.totalPage === 0) {
            setHasNext(false);
            console.log("no orders");
          } else if (res.exhibitionOrders && res.exhibitionOrders.length) {
            setTotalPage(res.totalPage);
            updateOrders(exhibitionOrders.concat(res.exhibitionOrders));
            console.log("update orders");

            if (page + 1 === totalPage) {
              setHasNext(false);
              console.log("effect set has no next");
            }
          }
        });
    } else {
      window.removeEventListener("scroll", handleScroll);
      console.log("effect remove1");
    }
  }, [page, hasNext]);

  var handleScroll = useCallback(
    throttle(() => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.body.clientHeight;
      const marginBottom = scrollHeight - scrollTop - clientHeight;
      console.log(marginBottom);
      if (marginBottom <= 10) {
        setPage((page) => page + 1);
        console.log("add page");
      }
    }, 1000),
    []
  );

  window.addEventListener("scroll", handleScroll);

  return (
    <main className={classes.layout}>
      {exhibitionOrders.length ? (
        <>
          {exhibitionOrders.map((order) => (
            <Paper className={classes.paper} key={order._id}>
              <Typography variant="h6" gutterBottom>
                Order Number: #{order._id}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Placed Time:{" "}
                {dayjs(order.placedTime).format("MMMM Do YYYY, h:mm:ss a")}
              </Typography>
              <Divider />
              <List disablePadding>
                <ListItem className={classes.listItem}>
                  <ListItemText primary={order.exhibitionTitle} />
                </ListItem>
                {Object.keys(order.tickets).map((key) => (
                  <ListItem className={classes.listItem} key={key}>
                    <ListItemText secondary={key} />
                    <Typography variant="body2">
                      ${order.tickets[key].price}*{order.tickets[key].amount}
                    </Typography>
                  </ListItem>
                ))}
                <ListItem className={classes.listItem}>
                  <ListItemText primary="Total" />
                  <Typography variant="subtitle1" className={classes.total}>
                    ${order.total}
                  </Typography>
                </ListItem>
              </List>
            </Paper>
          ))}
          {!hasNext && (
            <Paper className={classes.paper}>
              <Typography variant="h6" gutterBottom>
                No more orders.
              </Typography>
            </Paper>
          )}
        </>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            You haven't placed any orders yet.
          </Typography>
        </Paper>
      )}
    </main>
  );
}

export default Orders;
