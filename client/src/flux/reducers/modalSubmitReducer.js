import {
  EDIT_USER_ACCOUNT_SUCCESS,
  EDIT_USER_ACCOUNT_FAIL,
  CHANGE_USER_PASSWORD_SUCCESS,
  CHANGE_USER_PASSWORD_FAIL,
  MODAL_STATUS_RESET,
} from "../actions/types";

// Array of objects(friends)
const initialState = {};

// const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case EDIT_USER_ACCOUNT_SUCCESS:
      return { ...state, editAccountSubmitSuccess: true };
    case EDIT_USER_ACCOUNT_FAIL:
      return { ...state, editAccountSubmitSuccess: false };
    case CHANGE_USER_PASSWORD_SUCCESS:
      return { ...state, changePasswordSubmitSuccess: true };
    case CHANGE_USER_PASSWORD_FAIL:
      return { ...state, changePasswordSubmitSuccess: false };
    case MODAL_STATUS_RESET:
      return {};
    default:
      return state;
  }
};
