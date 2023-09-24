import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import axiosInstance from "@service/axiosInstance";
import urlConfig from "@service/urlConfig";

export default function Review(props) {
  const [payment, setPayment] = useState({});

  const { tickets, total, exhibition } = useLocation().state;

  const { handleBack, placeOrder, paymentId } = props;

  useEffect(() => {
    if (paymentId !== 0) {
      axiosInstance.get(urlConfig.getPayment(paymentId)).then((res) => {
        setPayment(res.payment);
      });
    }
  }, [paymentId]);

  return (
    <>
      <Divider>
        <Chip label="Order Summary" />
      </Divider>

      <List disablePadding dense>
        <ListItem>
          <ListItemText
            primary={exhibition.title}
            sx={{ textAlign: "center" }}
          />
        </ListItem>

        {Object.keys(tickets).map((key) => (
          <ListItem key={key}>
            <ListItemText secondary={key} />
            <Typography variant="body2" color="textSecondary">
              ${tickets[key].price} * {tickets[key].amount}
            </Typography>
          </ListItem>
        ))}

        <ListItem>
          <ListItemText />
          <Typography variant="subtitle2">Total: ${total}</Typography>
        </ListItem>
      </List>

      <Grid container columnSpacing={5}>
        <Grid item xs={12} md={6}>
          <Divider>
            <Chip label="Contact" />
          </Divider>
          <List disablePadding>
            <ListItem>
              <ListItemText secondary={props.tel.value} />
            </ListItem>
          </List>
        </Grid>

        <Grid item xs={12} md={6}>
          <Divider>
            <Chip label="Payment Details" />
          </Divider>

          <List disablePadding dense>
            {paymentId === 0 ? (
              <>
                <ListItem>
                  <ListItemText
                    secondary={`Card holder: ${props.nameOnCard.value}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    secondary={`Card number: ${props.cardNumber.value
                      .split("")
                      .map((char, index) => {
                        if (index !== 0 && index % 4 === 0) {
                          return ` ${char}`;
                        }
                        return char;
                      })
                      .join("")}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    secondary={`Expiry date: ${props.expDate.value}`}
                  />
                </ListItem>
              </>
            ) : (
              <ListItem>
                <ListItemText
                  secondary={`[${payment?.nameOnCard}] Ending in ${payment?.cardNumberEnding}`}
                />
              </ListItem>
            )}
          </List>
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <Button onClick={handleBack}>Back</Button>
        <Button variant="contained" onClick={placeOrder}>
          Place order
        </Button>
      </Box>
    </>
  );
}
