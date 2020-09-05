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
  isLoading: false,
  info: null
};

let sanitizedUserPayload = null;

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

        isLoading: false,
        info: action.payload
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case EDIT_USER_ACCOUNT_SUCCESS:
    case CHANGE_USER_PASSWORD_SUCCESS:
      sanitizedUserPayload = {
        info: { ...action.payload.user },
        isLoading: false
      };
      console.log(sanitizedUserPayload);

      return {
        ...state,
        ...sanitizedUserPayload
      };
    case EDIT_USER_AVATAR_SUCCESS:
      return {
        ...state,
        info: action.payload.user
      };
    case REMOVE_USER_AVATAR_SUCCESS:
      return {
        ...state,
        info: action.payload.user
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        info: null,
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
