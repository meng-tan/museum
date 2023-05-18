import { Component } from "react";
import { Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Paper,
  Typography,
  TableRow,
  Table,
  TableHead,
  TableFooter,
  TableCell,
  TableBody,
  Alert,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Container
} from "@mui/material";
import { withStyles } from "@mui/styles";
import dayjs from "dayjs";

import ExhibitionService from "../../service/ExhibitionService";
import UserService from "../../service/UserService";

const styles = {
  root: {},
  breadcrumb: {
    margin: "4vh 0 2vh 0"
  },
  main: {},
  cover: {
    height: "40vh",
    display: "flex",
    padding: "0 8vh",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  table: {
    marginBottom: "4vh"
  }
};

class Ticket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      alert: false,
      exhibition: {
        tickets: []
      },
      adult: 0,
      senior: 0,
      student: 0,
      child: 0,
      total: 0
    };
    this.exhibitionService = ExhibitionService.getInstance();
    this.userService = UserService.getInstance();
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  componentDidMount() {
    // this.exhibitionService
    //   .findById(this.props.match.params.id)
    //   .then((exhibition) => {
    //     this.setState({ exhibition });
    //   });
  }

  sub = (key) => {
    if (this.state[key] > 0) {
      this.setState({ [key]: this.state[key] - 1 }, () => {
        this.sum();
      });
    }
  };

  add = (key) => {
    if (this.state[key] < this.state.exhibition.tickets[key].stock) {
      this.setState({ [key]: this.state[key] + 1 }, () => {
        this.sum();
      });
    } else {
      this.setState({ alert: true });
    }
  };

  sum = () => {
    let total = 0;
    const { tickets } = this.state.exhibition;
    for (const key in tickets) {
      total += this.state[key] * tickets[key].price;
    }
    this.setState({ total });
  };

  checkout = () => {
    if (this.userService.isLoggedIn()) {
      const data = {};
      const { tickets } = this.state.exhibition;

      for (const key in tickets) {
        if (this.state[key]) {
          data[key] = {
            amount: this.state[key],
            price: tickets[key].price
          };
        }
      }

      this.props.history.push({
        pathname: "/exhibitions/id/" + this.props.match.params.id + "/checkout",
        state: {
          tickets: data,
          total: this.state.total,
          title: this.state.exhibition.title
        }
      });
    } else {
      this.setState({ open: true });
    }
  };

  handleAlertClose = (event) => {
    this.setState({ alert: false });
  };

  render() {
    const { classes } = this.props;
    const { exhibition, open, alert } = this.state;

    return (
      <Container className={classes.root}>
        <Snackbar
          open={alert}
          autoHideDuration={3000}
          onClose={this.handleAlertClose}
        >
          <Alert
            elevation={6}
            variant="filled"
            onClose={this.handleAlertClose}
            severity="warning"
          >
            Can not exceed stock
          </Alert>
        </Snackbar>

        <Dialog onClose={this.handleClose} open={open}>
          <DialogTitle id="dialog-title" onClose={this.handleClose}>
            Info
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              Please{" "}
              <Link color="inherit" to="/auth/login">
                Login
              </Link>{" "}
              first
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Breadcrumbs className={classes.breadcrumb}>
          <Link color="inherit" to="/exhibitions">
            Exhibitions
          </Link>
          <Typography color="textPrimary">{exhibition.title}</Typography>
        </Breadcrumbs>

        <Paper elevation={3} className={classes.cover}>
          <Typography variant="subtitle1">{exhibition.description}</Typography>
          <Typography variant="h6">
            {`Duration: ${dayjs(exhibition.dateFrom).format(
              "YYYY/MM/DD"
            )} ~ ${dayjs(exhibition.dateTo).format("YYYY/MM/DD")}`}
          </Typography>
          <Typography variant="h6">Location: {exhibition.location}</Typography>
        </Paper>

        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(exhibition.tickets).map((key) => (
              <TableRow key={key}>
                <TableCell align="center">{key}</TableCell>
                <TableCell align="center">
                  ${exhibition.tickets[key].price}
                </TableCell>
                {exhibition.tickets[key].stock ? (
                  <TableCell align="center">
                    <ButtonGroup color="primary">
                      <Button onClick={() => this.sub(key)}>
                        <RemoveIcon />
                      </Button>
                      <Button>{this.state[key]}</Button>
                      <Button onClick={() => this.add(key)}>
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
              <TableCell align="center"></TableCell>
              <TableCell align="center">
                Subtotal: ${this.state.total}
              </TableCell>
              <TableCell align="center">
                <Button
                  disabled={this.state.total === 0}
                  onClick={this.checkout}
                  variant="contained"
                  color="secondary"
                >
                  checkout
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Container>
    );
  }
}

export default withStyles(styles)(Ticket);
