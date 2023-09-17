import { useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Link,
  useNavigate,
  useOutletContext,
  useLocation
} from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  TableRow,
  Table,
  TableHead,
  TableFooter,
  TableCell,
  TableBody,
  Button,
  ButtonGroup,
  Box
} from "@mui/material";
import dayjs from "dayjs";

import { openAlert } from "@features/alertSlice";
import { selectUser } from "@features/userSlice";

import ink from "@img/ink-h.png";

export const Tickets = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector(selectUser);
  const reduxDispatch = useDispatch();

  const [exhibition] = useOutletContext();

  function reducer(state, action) {
    switch (action.type) {
      case "add": {
        return {
          ...state,
          [action.category]: state[action.category] + 1,
          total: state.total + exhibition.tickets[action.category].price
        };
      }
      case "sub": {
        return {
          ...state,
          [action.category]: state[action.category] - 1,
          total: state.total - exhibition.tickets[action.category].price
        };
      }
      case "open_dialog": {
        return {
          ...state,
          open: true
        };
      }
      case "close_dialog": {
        return {
          ...state,
          open: false
        };
      }
      default: {
        throw Error("Unknown action: " + action.type);
      }
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    adult: 0,
    senior: 0,
    student: 0,
    child: 0,
    total: 0,
    open: false
  });

  const checkSub = (category) => {
    if (state[category] > 0) {
      dispatch({ type: "sub", category });
    }
  };

  const checkAdd = (category) => {
    if (state[category] < exhibition.tickets[category].stock) {
      dispatch({ type: "add", category });
    } else {
      reduxDispatch(
        openAlert({
          err: "Can not exceed stock",
          severity: "warning"
        })
      );
    }
  };

  const closeDialog = () => dispatch({ type: "close_dialog" });

  const checkout = () => {
    if (user.isLoggedIn) {
      const data = {};
      const { tickets } = exhibition;

      for (const key in tickets) {
        if (state[key]) {
          data[key] = {
            amount: state[key],
            price: tickets[key].price
          };
        }
      }
      navigate("checkout", {
        state: {
          exhibition,
          tickets: data,
          total: state.total
        },
        relative: true
      });
    } else {
      dispatch({ type: "open_dialog" });
    }
  };

  return (
    <>
      <Dialog onClose={closeDialog} open={state.open}>
        <DialogTitle id="dialog-auth" onClose={closeDialog}>
          Info
        </DialogTitle>
        <DialogContent dividers>
          <Typography
            gutterBottom
            component={Link}
            to="/login"
            state={{
              from: location
            }}
            sx={{ textDecoration: "underline" }}
          >
            Please Login First
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={closeDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Box
        sx={{
          p: 2,
          color: "#003558",
          background: `url(${ink})`,
          // background: "linear-gradient(-45deg, #D3DD7B 0%,#5DDDEC 100%)",
          borderRadius: "1rem",
          boxShadow: "0.1rem 0.1rem 0.5rem rgba(0,0,0,0.2)"
        }}
      >
        <Typography variant="subtitle2" pb={2}>
          {exhibition?.description}
        </Typography>
        <Typography variant="subtitle2">
          {`${dayjs
            .utc(exhibition?.dateFrom)
            .local()
            .format("YYYY/MM/DD")} ~ ${dayjs
            .utc(exhibition?.dateTo)
            .local()
            .format("YYYY/MM/DD")}`}
        </Typography>
        <Typography variant="subtitle2">{exhibition?.location}</Typography>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exhibition &&
            Object.keys(exhibition?.tickets).map((key) => (
              <TableRow key={key} hover>
                <TableCell align="center">{key}</TableCell>
                <TableCell align="center">
                  ${exhibition.tickets[key].price}
                </TableCell>
                {exhibition.tickets[key].stock ? (
                  <TableCell align="center">
                    <ButtonGroup>
                      <Button onClick={() => checkSub(key)}>
                        <RemoveIcon />
                      </Button>
                      <Button>{state[key]}</Button>
                      <Button onClick={() => checkAdd(key)}>
                        <AddIcon />
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                ) : (
                  <TableCell align="center">sold out</TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell />
            <TableCell align="center">Subtotal: ${state.total}</TableCell>
            <TableCell align="center">
              <Button
                disabled={state.total === 0}
                onClick={checkout}
                variant="contained"
                endIcon={<ArrowForwardIcon />}
              >
                checkout
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};
