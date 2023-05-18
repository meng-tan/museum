import React, { Component } from "react";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { withStyles } from "@mui/styles";
import dayjs from "dayjs";

import UserService from "@service/UserService";

import Confirm from "./Confirm";
import ContactForm from "./ContactForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";

const styles = (theme) => ({
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
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
});

const steps = ["Contact info", "Payment details", "Review your order"];

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      activeStep: 0,
      tel: "",
      paymentId: 0,
      nameOnCard: "",
      cardNumber: "",
      expDate: "",
      cvv: "",
      errors: {
        isTelValid: null,
        isNameOnCardValid: null,
        isCardNumberValid: null,
        isExpDateValid: null,
        isCvvValid: null
      },
      exhibitionOrder: null
    };
    this.userService = UserService.getInstance();
  }

  setLoading = (flag) => {
    this.setState({ isLoading: flag });
  };

  placeOrder = () => {
    this.setLoading(true);

    const order = {
      exhibitionId: this.props.match.params.id,
      tickets: this.props.location.state.tickets
    };
    if (this.state.paymentId === 0) {
      order.payment = {
        cardNumber: this.state.cardNumber,
        nameOnCard: this.state.nameOnCard,
        expDate: dayjs(this.state.expDate).format("YYYY-MM"),
        cvv: this.state.cvv
      };
    } else {
      order.paymentId = this.state.paymentId;
    }

    this.userService.buyTickets(order).then((res) => {
      if (res.err) {
        alert(res.err);
      } else {
        this.setLoading(false);

        this.setState(
          {
            exhibitionOrder: res.exhibitionOrder,
            activeStep: this.state.activeStep + 1
          },
          () => {
            console.log(res.exhibitionOrder);
          }
        );
      }
    });
  };

  handleNext = () => {
    this.setState({ activeStep: this.state.activeStep + 1 });
  };

  handleBack = () => {
    this.setState({ activeStep: this.state.activeStep - 1 });
  };

  inputChange = (evt) => {
    console.log(evt.target.name + ":" + evt.target.value);
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <ContactForm
            {...this.state}
            handleNext={this.handleNext}
            validateType={this.validateType}
            inputChange={this.inputChange}
          />
        );
      case 1:
        return (
          <PaymentForm
            {...this.state}
            handleBack={this.handleBack}
            handleNext={this.handleNext}
            validateType={this.validateType}
            inputChange={this.inputChange}
          />
        );
      case 2:
        return (
          <Review
            {...this.state}
            {...this.props}
            handleBack={this.handleBack}
            placeOrder={this.placeOrder}
          />
        );
      case 3:
        return <Confirm exhibitionOrder={this.state.exhibitionOrder} />;
      default:
        throw new Error("Unknown step");
    }
  };

  validateType = (evt) => {
    switch (evt.target.name) {
      case "tel":
        this.validateTel(evt);
        break;
      case "nameOnCard":
        this.validateNameOnCard(evt);
        break;
      case "cardNumber":
        this.validateCardNumber(evt);
        break;
      case "expDate":
        this.validateExpDate(evt);
        break;
      case "cvv":
        this.validateCvv(evt);
        break;
      default:
        console.log("no validate");
    }
  };

  validateTel = (evt) => {
    const regex = /^[0-9]{10,11}$/;
    const value = evt.target.value.trim();
    this.setState((prevState) => ({
      errors: {
        ...prevState.errors,
        isTelValid: regex.test(value)
      }
    }));
  };

  validateNameOnCard = (evt) => {
    const regex = /^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/;
    const value = evt.target.value.trim();
    this.setState((prevState) => ({
      errors: {
        ...prevState.errors,
        isNameOnCardValid: regex.test(value)
      }
    }));
  };

  validateCardNumber = (evt) => {
    const regex = /^[0-9]{16}$/;
    const value = evt.target.value.trim();
    this.setState((prevState) => ({
      errors: {
        ...prevState.errors,
        isCardNumberValid: regex.test(value)
      }
    }));
  };

  validateExpDate = (evt) => {
    const regex = /^(20\d{2})-(0?[1-9]|1[0-2])$/;
    const value = evt.target.value.trim();
    this.setState((prevState) => ({
      errors: {
        ...prevState.errors,
        isExpDateValid: regex.test(value)
      }
    }));
  };

  validateCvv = (evt) => {
    const regex = /^[0-9]{3}$/;
    const value = evt.target.value.trim();
    this.setState((prevState) => ({
      errors: {
        ...prevState.errors,
        isCvvValid: regex.test(value)
      }
    }));
  };

  render() {
    const { classes } = this.props;
    const { activeStep, isLoading } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <Backdrop className={classes.backdrop} open={isLoading}>
          <CircularProgress color="inherit" />
          <Typography variant="subtitle2" align="center">
            Please wait...
          </Typography>
        </Backdrop>

        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="h4" align="center">
              Checkout
            </Typography>

            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {this.getStepContent(activeStep)}
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Checkout);
