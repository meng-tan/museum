const initialState = {
  msg: null,
  loading: false
};

export const selectMask = (state) => state.mask;

export const openMask = (payload) => {
  return {
    type: "mask/open",
    payload
  };
};

export const closeMask = () => ({ type: "mask/close" });

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
