export const PATTERN = {
  EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  PASSWORD: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,})/,
  TEL: /^[0-9]{10,11}$/,
  NAME: /^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/,
  CARD: /^[0-9]{16}$/,
  EXP_DATE: /^(20\d{2})-(0?[1-9]|1[0-2])$/,
  CVV: /^[0-9]{3,4}$/
};

export const APP = {
  NAME: "Timeless Museum",
  ADDRESS: "1 Tech Valley Dr, Westford, MA 01886",
  PHONE: "857-250-0027"
};

export const ERR = {
  EXPIRED_TOKEN: "Expired Token",
  LOGIN_AGAIN: "Token expired, please login again.",
  LOGIN_FAILED: "Google Login failed, please try again",
  PAST_DATE: "Please select a future date",
  INVALID_DATE: "Invalid Date"
};
