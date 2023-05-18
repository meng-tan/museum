import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

import UserService from "@service/UserService";

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

export default function PaymentForm(props) {
  const {
    paymentId,
    nameOnCard,
    cardNumber,
    expDate,
    cvv,
    errors,
    inputChange,
    validateType,
    handleBack,
    handleNext
  } = props;

  const classes = useStyles();

  const [payments, setPayments] = useState([]);

  useEffect(() => {
    UserService.getInstance()
      .listPayments()
      .then((res) => {
        setPayments(res.payments);
      });
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3} onChange={inputChange} onBlur={validateType}>
        <Grid item xs={12}>
          <FormControl required fullWidth>
            <InputLabel id="select-card">Select Card</InputLabel>
            <Select
              labelId="select-card"
              id="card"
              name="paymentId"
              value={paymentId}
              onChange={inputChange}
            >
              <MenuItem value={0}>
                <em>New Card</em>
              </MenuItem>
              {payments &&
                payments.map((payment) => (
                  <MenuItem key={payment._id} value={payment._id}>
                    [{payment.nameOnCard}]Card Number Ending in{" "}
                    {payment.cardNumber}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        {props.paymentId === 0 ? (
          <React.Fragment>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cardName"
                label="Name on card"
                name="nameOnCard"
                value={nameOnCard}
                error={errors.isNameOnCardValid === false}
                helperText={
                  errors.isNameOnCardValid === false ? "Incorrect Entry" : ""
                }
                fullWidth
                autoComplete="cc-name"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cardNumber"
                name="cardNumber"
                label="Card number"
                error={errors.isCardNumberValid === false}
                helperText={
                  errors.isCardNumberValid === false ? "16 digits" : ""
                }
                value={cardNumber}
                fullWidth
                autoComplete="cc-number"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                required
                id="expDate"
                name="expDate"
                label="Expiry date"
                type="month"
                value={expDate}
                error={errors.isExpDateValid === false}
                helperText={
                  errors.isExpDateValid === false ? "Incorrect Entry" : ""
                }
                fullWidth
                autoComplete="cc-exp"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cvv"
                name="cvv"
                value={cvv}
                label="CVV"
                error={errors.isCvvValid === false}
                helperText={
                  errors.isCvvValid === false
                    ? "Last 3 digits on signature strip"
                    : ""
                }
                fullWidth
                autoComplete="cc-csc"
              />
            </Grid>
          </React.Fragment>
        ) : null}
      </Grid>

      <div className={classes.buttons}>
        <Button onClick={handleBack} className={classes.button}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          className={classes.button}
          disabled={
            !(
              paymentId !== 0 ||
              Object.values(errors).every((isValid) => isValid === true)
            )
          }
        >
          Next
        </Button>
      </div>
    </React.Fragment>
  );
}
