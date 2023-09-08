export const PATTERN = {
  EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  PASSWORD: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,})/,
  TEL: /^[0-9]{10,11}$/,
  NAME: /^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/,
  CARD: /^[0-9]{16}$/,
  EXP_DATE: /^(20\d{2})-(0?[1-9]|1[0-2])$/,
  CVV: /^[0-9]{3}$/
};

export const APP = {
  NAME: "Timeless Museum"
};
