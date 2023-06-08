import { useEffect, useState } from "react";

import { Box, Button, Grid, TextField, MenuItem } from "@mui/material";

import axiosInstance from "@service/axiosInstance";
import urlConfig from "@service/urlConfig";

export default function CheckoutForm(props) {
  const {
    tel,
    paymentId,
    nameOnCard,
    cardNumber,
    expDate,
    cvv,
    handleInputChange,
    handlePaymentChange,
    validateField,
    isFormValid,
    handleNext
  } = props;

  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(urlConfig.listPayments)
      .then((res) => setPayments(res.payments));
  }, []);

  return (
    <Box
      component="form"
      noValidate
      onChange={handleInputChange}
      onBlur={(evt) => {
        if (evt.target.name) {
          validateField(evt.target.name);
        }
      }}
    >
      <Grid
        container
        rowSpacing={{
          xs: 1,
          sm: 2,
          md: 3
        }}
        columnSpacing={{ md: 10 }}
      >
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="tel"
            name="tel"
            autoComplete="tel"
            type="tel"
            label="Phone Number"
            fullWidth
            variant="standard"
            InputLabelProps={{
              shrink: true
            }}
            error={tel.isValid === false}
            helperText={tel.isValid === false ? "10-11 digits" : " "}
            value={tel.value}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            variant="standard"
            id="card"
            label="Select Card"
            name="paymentId"
            helperText=" "
            value={paymentId}
            select
            onChange={(evt) => {
              evt.stopPropagation();
              handlePaymentChange(evt);
            }}
            onBlur={(evt) => evt.stopPropagation()}
          >
            <MenuItem value={0}>
              <em>New Card</em>
            </MenuItem>
            {payments.map((payment) => (
              <MenuItem key={payment._id} value={payment._id}>
                {`[${payment.nameOnCard}] Card Number Ending in ${payment.cardNumberEnding}`}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {paymentId === 0 ? (
          <>
            <Grid item xs={12} md={6}>
              <TextField
                variant="standard"
                required
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
                label="Name on card"
                id="cardName"
                name="nameOnCard"
                autoComplete="off"
                value={nameOnCard.value}
                error={nameOnCard.isValid === false}
                helperText={
                  nameOnCard.isValid === false ? "Incorrect Entry" : " "
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                variant="standard"
                InputLabelProps={{
                  shrink: true
                }}
                id="cardNumber"
                name="cardNumber"
                label="Card number"
                autoComplete="off"
                error={cardNumber.isValid === false}
                helperText={cardNumber.isValid === false ? "16 digits" : " "}
                value={cardNumber.value}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                required
                variant="standard"
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
                autoComplete="off"
                id="expDate"
                name="expDate"
                label="Expiry date"
                type="month"
                value={expDate.value}
                error={expDate.isValid === false}
                helperText={expDate.isValid === false ? "Incorrect Entry" : " "}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                required
                variant="standard"
                fullWidth
                autoComplete="off"
                InputLabelProps={{
                  shrink: true
                }}
                id="cvv"
                name="cvv"
                value={cvv.value}
                label="CVV"
                error={cvv.isValid === false}
                helperText={
                  cvv.isValid === false
                    ? "Last 3 digits on signature strip"
                    : " "
                }
              />
            </Grid>
          </>
        ) : null}
      </Grid>

      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={!isFormValid()}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
