import { useReducer, useState, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Paper, Step, StepLabel, Stepper } from "@mui/material";
import dayjs from "dayjs";

import { thunkedCloseMask, thunkedOpenMask } from "@features/maskSlice";
import axiosInstance from "@service/axiosInstance";
import urlConfig from "@service/urlConfig";
import { PATTERN } from "@tools/constant";
import { withAuth } from "@tools/func";

import CheckoutForm from "./CheckoutForm";
import Confirm from "./Confirm";
import Review from "./Review";

const steps = ["Contact & Payment", "Review"];

const newCardForm = {
  nameOnCard: {
    value: "",
    isTouched: false,
    regex: PATTERN.NAME,
    isValid: null
  },
  cardNumber: {
    value: "",
    isTouched: false,
    regex: PATTERN.CARD,
    isValid: null
  },
  expDate: {
    value: "",
    isTouched: false,
    regex: PATTERN.EXP_DATE,
    isValid: null
  },
  cvv: {
    value: "",
    isTouched: false,
    regex: PATTERN.CVV,
    isValid: null
  }
};

function reducer(state, action) {
  switch (action.type) {
    case "input_change": {
      return {
        ...state,
        [action.evt.target.name]: {
          ...state[action.evt.target.name],
          isTouched: true,
          value: action.evt.target.value
        }
      };
    }
    case "payment_change": {
      if (action.evt.target.value === 0) {
        return {
          ...state,
          [action.evt.target.name]: action.evt.target.value,
          ...newCardForm
        };
      } else {
        return {
          tel: { ...state.tel },
          [action.evt.target.name]: action.evt.target.value
        };
      }
    }
    case "validate_field": {
      return {
        ...state,
        [action.field]: {
          ...state[action.field],
          isValid: action.isFieldValid
        }
      };
    }
  }
  throw Error("Unknown action: " + action.type);
}

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();

  const { state: locationState } = useLocation();

  useLayoutEffect(() => {
    if (!locationState) {
      navigate(-1);
    }
  }, [locationState]);

  const [status, setStatus] = useState({
    activeStep: 0,
    exhibitionOrder: null
  });

  const handleNext = () => {
    setStatus((prevState) => ({
      ...prevState,
      activeStep: prevState.activeStep + 1
    }));
  };

  const handleBack = () => {
    setStatus((prevState) => ({
      ...prevState,
      activeStep: prevState.activeStep - 1
    }));
  };

  const [state, dispatch] = useReducer(reducer, {
    tel: {
      value: "",
      isTouched: false,
      regex: PATTERN.TEL,
      isValid: null
    },
    paymentId: 0,
    ...newCardForm
  });

  const handleInputChange = (evt) => {
    if (!state[evt.target.name].isTouched && !evt.target.value) return;
    dispatch({
      type: "input_change",
      evt
    });
  };

  const handlePaymentChange = (evt) => {
    dispatch({
      type: "payment_change",
      evt
    });
  };

  const validateField = (field) => {
    if (state[field].isTouched) {
      const isFieldValid = state[field].regex.test(state[field].value);
      dispatch({ type: "validate_field", field, isFieldValid });
    }
  };

  const isFormValid = () => {
    return Object.values(state).every((field) => {
      if (Object.hasOwn(field, "isValid")) {
        return field.isValid === true;
      } else {
        // paymentId
        return true;
      }
    });
  };

  const placeOrder = () => {
    reduxDispatch(
      thunkedOpenMask({
        msg: "Processing..."
      })
    );

    const order = {
      exhibitionId: id,
      tickets: locationState.tickets
    };

    if (state.paymentId === 0) {
      order.payment = {
        cardNumber: state.cardNumber.value,
        nameOnCard: state.nameOnCard.value,
        expDate: dayjs(state.expDate.value).format("YYYY-MM"),
        cvv: state.cvv.value
      };
    } else {
      order.paymentId = state.paymentId;
    }

    axiosInstance
      .post(urlConfig.buyTickets, order)
      .then((res) => {
        setStatus((prevState) => ({
          ...prevState,
          exhibitionOrder: res.exhibitionOrder,
          activeStep: prevState.activeStep + 1
        }));
      })
      .finally(() => {
        setTimeout(() => {
          reduxDispatch(thunkedCloseMask());
        }, 500);
      });
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <CheckoutForm
            {...status}
            {...state}
            handleInputChange={handleInputChange}
            handlePaymentChange={handlePaymentChange}
            validateField={validateField}
            isFormValid={isFormValid}
            handleNext={handleNext}
          />
        );

      case 1:
        return (
          <Review
            {...status}
            {...state}
            handleBack={handleBack}
            placeOrder={placeOrder}
          />
        );
      case 2:
        return <Confirm exhibitionOrder={status.exhibitionOrder} />;
      default:
        throw new Error("Unknown step");
    }
  };
  return (
    <Paper
      elevation={6}
      sx={{
        py: {
          xs: 2,
          md: 4
        },
        px: {
          xs: 2,
          sm: 4,
          md: 6
        }
      }}
    >
      <Stepper
        activeStep={status.activeStep}
        sx={{
          py: {
            xs: 1,
            sm: 2,
            md: 3
          },
          px: {
            xs: 0,
            sm: 5,
            md: 15
          }
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {renderStepContent(status.activeStep)}
    </Paper>
  );
};

export default withAuth(Checkout);
