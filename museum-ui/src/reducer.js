import { combineReducers } from "redux";

import alertReducer from "./features/alertSlice";
import maskReducer from "./features/maskSlice";
import userReducer from "./features/userSlice";

const rootReducer = combineReducers({
  user: userReducer,
  alert: alertReducer,
  mask: maskReducer
});

export default rootReducer;
