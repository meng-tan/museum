import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

import UserService from "@service/UserService";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0)
  },
  total: {
    fontWeight: 700
  },
  title: {
    marginTop: theme.spacing(2)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

export default function Review(props) {
  const classes = useStyles();
  const [payment, setPayment] = useState(null);

  const { handleBack, placeOrder, paymentId } = props;

  useEffect(() => {
    if (paymentId !== 0) {
      UserService.getInstance()
        .findPaymentById(paymentId)
        .then((res) => {
          setPayment(res.payment);
        });
    }
  }, [paymentId]);

  const { tickets, total, title } = props.location.state;

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>

      <List disablePadding>
        <ListItem className={classes.listItem}>
          <ListItemText primary={title} />
        </ListItem>

        {Object.keys(tickets).map((key) => (
          <ListItem className={classes.listItem} key={key}>
            <ListItemText secondary={key} />
            <Typography variant="body2">
              ${tickets[key].price}*{tickets[key].amount}
            </Typography>
          </ListItem>
        ))}

        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            ${total}
          </Typography>
        </ListItem>
      </List>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Contact
          </Typography>
          <Typography gutterBottom>{props.tel}</Typography>
        </Grid>

        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>

          <Grid container>
            {paymentId === 0 ? (
              <React.Fragment>
                <Grid item xs={6}>
                  <Typography gutterBottom>Card holder</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{props.nameOnCard}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Card number</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{props.cardNumber}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Expiry date</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{props.expDate}</Typography>
                </Grid>
              </React.Fragment>
            ) : (
              <Grid item xs={12}>
                {payment && (
                  <Typography gutterBottom>
                    [{payment.nameOnCard}] Ending in {payment.cardNumber}
                  </Typography>
                )}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

      <div className={classes.buttons}>
        <Button onClick={handleBack} className={classes.button}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={placeOrder}
          className={classes.button}
        >
          Place order
        </Button>
      </div>
    </>
  );
}
