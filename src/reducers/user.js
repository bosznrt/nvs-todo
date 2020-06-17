import jwt_decode from "jwt-decode";
// Action
const LOGGED_IN = "user/LOGGED_IN";
const LOGGED_OUT = "user/LOGGED_OUT";

// Action creators
export const signIn = (token, username) => {
  const decoded = jwt_decode(token);
  return {
    type: LOGGED_IN,
    payload: {
      token,
      username,
      id: decoded._id,
    },
  };
};

export const singOut = () => ({
  type: LOGGED_OUT,
});

// Reducer
const initialState = {
  token: null,
  username: null,
  id: null,
};

const reducer = (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case LOGGED_IN:
      return {
        ...state,
        ...payload,
      };
    case LOGGED_OUT:
      return {
        token: null,
        username: null,
      };
    default:
      return state;
  }
};

export default reducer;
