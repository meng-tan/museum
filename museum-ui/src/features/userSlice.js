const initialState = {
  isLoggedIn: sessionStorage.getItem("token") || false,
  username: sessionStorage.getItem("username") || null
};

export const selectUser = (state) => state.user;

// action creator
const loggedIn = (payload) => {
  return {
    type: "user/loggedIn",
    payload
  };
};

const loggedOut = () => {
  return {
    type: "user/loggedOut"
  };
};

export const thunkedLogIn = (payload) => {
  return (dispatch, getState) => {
    const returnValue = dispatch(loggedIn(payload));
    sessionStorage.setItem("username", payload.username);
    return returnValue;
  };
};

export const thunkedLogout = () => {
  return (dispatch, getState) => {
    // Call the next dispatch method in the middleware chain.
    const returnValue = dispatch(loggedOut());

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");

    // This will likely be the action itself, unless a middleware further in chain changed it.
    return returnValue;
  };
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "user/loggedIn": {
      return {
        isLoggedIn: true,
        ...action.payload
      };
    }
    case "user/loggedOut": {
      return {
        isLoggedIn: false,
        username: null
      };
    }
    default:
      return state;
  }
}
