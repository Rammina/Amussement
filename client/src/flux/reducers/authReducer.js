import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  EDIT_USER_ACCOUNT_SUCCESS,
  EDIT_USER_ACCOUNT_FAIL,
  EDIT_USER_AVATAR_SUCCESS,
  EDIT_USER_AVATAR_FAIL,
  REMOVE_USER_AVATAR_SUCCESS,
  REMOVE_USER_AVATAR_FAIL,
  CHANGE_USER_PASSWORD_SUCCESS,
  CHANGE_USER_PASSWORD_FAIL
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  user: null
};

// const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case EDIT_USER_ACCOUNT_SUCCESS:
    case CHANGE_USER_PASSWORD_SUCCESS:
      // put the token here and set is authenticated to true
      console.log({
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      });
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case EDIT_USER_AVATAR_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case REMOVE_USER_AVATAR_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false
      };
    case EDIT_USER_ACCOUNT_FAIL:
    case CHANGE_USER_PASSWORD_FAIL:
    case EDIT_USER_AVATAR_FAIL:
    case REMOVE_USER_AVATAR_FAIL:
      // case :
      return { ...state };
    default:
      return state;
  }
};
