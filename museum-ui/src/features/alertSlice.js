const initialState = {
  err: null,
  severity: "warning",
  open: false
};

export const selectAlert = (state) => state.alert;

export const openAlert = (payload) => {
  return {
    type: "alert/open",
    payload
  };
};

export const closeAlert = () => ({ type: "alert/close" });

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "alert/open": {
      return {
        open: true,
        ...action.payload
      };
    }
    case "alert/close": {
      return {
        ...state,
        open: false
      };
    }
    default:
      return state;
  }
}
