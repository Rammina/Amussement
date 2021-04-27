import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  DISABLE_USER_ACCOUNT_SUCCESS,
  DELETE_USER_ACCOUNT_SUCCESS,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  // the app will tried to load the user at first anyway, so may as well set it to true
  isLoading: true,
  userId: null,
};

let sanitizedAuthPayload = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      console.log(`loading user, here is the payload `);
      console.log(action.payload);
      sanitizedAuthPayload = {
        isAuthenticated: true,
        isLoading: false,
        userId: action.payload._id,
      };
      return {
        ...state,
        ...sanitizedAuthPayload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      console.log(`loading user, here is the payload `);
      console.log(action.payload);
      // put the token here and set is authenticated to true
      sanitizedAuthPayload = {
        ...action.payload,
        userId: action.payload.user._id,
        isAuthenticated: true,
        isLoading: false,
      };
      console.log(sanitizedAuthPayload);
      return {
        ...state,
        ...sanitizedAuthPayload,
      };

    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
    case DISABLE_USER_ACCOUNT_SUCCESS:
    case DELETE_USER_ACCOUNT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        userId: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };

    default:
      return state;
  }
};
