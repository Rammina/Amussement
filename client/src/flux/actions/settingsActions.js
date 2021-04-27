import axios from "axios";
import serverRest from "../../apis/serverRest";
import cloudinaryRest from "../../apis/cloudinaryRest";
import history from "../../history";
import { returnErrors, clearErrors } from "./errorActions";
import { actionShowLoader } from "./loaderActions";
import {
  EDIT_USER_ACCOUNT_SUCCESS,
  EDIT_USER_ACCOUNT_FAIL,
  EDIT_USER_AVATAR_SUCCESS,
  EDIT_USER_AVATAR_FAIL,
  REMOVE_USER_AVATAR_SUCCESS,
  REMOVE_USER_AVATAR_FAIL,
  CHANGE_USER_PASSWORD_SUCCESS,
  CHANGE_USER_PASSWORD_FAIL,
  DISABLE_USER_ACCOUNT_SUCCESS,
  DISABLE_USER_ACCOUNT_FAIL,
  DELETE_USER_ACCOUNT_SUCCESS,
  DELETE_USER_ACCOUNT_FAIL,
} from "./types";

// edit account
export const editUserAccount = (formValues) => {
  return async function (dispatch, getState) {
    const userId = getState().user.info._id || getState().user.info.id;
    await serverRest
      .patch(`/api/users/${userId}/settings/edit-account`, formValues)
      .then((res) => {
        console.log(res);
        console.log(res.data);

        dispatch({ type: EDIT_USER_ACCOUNT_SUCCESS, payload: res.data });
        // history.push(`/users/${userId}/settings`);
        dispatch(clearErrors());
      })
      .catch((err) => {
        // this needs an error handler action creator and reducer
        console.log(err);
        dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            "EDIT_USER_ACCOUNT_FAIL"
          )
        );
        dispatch({ type: EDIT_USER_ACCOUNT_FAIL });
      })
      .finally(() => {
        dispatch(actionShowLoader("editAccountForm", false));
      });
  };
};

// change password
export const changeUserPassword = (formValues) => {
  return async function (dispatch, getState) {
    const userId = getState().user.info._id || getState().user.info.id;
    await serverRest
      .patch(`/api/users/${userId}/settings/change-password`, formValues)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        dispatch({ type: CHANGE_USER_PASSWORD_SUCCESS, payload: res.data });
        // history.push(`/users/${userId}/settings`);
        dispatch(clearErrors());
        return true;
      })
      .catch((err) => {
        // this needs an error handler action creator and reducer
        console.log(err);
        dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            "CHANGE_USER_PASSWORD_FAIL"
          )
        );
        dispatch({ type: CHANGE_USER_PASSWORD_FAIL });
        return false;
      })
      .finally(() => {
        dispatch(actionShowLoader("changeUserPasswordForm", false));
      });
  };
};

export const editUserAvatar = (base64EncodedImage, id) => {
  return async function (dispatch, getState) {
    const userId = id || getState().user.info._id || getState().user.info.id;
    console.log("hello");
    try {
      await cloudinaryRest
        .patch(
          `/api/users/${userId}/settings/upload-avatar`,
          JSON.stringify({ data: base64EncodedImage })
        )
        .then((res) => {
          console.log(res.data);
          dispatch({ type: EDIT_USER_AVATAR_SUCCESS, payload: res.data });
        });
    } catch (err) {
      console.log(err);
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "EDIT_USER_AVATAR_FAIL"
        )
      );
      dispatch({ type: EDIT_USER_AVATAR_FAIL });
    } finally {
      dispatch(actionShowLoader("uploadUserAvatarForm", false));
    }
  };
};

export const removeUserAvatar = (id) => {
  return async function (dispatch, getState) {
    const userId = id || getState().user.info._id || getState().user.info.id;
    try {
      await cloudinaryRest
        .patch(`/api/users/${userId}/settings/remove-avatar`, {
          message: "remove avatar",
        })
        .then((res) => {
          console.log(res.data);
          dispatch({ type: REMOVE_USER_AVATAR_SUCCESS, payload: res.data });
        });
    } catch (err) {
      console.log(err);
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "REMOVE_USER_AVATAR_FAIL"
        )
      );
      dispatch({ type: REMOVE_USER_AVATAR_FAIL });
    }
  };
};

// disable account should take in the user's password'
export const disableUserAccount = (formValues) => {
  return async function (dispatch, getState) {
    const userId = getState().user.info._id || getState().user.info.id;

    await serverRest
      .patch(`/api/users/${userId}/settings/disable-account`, {
        ...formValues,
      })
      .then((res) => {
        dispatch({
          type: DISABLE_USER_ACCOUNT_SUCCESS,
        });

        history.push(`/auth/login`);
        dispatch(clearErrors());
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            "DISABLE_USER_ACCOUNT_FAIL"
          )
        );
        dispatch({
          type: DISABLE_USER_ACCOUNT_FAIL,
        });
      })
      .finally(() => {
        dispatch(actionShowLoader("disableAccountForm", false));
      });
  };
};

export const deleteUserAccount = (formValues) => {
  return async function (dispatch, getState) {
    const userId = getState().user.info._id || getState().user.info.id;
    console.log(formValues);
    console.log({ ...formValues });

    await axios
      .delete(
        `https://amussement-server.herokuapp.com/api/users/${userId}/settings/delete-account`,
        // this format is necessary for axios, needs to be in {data: }
        { data: formValues }
      )
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: DELETE_USER_ACCOUNT_SUCCESS,
        });
        history.push(`/auth/login`);
        dispatch(clearErrors());
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            "DELETE_USER_ACCOUNT_FAIL"
          )
        );
        dispatch({
          type: DELETE_USER_ACCOUNT_FAIL,
        });
      })
      .finally(() => {
        dispatch(actionShowLoader("deleteAccountForm", false));
      });
  };
};

/*
// Setup config/headers and token
export const tokenConfig = getState => {
  console.log(localStorage.getItem("token"));
  // const token = getState().auth.token || localStorage.getItem("token");
  const token = getState().auth.token;
  // headers
  const config = { headers: { "Content-type": "application/json" } };
  // if token has a value
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};

*/
