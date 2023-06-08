import { combineReducers } from "redux";

import alertReducer from "./features/alertSlice";
import userReducer from "./features/userSlice";

const rootReducer = combineReducers({
  user: userReducer,
  alert: alertReducer
});

export default rootReducer;
