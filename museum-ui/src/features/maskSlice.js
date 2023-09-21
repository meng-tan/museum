const initialState = {
  msg: null,
  loading: false
};

export const selectMask = (state) => state.mask;

const openMask = (payload) => {
  return {
    type: "mask/open",
    payload
  };
};

const closeMask = () => ({ type: "mask/close" });

export const thunkedOpenMask = (payload) => {
  return (dispatch, getState) => {
    document.documentElement.classList.add("overlay");
    return dispatch(openMask(payload));
  };
};

export const thunkedCloseMask = () => {
  return (dispatch, getState) => {
    document.documentElement.classList.remove("overlay");
    return dispatch(closeMask());
  };
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "mask/open": {
      return {
        loading: true,
        ...action.payload
      };
    }
    case "mask/close": {
      return {
        ...initialState
      };
    }
    default:
      return state;
  }
}
