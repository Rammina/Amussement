import {
  ACTION_SHOW_LOADER,
  LOGIN_FORM_SHOW_LOADER,
  LOGIN_FORM_HIDE_LOADER,
  EDIT_ACCOUNT_SHOW_LOADER,
  EDIT_ACCOUNT_HIDE_LOADER,
  CHANGE_PASSWORD_SHOW_LOADER,
  CHANGE_PASSWORD_HIDE_LOADER,
} from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_SHOW_LOADER:
      return { ...state, ...action.payload };
    /*
    case EDIT_ACCOUNT_SHOW_LOADER:
      return { ...state, showEditAccountLoader: true };
    case EDIT_ACCOUNT_HIDE_LOADER:
      return { ...state, showEditAccountLoader: false };
    case CHANGE_PASSWORD_SHOW_LOADER:
      return { ...state, showChangePasswordLoader: true };
    case CHANGE_PASSWORD_HIDE_LOADER:
      return { ...state, showChangePasswordLoader: false };
      */
    default:
      return state;
  }
};
