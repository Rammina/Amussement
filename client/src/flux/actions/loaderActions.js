import { ACTION_SHOW_LOADER } from "./types";

import { capitalizeFirstLetter } from "../../helpers";

export const actionShowLoader = (
  loaderName /*name of the loader (needs to be consistent)*/,
  show /*show is a Boolean that decides whether to show or hide a loader*/
) => {
  return {
    type: ACTION_SHOW_LOADER,
    payload: { ["show" + capitalizeFirstLetter(loaderName) + "Loader"]: show },
  };
};
/*
export const loginFormShowLoader = (show) => {
  if (show) {
    return {
      type: LOGIN_FORM_SHOW_LOADER,
    };
  }
  return { type: LOGIN_FORM_HIDE_LOADER };
};

export const editAccountShowLoader = () => {
  return {
    type: EDIT_ACCOUNT_SHOW_LOADER,
  };
};

export const editAccountHideLoader = () => {
  return {
    type: EDIT_ACCOUNT_HIDE_LOADER,
  };
};
export const changePasswordShowLoader = () => {
  return {
    type: CHANGE_PASSWORD_SHOW_LOADER,
  };
};

export const changePasswordHideLoader = () => {
  return {
    type: CHANGE_PASSWORD_HIDE_LOADER,
  };
};
*/
